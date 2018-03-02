import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ActivityIndicator, BackHandler
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import {callApiGetMessage} from "../../actions/MessagesDetailsActions";
import ChatItem from "../../components/ChatItem";

//Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op. Please check the code for the Fab component.

class TinNhanDetails extends Component {
    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state

        return {
            title: `${navigation.state.params.title}`,
            headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerRight: <TouchableOpacity style = {{marginRight:10}}
                                           onPress={() => params.handleSave()}>
                <Icon name = "dots-vertical" size={25} color="#424242"/>
            </TouchableOpacity>
        }

    };
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            dataChat: [],
            UserID: '',
            refresh : false,
            isLoading: true,
            index :1,

        }
        this.input_msg = '';
        const { params } = this.props.navigation.state
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        // connect socket
        this.socket = SocketIOClient('http://222.252.16.186:9061/', { pingTimeout: 30000, pingInterval: 30000, transports: ['websocket'] });
        console.log('socket', this.socket)
        //get old message
        this.getOldMSG();
        this.socket.on('connect', () => {

            // this.socket.emit('load', (params.MsgGroupID))
            //join room
            this.socket.emit('login',{MsgGroupID:params.MsgGroupID,UserID:UserBQL.payload[0].UserID, FullName:UserBQL.payload[0].FullName, Avartar:""})
            console.log('login ok')
        })
        //receive message to sender
        this.socket.on('receive', (dataReceive) => {
            console.log('receive', dataReceive)
            dataMess = dataReceive.Content;
            //set newMsg = messga receive
            let newMsg = this.state.dataChat;
            //add message to array
            newMsg.push({
                Avartar: "",
                Content: dataMess,
                CreatedDate: "2018-02-05T09:29:35.383Z",
                DayFlag: 20180205,
                FullName: UserBQL.payload[0].FullName,
                KDTID: 50,
                MessageID: "",
                MsgGroupID: params.MsgGroupID,
                RefAvartar: "",
                RefName: "",
                RefUserID: "",
                UserID: "",
                rowNumber: "1"
            });
            this.setState({dataChat: newMsg});

        })




    }
    //custom message details
    Custom(){
        this.props.navigation.navigate('Contact')
    }
    componentDidMount() {
        // call function SaveDetails
        this.props.navigation.setParams({ handleSave: this.Custom.bind(this) });

    }
    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
            this.socket = SocketIOClient('http://222.252.16.186:9061/', { pingTimeout: 30000, pingInterval: 30000, transports: ['websocket'] });
            // console.log('socket backhandle', this.socket)
            // // this.socket.on('leave',(data) => {
            // //
            // //     console.log('da roi phong', data)
            // //
            // // });
            this.socket.emit("dis")

        });

    }
    //get old msg
    getOldMSG = ()=>  {
        console.log('so trang', this.state.index)
        const { params } = this.props.navigation.state
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        const { callApiGetMessage } = this.props;
        callApiGetMessage(UserBQL.payload[0].UserID, params.MsgGroupID, this.state.index).then(dataRes => {
            dataMessage = dataRes.ObjectResult;
            this.setState({
                dataChat: [...dataMessage,...this.state.dataChat],
                // dataChat: ,
                isLoading: false,
            })
        })
    }
    handleLoadMore = () => {
        this.setState(
            {
                index: this.state.index + 1
            },
            () => {
                console.log('index', this.state.index)
                this.getOldMSG();
            }
        );
    };

    //socket event send message
    sendMessage = () => {
        // const { params } = this.props.navigation.state
        // const { UserBQL } = this.props;
        // if (UserBQL.length <= 0) {
        //     return null;
        // }
        // if (this.input_msg === "")
        //     return;
        // this.textInput.clear();
        // // console.log("msg:", this.input_msg);
        // //object need send to server
        // let dataSend = {
        //     MsgGroupID:params.MsgGroupID,
        //     UserID: UserBQL.payload[0].UserID,
        //     FullName: UserBQL.payload[0].FullName,
        //     Avartar:"",
        //     RefUserID:"",
        //     RefName:"",
        //     RefAvartar:"",
        //     Content:this.input_msg,
        //     CreatedDate:"",
        //     DayFlag:"",
        //     KDTID:UserBQL.payload[0].KDTID,
        // }
        // this.socket.emit("msg", dataSend);
        // // console.log('send ok')
        // dataMesSend = this.input_msg;
        // let newMsg = this.state.dataChat;
        // newMsg.push({
        //     Avartar: "",
        //     Content: dataMesSend,
        //     CreatedDate: "2018-02-05T09:29:35.383Z",
        //     DayFlag: 20180205,
        //     FullName: UserBQL.payload[0].FullName,
        //     KDTID: 50,
        //     MessageID: "",
        //     MsgGroupID: params.MsgGroupID,
        //     RefAvartar: "",
        //     RefName: "",
        //     RefUserID: "",
        //     UserID: UserBQL.payload[0].UserID,
        //     rowNumber: "1"
        // });
        // this.setState({dataChat: newMsg});
        this.socket.emit("dis", 12)

    };

render () {
    if (this.state.isLoading) {
        return (
            <View style={{flex: 1,justifyContent:'center', alignItems: 'center', backgroundColor: '#718792'}}>
                <ActivityIndicator size="large" color="white"/>
            </View>
        );
    }
    const { UserBQL } = this.props;
    if (UserBQL.length <= 0) {
        return null;
    }
    return (
            <View style={{flex: 1}}>
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {()=>  {this.handleLoadMore()}}
                    style={{backgroundColor: "#E0E0E0", flex: 1}}
                    data={this.state.dataChat}
                    renderItem={({item}) => {
                        // console.log('item', item)
                        return (
                            <ChatItem
                                dataItem={item}
                                myName={UserBQL.payload[0].UserID}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => {
                         // console.log("on size change");
                         this.flatList.scrollToEnd({animated: true})
                    }}
                    onLayout={() => {
                        // console.log("got to onlayout");
                        this.flatList.scrollToEnd({animated: true})
                        }
                    }


                />
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingBottom: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: 40,
                                aspectRatio: 1,
                                paddingBottom: 10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                            }}
                            source={require('../../images/camera.png')}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{flex: 1}}
                        placeholder={"Nhập vào đây..."}
                        onChangeText={
                            (text) => this.input_msg = text}
                        ref={input => {
                            this.textInput = input
                        }}


                    />
                    <TouchableOpacity
                        onPress={this.sendMessage}
                    >
                        <Image
                            style={{
                                width: 40,
                                paddingBottom: 10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                aspectRatio: 1
                            }}
                            source={require('../../images/send.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        Message: state.MessagesDetailsReducers,
        UserBQL: state.LoginReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetMessage: bindActionCreators(callApiGetMessage, dispatch),

    }
};

TinNhanDetails = connect(mapStateToProps, mapDispatchToProps)(TinNhanDetails);

export default TinNhanDetails
const myStyle = StyleSheet.create({
        image_circle: {
            height: DEVICE_WIDTH / 8,
            width: DEVICE_WIDTH / 8,
            borderRadius: DEVICE_WIDTH / 16,
            marginLeft: 10,
            marginRight: 10,

        }
    })