import React, { Component } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput, AsyncStorage,
    Text

} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import SocketIOClient from "socket.io-client";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import {callApiPostCmtSuCo} from "../../../actions/suco/CmtSuCoActions";
import {SOCKET} from "../../../components/Api";
import stylesContainer from "../../../components/style";
import CmtItem from "../../../components/status/CmtItem";
import TextInputChat from "../../../components/TextInputChat";

class BinhLuanSuCo extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Bình luận sự cố',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
        super(props)
        this.input_msg = '';


        this.state = {
            dataCmt : []
        }

    }
    componentWillMount() {
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
        const { params } = this.props.navigation.state
        this.socket.emit('logincomment', {
            PostID: params.SuCoID,
            IntUserID: InfoUser[0].IntUserID,
            KDTID: dataProfile[0].KDTID,
        })
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
                SuCoID: dataReceive.SuCoID
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
            //object need send to server
            let dataSendCmt = {
                KDTID: dataProfile[0].KDTID,
                IntUserID: InfoUser[0].IntUserID,
                SuCoID: params.SuCoID,
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
        const { callApiPostCmtSuCo, InfoUser } = this.props;
        if (InfoUser.length <=0){
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        if (text === "")
            return;
        let avt =  InfoUser[0].Avatar ? InfoUser[0].Avatar : ""
        let SendCMT = text;

        if (InfoUser.length <= 0) {
            return null
        }
        callApiPostCmtSuCo(dataProfile[0].KDTID, params.SuCoID, InfoUser[0].UserID,InfoUser[0].FullName , avt, SendCMT ).then(dataRes => {
            console.log('dataSuCo', dataRes)
            data = JSON.parse(dataRes);
            this.sendCmt( data.Value, SendCMT)
        })
    }
    render (){
        // console.log('dataCmt', this.state.dataCmt)
        return (
            <View style = {stylesContainer.container}>
                {/*<Text>dfsdfds</Text>*/}
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
        callApiPostCmtSuCo: bindActionCreators(callApiPostCmtSuCo, dispatch)
    }
};

BinhLuanSuCo = connect(mapStateToProps, mapDispatchToProps)(BinhLuanSuCo);
export default BinhLuanSuCo