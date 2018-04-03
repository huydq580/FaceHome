import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Button,
    ActivityIndicator, Platform,
    AsyncStorage
} from 'react-native';
import Dimensions from 'Dimensions';
import moment from 'moment';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import stylesContainer from "../../components/style";
import StatusItems from "../../components/status/StatusItems";
import {callApiSearchPost} from "../../actions/SearchPostActions";
import FCM, {FCMEvent} from "react-native-fcm";
import {SOCKET, UpdateProfile, URL} from "../../components/Api";
import SocketIOClient from "socket.io-client";
import {callApiSubcribe} from "../../actions/SubcribeActions";


class SanhChinh extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Button onPress={() => {
                navigation.navigate('TinNhanBQL')
            }}
                                 title='Tin nhắn'
                                 style={{marginRight: 10}}/>
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            dataItem: [],
            refresh: false,
            isLoading: true,
            page_index: 1,
            Token: '',
        }
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        this.fetchData();
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });

        // console.log('socket sanh chinh', this.socket)
        this.socket.emit('loginpost', {
            UserID: InfoUser[0].UserID,
            KDTID: InfoUser[0].KDTID,
        })
        this.socket.on('receivelikepost', (dataReceive) => {
            console.log('receivelikepost', dataReceive)
        })
        this.socket.on('receivepost', (dataReceive) => {
            console.log('receivepost', dataReceive)
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
    componentWillMount () {
    }
    Subcribe = () => {
        const {InfoUser, callApiSubcribe} = this.props;
        if (InfoUser.length <=0) {
            return null
        }
        callApiSubcribe(InfoUser[0].UserID, true).then(dataRes => {
            // console.log('dataSubcribe',dataRes )

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
            .then(dataRes => {
                dataToken = JSON.parse(dataRes)
                this.setState({
                    Token: dataToken.Message

                }, () => {
                    // console.log('hihida vao cai nay')
                    this.Subcribe()
                })
            }).catch((erro) => {
            console.log('erro', erro);
        })
    }

    componentDidMount() {
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
            console.log('token', token)
            AsyncStorage.setItem('token', token);
                this.pushDeviceToken(token);
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

    //lay bai post
    fetchData = () => {
        const {InfoUser, callApiSearchPost} = this.props
        if (InfoUser.length <= 0) {
            return null;
        }
        callApiSearchPost(this.state.page_index,InfoUser[0].KDTID).then(dataRes => {
            dataBaiViet = JSON.parse(dataRes);
            dataBaiViet = dataBaiViet.Value
            console.log('bai viet sanh chinh', dataBaiViet)
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
    // handle event when loadmore
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
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null;
        }
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
                        <Image
                            source={{
                                uri: InfoUser[0].Avatar
                            }}
                            style={styles.image_circle}
                            resizeMode="cover">
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SoanTin')}>
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
                            <StatusItems
                                dataItem={item}
                                navigation={navigation}/>

                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        SocketRef: state.SocketReducers,
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        callApiSearchPost: bindActionCreators(callApiSearchPost, dispatch),
        callApiSubcribe: bindActionCreators(callApiSubcribe, dispatch),


    }
};

SanhChinh = connect(mapStateToProps, mapDispatchToProps)(SanhChinh);

export default SanhChinh
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 7,
        minHeight: 50,
    },
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },

})