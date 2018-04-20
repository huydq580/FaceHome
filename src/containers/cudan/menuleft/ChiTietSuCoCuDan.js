import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    ScrollView


} from 'react-native';
import stylesContainer from "../../../components/style";
import CmtItem from "../../../components/status/CmtItem";
import SocketIOClient from "socket.io-client";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {SOCKET} from "../../../components/Api";
import {callApiSearchCmtSuco} from "../../../actions/SearchCmtSuCoActions";
import {callApiPostCmtSuCo} from "../../../actions/CmtSuCoActions";

class ChiTietSuCoCuDan extends Component {
    constructor(props){
        super(props)
        this.input_msg = '';
        const { tongCmtSuCo } = this.props;
        console.log('tong cmt su co cu dan', tongCmtSuCo.payload)
        let ArrayCmt =[]
        if (tongCmtSuCo.payload instanceof Array == true){
            ArrayCmt = tongCmtSuCo.payload
        }
        else {
            ArrayCmt =[]
        }

        this.state = {
            dataCmt : ArrayCmt,
            Status:''
        }
    }
    componentWillMount() {
        const { params } = this.props.navigation.state
        // console.log('params', params.PostId)
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.emit('logincomment', {
            UserID: InfoUser[0].UserID,
            SuCoID: InfoUser.SuCoId,
            KDTID: InfoUser[0].KDTID,
        })
        console.log('so luong cmt', this.state.dataCmt)
        this.socket.on('receivecomment', (dataReceive) => {
            console.log('receivecomment', dataReceive)
            //set newMsg = messga receive
            newCmt = this.state.dataCmt;
            //add message to array
            newCmt.push({
                Content: dataReceive.Content,
                CreatedTime:dataReceive.CreatedTime,
                FullName: dataReceive.FullName,
                Avatar: dataReceive.Avatar,
                Picture: dataReceive.Picture,
                UserID:dataReceive.UserID,
            });
            this.setState({dataCmt: newCmt});

        })



    }
    sendCmt = ( Content, CreatedTime) => {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        // console.log("msg:", this.input_msg);
        //object need send to server
        let dataSendCmt = {
            UserID: InfoUser[0].UserID,
            FullName: InfoUser[0].FullName,
            Avatar:InfoUser[0].Avartar,
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
        const { callApiPostCmtSuCo, InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        callApiPostCmtSuCo( InfoUser[0].KDTID,params.SuCoId, InfoUser[0].UserID,InfoUser[0].ProfileID,  InfoUser[0].FullName, SendCMT).then(dataRes => {
            data = JSON.parse(dataRes);
            // console.log('post bai thanh cong', dataRes)
            this.sendCmt(  SendCMT ,data.Value)
        })
    }

    render () {
        return(
            <ScrollView style = {stylesContainer.container}>
                <TouchableOpacity onPress = { () => this.props.navigation.navigate('BaoSuCoMoi')}>
                    <Text style = {{marginLeft: 250, color: 'black', textDecorationLine: "underline", marginTop:10, marginBottom:10, marginRight: 20}}>
                        Báo sự cố mới
                    </Text>
                </TouchableOpacity>
                <View style = {{marginTop: 20, flexDirection:'row', height:100, alignItems:'center'}}>
                    <Image style = {styles.Img}
                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"></Image>
                    <View style = {{flexDirection:'column', flex:2, marginLeft:20, justifyContent:'center'}}>
                        <Text style = {{fontSize:16, fontWeight:'bold'}}>
                            Ngày gửi
                        </Text>
                        <Text style = {{marginTop:5}}>
                            10h:20
                        </Text>
                        <Text style = {{marginTop:5}}>
                           16/01/2018
                        </Text>
                        <Text style = {{marginTop:5, fontSize:16, fontWeight:'bold'}}>
                            Tình trạng: Đã nhận
                        </Text>


                    </View>
                </View>
                <View style={{flex: 1, marginTop: 20}}>
                    <FlatList
                        style={{backgroundColor: "white", flex: 1}}
                        data={this.state.dataCmt}
                        renderItem={(item) => {
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
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        tongCmtSuCo: state.SearchCmtSuCoReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchCmtSuco: bindActionCreators(callApiSearchCmtSuco, dispatch),
        callApiPostCmtSuCo: bindActionCreators(callApiPostCmtSuCo, dispatch)
    }
};

ChiTietSuCoCuDan = connect(mapStateToProps, mapDispatchToProps)(ChiTietSuCoCuDan);
export default ChiTietSuCoCuDan;
const styles = StyleSheet.create({
    Img : {
        flex:1,
        height:100
    }
})