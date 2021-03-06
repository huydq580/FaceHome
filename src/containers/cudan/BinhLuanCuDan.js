import React, { Component } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput, AsyncStorage

} from 'react-native';
import stylesContainer from "../../components/style";
import CmtItem from "../../components/status/CmtItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiPostCmt} from "../../actions/cudan/PostCmtActions";
import SocketIOClient from "socket.io-client";
import {SOCKET} from "../../components/Api";
import TextInputChat from "../../components/TextInputChat";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";

class BinhLuanCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Bình luận',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
        super(props)
        this.input_msg = '';
        const { tongCmt } = this.props;
        console.log('tongcmt', tongCmt)
        let ArrayCmt =[]
        if (tongCmt.payload instanceof Array ==true){
            ArrayCmt = tongCmt.payload
        }
        else {
            ArrayCmt =[]
        }

        this.state = {
            dataCmt : ArrayCmt
        }

    }
    componentWillMount() {
        const { params } = this.props.navigation.state
        console.log('params', params)
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        console.log('this.socket', this.socket)
        this.socket.emit('logincomment', {
            PostID: params.postId,
            IntUserID: InfoUser[0].IntUserID,
            KDTID: dataProfile[0].KDTID,
        })
        // console.log('so luong cmt', this.state.dataCmt)
        this.socket.on('receivecomment', (dataReceive) => {
            console.log('receivecomment', dataReceive)
            dataPost = dataReceive.PostContent;
            //set newMsg = messga receive
            newCmt = this.state.dataCmt;
            //add message to array
            newCmt.push({
                Avatar: dataReceive.Avatar,
                Content:dataReceive.Content,
                DatePost:dataReceive.DatePost,
                FullName:dataReceive.FullName,
                IntUserID :dataReceive.IntUserID,
                IntUserIDPost: dataReceive.IntUserIDPost,
                KDTID:dataReceive.KDTID,
                PostID: dataReceive.PostID
            });
            this.setState({dataCmt: newCmt});

        })



    }
    sendCmt = ( DatePost, Content) => {
        const { params } = this.props.navigation.state
        // console.log('params binh luan', params)
        AsyncStorage.getItem("token").then(value => {
            console.log('value', value)
            const {InfoUser} = this.props;
            if (InfoUser.length <= 0) {
                return null;
            }
            let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
            dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
            // console.log("msg:", this.input_msg);
            //object need send to server
            let dataSendCmt = {
                KDTID: dataProfile[0].KDTID,
                IntUserID: InfoUser[0].IntUserID,
                PostID: params.postId,
                FullName:InfoUser[0].FullName ,
                DatePost: DatePost,
                Content: Content,
                TokenDevice : value,
                Avatar: InfoUser[0].Avatar ? InfoUser[0].Avatar : "",
                IntUserIDPost: params.IntUserIDPost
            }
            this.socket.emit("comment", dataSendCmt);
            console.log('dataSendCmt', dataSendCmt)
        })

    }
    onReceiveTextInputClick =(text) => {
        const { params } = this.props.navigation.state
        const { callApiPostCmt, InfoUser } = this.props;
        if (InfoUser.length <=0){
            return null
        }
        if (text === "")
            return;
        let avt =  InfoUser[0].Avatar ? InfoUser[0].Avatar : ""
        let SendCMT = text;

        if (InfoUser.length <= 0) {
            return null
        }
        callApiPostCmt(params.postId, InfoUser[0].UserID,InfoUser[0].IntUserID, 2, InfoUser[0].FullName, SendCMT, avt).then(dataRes => {
            data = JSON.parse(dataRes);
            this.sendCmt( data.Value.CreatedTime, SendCMT)
        })
    }
    render (){
        // console.log('dataCmt', this.state.dataCmt)
        return (
            <View style = {stylesContainer.container}>
                <FlatList
                    data={this.state.dataCmt}
                    renderItem={(item) => {
                        return (
                            <CmtItem
                                dataItem={item}
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
                    onReceiveTextInputClick={this.onReceiveTextInputClick}
                />

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        tongCmt: state.SearchCmtReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiPostCmt: bindActionCreators(callApiPostCmt, dispatch)
    }
};

BinhLuanCuDan = connect(mapStateToProps, mapDispatchToProps)(BinhLuanCuDan);
export default BinhLuanCuDan