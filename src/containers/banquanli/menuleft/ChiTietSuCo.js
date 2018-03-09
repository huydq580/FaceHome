import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import Dimensions from 'Dimensions';
import ChatSuCoItem from "../../../components/chatItem/ChatSuCoItem";
import CmtItem from "../../../components/status/CmtItem";
import {SOCKET} from "../../../components/Api";
import SocketIOClient from "socket.io-client";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiSearchCmtSuco} from "../../../actions/SearchCmtSuCoActions";
import {callApiPostCmtSuCo} from "../../../actions/CmtSuCoActions";

class ChiTietSuCo extends Component {
    constructor(props){
        super(props)
        this.input_msg = '';
        const { tongCmtSuCo } = this.props;
        // this.state = {
        //     dataItem: [],
        // }
        console.log('tong cmt Su Co', tongCmtSuCo)
        let ArrayCmt =[]
        if (tongCmtSuCo.payload instanceof Array ==true){
            ArrayCmt = tongCmtSuCo.payload
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
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.emit('logincomment', {
            UserID: UserBQL.payload[0].UserID,
            PostID: params.PostId,
            KDTID: UserBQL.payload[0].KDTID,
        })
        console.log('so luong cmt', this.state.dataCmt)
        this.socket.on('receivecomment', (dataReceive) => {
            console.log('receivecomment', dataReceive)
            //set newMsg = messga receive
            newCmt = this.state.dataCmt;
            //add message to array
            // newCmt.push({
            //     Content: dataReceive.Content,
            //     CreatedTime:dataReceive.CreatedTime,
            //     FullName: dataReceive.FullName,
            //     Avatar: dataReceive.Avatar,
            //     Picture: dataReceive.Picture,
            //     UserID:dataReceive.UserID,
            // });
            // this.setState({dataCmt: newCmt});

        })



    }
    sendCmt = ( Content, CreatedTime) => {
        const {UserBQL} = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        // console.log("msg:", this.input_msg);
        //object need send to server
        let dataSendCmt = {
            UserID: UserBQL.payload[0].UserID,
            FullName: UserBQL.payload[0].FullName,
            Avatar:UserBQL.payload[0].Avartar,
            Content: Content,
            Picture:"",
            CreatedTime: CreatedTime
        }
        this.socket.emit("comment", dataSendCmt);

    }
    Comment =() => {
        const { params } = this.props.navigation.state
        if (this.input_msg === "")
            return;
        this.textInput.clear();
        let SendCMT = this.input_msg;
        const { callApiPostCmtSuCo, UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null
        }
        callApiPostCmtSuCo( UserBQL.payload[0].KDTID,params.SuCoId, UserBQL.payload[0].UserID, UserBQL.payload[0].FullName, SendCMT).then(dataRes => {
            data = JSON.parse(dataRes);
            console.log('post bai thanh cong', dataRes)
            this.sendCmt(  SendCMT ,data.Value)
        })
    }


    render (){
        return(
            <View  style={{flex: 1 , backgroundColor:'white'}}>
                <View style = {{flexDirection:'row'}}>
                    <View style = {{flex:1, borderWidth:1,
                        borderColor:'#9E9E9E', marginLeft:10,marginRight:10, marginTop:20}}>
                        <Text>Nội dung sự cố</Text>

                    </View>
                    <View style = {{flexDirection:'column', flex:1, marginTop:20}}>
                            <Image style={styles.image_circle}

                                   source={{
                                       uri: 'http://streaming1.danviet.vn/upload/3-2017/images/2017-09-22/150607056296160-a1.jpg'
                                   }}
                                   resizeMode="cover"
                            >
                            </Image>

                        <View style = {{flexDirection:'column',
                            borderWidth:1, borderColor:'#9E9E9E', marginTop:10}}>
                            <Text style = {{fontSize:16, marginLeft:10}}>Nguyen Trong Dai</Text>
                            <Text style = {{fontSize:16,  marginLeft:10}}>0405</Text>

                        </View>
                        <View style = {{marginTop:10}}>
                            <Text>10h:20</Text>
                            <Text>20/02/2018</Text>
                        </View>
                        <View style = {{borderWidth:1, borderColor:'#9E9E9E',
                            marginTop:10, minHeight:30, alignItems:'center'}}>
                            <Text>Đã nhận</Text>
                        </View>


                    </View>
                </View>
                <View style={{flex: 1, marginTop: 20}}>
                    <FlatList
                        style={{backgroundColor: "white", flex: 1}}
                        data={this.state.dataCmt}
                        renderItem={({item}) => {
                            // console.log('item', item)
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
                                source={require('../../../images/camera.png')}
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
                                source={require('../../../images/send.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
        tongCmtSuCo: state.SearchCmtSuCoReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchCmtSuco: bindActionCreators(callApiSearchCmtSuco, dispatch),
        callApiPostCmtSuCo: bindActionCreators(callApiPostCmtSuCo, dispatch)
    }
};

ChiTietSuCo = connect(mapStateToProps, mapDispatchToProps)(ChiTietSuCo);
export default ChiTietSuCo
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,


    }
})