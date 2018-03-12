import React, { Component } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput

} from 'react-native';
import stylesContainer from "../../components/style";
import CmtItem from "../../components/status/CmtItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiPostCmt} from "../../actions/PostCmtActions";
import SocketIOClient from "socket.io-client";
import {SOCKET} from "../../components/Api";

class BinhLuanCuDan extends Component {
    constructor(props){
        super(props)
        this.input_msg = '';
        const { tongCmt } = this.props;
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
        // console.log('params', params.PostId)
        const { UserCuDan } = this.props;
        if (UserCuDan.length <= 0) {
            return null;
        }
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.emit('logincomment', {
            UserID: UserCuDan.payload[0].UserID,
            PostID: params.PostId,
            KDTID: UserCuDan.payload[0].KDTID,
        })
        console.log('so luong cmt', this.state.dataCmt)
        this.socket.on('receivecomment', (dataReceive) => {
            console.log('receivecomment', dataReceive)
            dataPost = dataReceive.PostContent;
            //set newMsg = messga receive
            newCmt = this.state.dataCmt;
            //add message to array
            newCmt.push({
                RowNum:dataReceive.RowNum,
                CommentID:dataReceive.CommentID,
                UserID:dataReceive.UserID,
                FullName:dataReceive.FullName,
                Avartar:dataReceive.Avartar,
                CreatedDate:dataReceive.CreatedDate,
                UserType:dataReceive.UserType,
                TotalLike:dataReceive.TotalLike,
                Content:dataReceive.Content,
                TotalRow:dataReceive.TotalRow
            });
            this.setState({dataCmt: newCmt});

        })



    }
    sendCmt = (CommentID, CreatedDate, Content) => {
        const {UserCuDan} = this.props;
        if (UserCuDan.length <= 0) {
            return null;
        }
        // console.log("msg:", this.input_msg);
        //object need send to server
        let dataSendCmt = {
            RowNum:"",
            CommentID:CommentID,
            UserID:UserCuDan.payload[0].UserID,
            FullName:UserCuDan.payload[0].FullName,
            Avartar:UserCuDan.payload[0].Avartar,
            CreatedDate:CreatedDate,
            UserType:UserCuDan.payload[0].UserID,
            TotalLike:"",
            Content:Content,
            TotalRow:""
        }
        this.socket.emit("comment", dataSendCmt);

    }
    Comment =() => {
        const { params } = this.props.navigation.state
        if (this.input_msg === "")
            return;
        this.textInput.clear();
        let SendCMT = this.input_msg;
        const { callApiPostCmt, UserCuDan } = this.props;
        if (UserCuDan.length <= 0) {
            return null
        }
        callApiPostCmt(params.PostId, UserCuDan.payload[0].UserID, UserCuDan.payload[0].Type, UserCuDan.payload[0].FullName, SendCMT).then(dataRes => {
            data = JSON.parse(dataRes);
            this.sendCmt( data.Value.CommentID ,data.Value.CreatedDate, SendCMT)
        })
    }
    render (){
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
                        onPress={this.Comment}
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
        UserCuDan: state.LoginReducers,
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