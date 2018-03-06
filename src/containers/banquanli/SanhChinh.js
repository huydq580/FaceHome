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
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import stylesContainer from "../../components/style";
import StatusItems from "../../components/status/StatusItems";
import {callApiSearchPost} from "../../actions/SearchPostActions";
import FCM, {FCMEvent} from "react-native-fcm";
import {UpdateProfile, URL} from "../../components/Api";


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
        }


    }

    pushDeviceToken = (token_APP) => {
        const {UserBQL} = this.props
        if (UserBQL.length <= 0) {
            return null;
        }

        fetch(URL + UpdateProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                profile_id: UserBQL.payload[0].ProfileID,
                user_id: UserBQL.payload[0].UserID,
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

    componentDidMount() {
        this.fetchData()
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


    // componentWillMount(){
    //     this.fetchData()
    // }
    //lay du lieu api
    fetchData = () => {
        const {UserBQL, callApiSearchPost} = this.props
        if (UserBQL.length <= 0) {
            return null;
        }
        callApiSearchPost(this.state.page_index, UserBQL.payload[0].KDTID, UserBQL.payload[0].UserID).then(dataRes => {
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
                {/*<View style={{alignItems:'center', justifyContent:'center'}}>*/}
                {/*<Text style = {{fontSize:19, fontWeight:'bold', color: 'black'}}>*/}
                {/*Thông Tin Từ Ban Quản Lý*/}
                {/*</Text>*/}
                {/*</View>*/}
                {/*<View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>*/}
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
        TopPost: state.GetTopPostReducers,
        UserBQL: state.LoginReducers
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        callApiSearchPost: bindActionCreators(callApiSearchPost, dispatch),


    }
};

SanhChinh = connect(mapStateToProps, mapDispatchToProps)(SanhChinh);

export default SanhChinh
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

})