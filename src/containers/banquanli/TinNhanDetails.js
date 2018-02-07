import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {callApiGetMessage} from "../../actions/MessagesActions";
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/Entypo'

class TinNhanDetails extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>,
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},

        }

    }
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            dataChat: [],
            UserID: '',

        }
        this.input_msg = '';
        this.socket = SocketIOClient('http://192.168.1.254:8080/', { transports: ['websocket'] });
        console.log('Socket', this.socket)

        this.socket.on('connect', () => {
            this.socket.emit('load', (1))
            console.log("load ok")
            this.socket.emit('login',{MsgGroupID:"1",UserID:"uet",FullName:"thailh",Avartar:""})
            console.log("login ok")
        })
        console.log('Socket1', this.socket)
        this.getOldMSG();
        this.socket.on('receive', (dataReceive) => {
            console.log('receive ok')
            console.log('receive', dataReceive)
            dataMess = dataReceive.Content;
            console.log('dataMes', dataMess)
            let newMsg = this.state.dataChat;
            console.log('newMsg', newMsg)
            newMsg.push({
                Avartar: "",
                Content: dataMess,
                CreatedDate: "2018-02-05T09:29:35.383Z",
                DayFlag: 20180205,
                FullName: "thailh",
                KDTID: 1,
                MessageID: "07D12F89-FFDB-48E6-B9F9-6CD60051B171",
                MsgGroupID: "1",
                RefAvartar: "",
                RefName: "",
                RefUserID: "",
                UserID: "uet",
                rowNumber: "1"
            });
            this.setState({dataChat: newMsg});
        })




    }
    getOldMSG = ()=>  {
        const { callApiGetMessage } = this.props;
        callApiGetMessage().then(dataRes => {
            dataMessage = dataRes.ObjectResult;
            console.log('message', dataMessage)
            this.setState({
                dataChat: dataMessage
            })
        })
    }
    sendMessage = () => {
        if (this.input_msg === "")
            return;
        this.textInput.clear();
        // console.log("msg:", this.input_msg);
        let dataSend = {
            MsgGroupID:1,
            UserID:"uet",
            FullName:"thailh",
            Avartar:"",
            RefUserID:"",
            RefName:"",
            RefAvartar:"",
            Content:this.input_msg,
            CreatedDate:"",
            DayFlag:"",
            KDTID:1,
        }
        this.socket.emit("msg", dataSend);
        console.log('send ok')
    };

render () {
        // console.log('datamessage', this.state.data)
        return (
            <View style={{flex: 1}}>
                <FlatList
                    style={{backgroundColor: "#E0E0E0", flex: 1}}
                    data={this.state.dataChat}
                    // extraData={this.state.dataChat}

                    renderItem={({item}) => {
                        return (
                            <View style = {{flex:1}}>
                                {
                                    item.UserID === 'udt' ?
                                        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>

                                            <Image style={myStyle.image_circle}

                                                   source={{
                                                       uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                                                   }}
                                                   resizeMode="cover"
                                            >
                                            </Image>
                                            <View>
                                                <View style={{marginRight: DEVICE_WIDTH / 3}}>
                                                    <Text style={{
                                                        borderRadius: 10,
                                                        backgroundColor: '#FAFAFA',
                                                        justifyContent: 'flex-start',
                                                        alignSelf: 'flex-start',
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        paddingTop: 10,
                                                        paddingBottom: 10
                                                    }}>{item.Content}</Text>

                                                </View>
                                                {/*<Text style={{flex: 1, justifyContent: 'flex-start'}}>{this.props.dataItem.createdAt}</Text>*/}
                                            </View>

                                        </View> :
                                        <View style={{
                                            flex: 1,
                                            marginLeft: DEVICE_WIDTH / 3,
                                            // minHeight: 50,
                                            justifyContent: 'flex-end',
                                            marginTop: 10
                                        }}>

                                            <Text style={{
                                                borderRadius: 10,
                                                alignSelf: 'flex-end',
                                                backgroundColor: '#64B5F6',
                                                justifyContent: 'flex-end',
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                marginRight: 10
                                            }}>{item.Content}</Text>
                                            {/*<Text style={{*/}
                                            {/*justifyContent: 'center',*/}
                                            {/*alignSelf: 'flex-end',*/}
                                            {/*marginRight: 10*/}
                                            {/*}}>{this.props.dataItem.createdAt}</Text>*/}

                                        </View>


                                }
                            </View>
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
        // SocketRef: state.SocketReducers
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