import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import {callApiGetMessage} from "../../actions/messages/MessagesDetailsActions";
import {SOCKET} from "../../components/Api";
import ChatItem from "../../components/chatItem/ChatItem";
import TextInputChat from "../../components/TextInputChat";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";

class TinNhanDetailsCuDan extends Component {
    static navigationOptions = ({navigation}) => {

        const {params = {}} = navigation.state

        return {
            title: `${navigation.state.params.title}`,
            headerTitleStyle: {textAlign: 'center', alignSelf: 'center', color: TITLE_HEADER},
            headerStyle: {
                backgroundColor: BACKGROUND_HEADER,
            },
            headerTintColor: TITLE_HEADER,
            // headerRight: <TouchableOpacity style={{marginRight: 10}}
            //                                onPress={() => params.handleSave()}>
            //     <Icon name="dots-vertical" size={25} color="#424242"/>
            // </TouchableOpacity>
        }

    };

    constructor(props) {
        super(props)
        this.state = {
            dataChat: [],
            UserID: '',
            refresh: false,
            isLoading: true,
            index: 1

        }
        this.input_msg = '';
        const {params} = this.props.navigation.state
        console.log('params.MsgId', params.MsgId)
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        //connect socket
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        console.log('socket', this.socket)
        // console.log('socket', this.socket)
        // // get old message
        this.getOldMSG();
        console.log('IntUserID', InfoUser[0].IntUserID)

        this.socket.on('connect', () => {

            // this.socket.emit('load', (params.MsgGroupID))
            //join room
            // die when send fullname
            this.socket.emit('login', {
                MsgGroupID: params.MsgId,
                IntUserID: InfoUser[0].IntUserID,
            })
            console.log('login ok')
        })
        // receive message to sender
        this.socket.on('receive', (dataReceive) => {
            console.log('receive', dataReceive)
            dataMess = dataReceive.Content;
            //set newMsg = messga receive
            let newMsg = this.state.dataChat;
            //add message to array
            newMsg.push(dataReceive);
            this.setState({dataChat: newMsg});
        })


    }

    //custom message details
    Custom() {
        this.props.navigation.navigate('Contact')
    }

    componentDidMount() {
        // call function SaveDetails
        this.props.navigation.setParams({handleSave: this.Custom.bind(this)});

    }
    componentWillUnmount() {
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });

        const { params } = this.props.navigation.state
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        // console.log('userbql', InfoUser)
        let dataGroup = {
            MsgGroupID: params.MsgId,
            IntUserID: InfoUser[0].IntUserID,

        }
        this.socket.emit("logout", dataGroup)
    }
    //get old msg
    getOldMSG = () => {
        const {params} = this.props.navigation.state
        const {InfoUser, MessageGroupID} = this.props;
        if (InfoUser.length <= 0 && MessageGroupID.length <=0 ) {
            return null;
        }
        // console.log('Mess', MessageGroupID)
        const {callApiGetMessage} = this.props;
        callApiGetMessage(InfoUser[0].IntUserID, params.MsgId, this.state.index).then(dataRes => {
            console.log('dataRes', dataRes)
            dataMessage = dataRes.ObjectResult;
            console.log('dataUser', dataMessage)
            this.setState({
                dataChat: [...dataMessage, ...this.state.dataChat],
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
    onReceiveTextInputClick = (text) => {
        const {params} = this.props.navigation.state
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;

        if (text === "")
            return;

        //object need send to server
        // console.log('userid gui di', InfoUser[0].UserID)
        let dataSend = {
            MsgGroupID: params.MsgId,
            IntUserID: InfoUser[0].IntUserID,
            UserID: InfoUser[0].UserID,
            FullName: InfoUser[0].FullName,
            Avatar: InfoUser[0].Avartar ? InfoUser[0].Avartar : "",
            RefIntUserID: params.Info.IntUserID,
            RefName: params.Info.FullName,
            RefAvatar: params.Info.Avartar ? params.Info.Avartar : "" ,
            Content: text,
            KDTID: dataProfile[0].KDTID
        }
        console.log('dataSend', dataSend)
        this.socket.emit("msg", dataSend);
        // console.log('send ok')
        let newMsg = this.state.dataChat;
        newMsg.push(dataSend);
        this.setState({dataChat: newMsg});
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#718792'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                        this.handleLoadMore()
                    }}
                    style={{backgroundColor: "#E0E0E0", flex: 1}}
                    data={this.state.dataChat}
                    renderItem={({item}) => {
                        // console.log('item', item)
                        return (
                            <ChatItem
                                dataItem={item}
                                myName={InfoUser[0].UserID}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
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
                <TextInputChat
                    style={{marginTop:5}}
                    onReceiveTextInputClick ={this.onReceiveTextInputClick}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        MessageGroupID: state.MessagesDetailsReducers,
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetMessage: bindActionCreators(callApiGetMessage, dispatch),

    }
};

TinNhanDetailsCuDan = connect(mapStateToProps, mapDispatchToProps)(TinNhanDetailsCuDan);

export default TinNhanDetailsCuDan
const myStyle = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 8,
        width: DEVICE_WIDTH / 8,
        borderRadius: DEVICE_WIDTH / 16,
        marginLeft: 10,
        marginRight: 10,

    }
})