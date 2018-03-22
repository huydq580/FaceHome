import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import stylesContainer from "../../components/style";
import {callApiNhaCuDan} from "../../actions/actionsCuDan/NhaCuDanActions";
import {callApiSearchPost} from "../../actions/SearchPostActions";
import {default as FCM, FCMEvent} from "react-native-fcm";
import {SOCKET, UpdateProfile, URL} from "../../components/Api";
import SocketIOClient from "socket.io-client";
import StatusItemCuDan from "../../components/status/StatusItemCuDan";

class SanhChinh extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // dataBanTin: [''],
            // dataBaiDang: [''],
            refresh: false,
            isLoading: true,
            page_index: 1,
            dataItem: [],
        }
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        this.fetchData()
        this.socket = SocketIOClient( SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.emit('loginpost', {
            UserID: InfoUser[0].UserID,
            KDTID: InfoUser[0].KDTID,
        })
        this.socket.on('receivepost', (dataReceive) => {
            console.log('receivepost', dataReceive)
            dataPost = dataReceive.PostContent;
            //set newMsg = messga receive
            let newPost = this.state.dataItem;
            //add message to array
            newPost.unshift({
                RowNum: dataReceive.RowNum,
                KDTID: dataReceive.KDTID,
                UserID: dataReceive.UserID,
                FullName: dataReceive.FullName,
                Avatar: dataReceive.Avatar,
                CreatedDate: dataReceive.CreatedDate,
                UserType: dataReceive.UserType,
                TotalComment: dataReceive.TotalComment,
                TotalLike: dataReceive.TotalLike,
                TotalShare: dataReceive.TotalShare,
                PostContent: dataReceive.PostContent,
                TotalRow: dataReceive.TotalRow,
                PostID:dataReceive.PostID,
                Comments:dataReceive.Comments,
                Images:dataReceive.Images,
            });
            this.setState({dataItem: newPost});

        })

    }

    pushDeviceToken = (token_APP) => {
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null;
        }

        fetch(URL + UpdateProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                profile_id: InfoUser[0].ProfileID,
                user_id: InfoUser[0].UserID,
                field: "TokenKey",
                value: token_APP,
                lang_name: "vi_VN"
            })
        }).then((response) => response.json())
            .then(data => {
                console.log("da push thanh cong", data)

            }).catch((erro) => {
            console.log('erro', erro);
        })
    }

    componentWillMount() {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }

        const {callApiNhaCuDan} = this.props;
        callApiNhaCuDan(InfoUser[0].ProfileID, InfoUser[0].UserID, InfoUser[0].Type).then(dataNha => {
            dataNhaCuDan = JSON.parse(dataNha);
            console.log('data1', dataNhaCuDan)

        })
        // this.fetchData()
        // lay devices
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
            console.log('token', token)
            AsyncStorage.getItem("token").then(token_APP => {
                this.pushDeviceToken(token);
            })
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {

            console.log("receive noti listent", notif);
            // optional, do some component related stuff
            if (notif && notif.opened_from_tray && notif.opened_from_tray == 1) {
                return;
            }
            if (notif.fcm) {
                console.log(("abcd", notif.fcm));
                FCM.presentLocalNotification({
                    vibrate: 500,
                    title: notif.fcm.title,
                    body: notif.fcm.body,
                    priority: "high",
                    sound: "default",
                    icon: "ic_launcher",
                    wake_screen: true,
                    show_in_foreground: true,
                    // click_action: notif.fcm.action,

                });
            }


        });

        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
            console.log("click noti:", notif)
        });
    }

    fetchData = () => {
        const {InfoUser, callApiSearchPost} = this.props
        if (InfoUser.length <= 0) {
            return null;
        }
        callApiSearchPost(this.state.page_index, InfoUser[0].KDTID).then(dataRes => {
            dataBaiViet = JSON.parse(dataRes);
            dataBaiViet = dataBaiViet.Value
            // console.log('bai viet sanh chinh', dataBaiViet)
            if (dataBaiViet.length <= 0) {
                return null
            }
            this.setState({
                isLoading: false,
                //save data
                dataItem: this.state.page_index === 1 ? [...dataBaiViet] : [...this.state.dataItem, ...dataBaiViet]
            })
        })
    }
    //handle event when loadmore
    handleLoadMore = () => {
        this.setState(
            {
                page_index: this.state.page_index + 1
            },
            () => {
                console.log('index', this.state.page_index)
                this.fetchData();
            }
        );
    };
    //activityIndicator when loadmore
    // renderFooter = () => {
    //     if (this.state.isLoading) return null;
    //
    //     return (
    //         <View style={{flex: 1,justifyContent:'center', alignItems: 'center', backgroundColor: '#718792'}}>
    //             <ActivityIndicator size="large" color="white"/>
    //         </View>
    //     );
    // };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#718792'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        const {navigation} = this.props;
        return (
            <View style={stylesContainer.container}>
                <View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style={{resizeMode: 'cover', height: 40, width: 30, marginLeft: 10}}>
                        </Image>
                        <View style={{
                            marginLeft: 10,
                            borderWidth: 1,
                            borderColor: '#cccccc',
                            borderRadius: 20,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SoanTinCuDan')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                        this.fetchData()
                    }}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    // ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={this.renderFooter}

                    data={this.state.dataItem}
                    renderItem={(item) => {
                        return (
                            <StatusItemCuDan
                                dataItem={item}
                                navigation={navigation}/>

                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        infoCuDan: state.NhaCuDanReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiNhaCuDan: bindActionCreators(callApiNhaCuDan, dispatch),
        callApiSearchPost: bindActionCreators(callApiSearchPost, dispatch),
    }
};

SanhChinh = connect(mapStateToProps, mapDispatchToProps)(SanhChinh);
export default SanhChinh;