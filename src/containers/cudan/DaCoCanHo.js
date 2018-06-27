import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    AsyncStorage, StyleSheet,

    TextInput
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import stylesContainer from "../../components/style";
import {callApiNhaCuDan} from "../../actions/actionsCuDan/NhaCuDanActions";
import {callApiSearchPost} from "../../actions/SearchPostActions";
import {default as FCM, FCMEvent} from "react-native-fcm";
import {SOCKET, UpdateProfile, URL} from "../../components/Api";
import SocketIOClient from "socket.io-client";
import StatusItemCuDan from "../../components/status/StatusItemCuDan";
import {callApiSubcribe} from "../../actions/SubcribeActions";
import images from "../../components/images";

class DaCoCanHo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // dataBanTin: [''],
            // dataBaiDang: [''],
            refresh: false,
            isLoading: true,
            page_index: 1,
            dataItem: [],
            Token: '',
            TimKiem: "",
        }
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile): null;
        this.fetchData()
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.emit('loginpost', {
            KDTID: dataProfile[0].KDTID,
            IntUserID: InfoUser[0].IntUserID,
        })
        this.socket.on('receivepost', (dataReceive) => {
            console.log('receivepost', dataReceive)
            dataPost = dataReceive.PostContent;
            //set newMsg = messga receive
            let newPost = this.state.dataItem;
            //add message to array
            newPost.unshift(dataReceive);
            this.setState({dataItem: newPost}, () => {
                console.log('dataitemmm', this.state.dataItem)
            });

        })

    }

    Subcribe = () => {
        const {InfoUser, callApiSubcribe} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        // console.log('InfoUser[0].ProfileID', InfoUser[0].ProfileID)
        // console.log('InfoUser[0].UserID', InfoUser[0].UserID)
        callApiSubcribe(InfoUser[0].IntUserID, true).then(dataRes => {
            console.log('dataSubcribe',dataRes )

        })
    }

    pushDeviceToken = (token_APP) => {
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null;
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        // console.log('dataProfile', dataProfile)

        fetch(URL + UpdateProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                profile_id: dataProfile[0].ProfileID,
                user_id: InfoUser[0].UserID,
                field: "TokenKey",
                value: token_APP,
                lang_name: "vi_VN"
            })
        }).then((response) => response.json())
            .then(dataRes => {
                console.log('dataRes', dataRes)
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

    componentWillMount() {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }

        const {callApiNhaCuDan} = this.props;
        callApiNhaCuDan(InfoUser[0].ProfileID, InfoUser[0].UserID, InfoUser[0].Type).then(dataNha => {
            dataNhaCuDan = JSON.parse(dataNha);
            // console.log('data1', dataNhaCuDan)

        })
        // this.fetchData()
        // lay devices
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
            // console.log('token', token)
            AsyncStorage.setItem('token', token);
            this.pushDeviceToken(token);
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {

            // console.log("receive noti listent", notif);
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
            // console.log("click noti:", notif)
        });
    }

    fetchData = () => {
        const {InfoUser, callApiSearchPost} = this.props
        if (InfoUser.length <= 0) {
            return null;
        }
        let dataLtProfile = ( InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile): null;
        callApiSearchPost(this.state.page_index, dataProfile[0].KDTID).then(dataRes => {
            dataBaiViet = JSON.parse(dataRes);
            dataBaiViet = dataBaiViet.Value
            console.log('bai viet sanh chinh', dataBaiViet)
            // if (dataBaiViet.length <= 0) {
            //     return null
            // }
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
                // console.log('index', this.state.page_index)
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
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#718792'}}>
        //             <ActivityIndicator size="large" color="white"/>
        //         </View>
        //     );
        // }
        const {navigation} = this.props;
        return (
            <ScrollView style={stylesContainer.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refresh}
                                onRefresh={() => {
                                    this.fetchData()
                                }}
                            />}
            >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchFaceHome')}>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#FCE4EC'
                    }}>
                        <Icon name="search" size={30} style={{marginLeft: 7}} color="black"/>
                        <Text>Tìm kiếm</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Image
                            source={
                                // uri: InfoUser[0].Avatar
                                !InfoUser[0].Avatar ? images.noavatar : {uri: InfoUser[0].Avatar}
                            }
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SoanTinCuDan')}>
                                <Text>Bạn muốn nói gì?</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                {
                    this.state.dataItem ? <FlatList
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
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    /> : <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Không có nội dung để hiển thị</Text>
                    </View>
                }

            </ScrollView>
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
        callApiSubcribe: bindActionCreators(callApiSubcribe, dispatch)
    }
};

DaCoCanHo = connect(mapStateToProps, mapDispatchToProps)(DaCoCanHo);
export default DaCoCanHo;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },

})