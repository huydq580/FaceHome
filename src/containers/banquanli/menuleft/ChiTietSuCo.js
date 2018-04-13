import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Picker, Alert
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import CmtItem from "../../../components/status/CmtItem";
import {CreateKDT, GetDetailSuCo, SOCKET, URL} from "../../../components/Api";
import SocketIOClient from "socket.io-client";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiSearchCmtSuco} from "../../../actions/SearchCmtSuCoActions";
import {callApiPostCmtSuCo} from "../../../actions/CmtSuCoActions";
import moment from "moment/moment";
import {NavigationActions} from "react-navigation";

class ChiTietSuCo extends Component {
    constructor(props){
        super(props)
        this.input_msg = '';
        const { tongCmtSuCo } = this.props;
        let ArrayCmt =[]
        if (tongCmtSuCo.payload instanceof Array ==true){
            ArrayCmt = tongCmtSuCo.payload
        }
        else {
            ArrayCmt =[]
        }

        this.state = {
            dataCmt : ArrayCmt,
            Status:'',
            DetailSuCo: "",
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
            SuCoID: params.SuCoId,
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
    // getDetailsSuCo = () => {
    //     fetch( URL + GetDetailSuCo,  {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //
    //         },
    //         body: JSON.stringify({
    //             id: 1,
    //             lang_name: "vi_VN"
    //         })
    //     })
    //         .then((response) => response.json())
    //         .then((dataRes)=> {
    //             data = JSON.parse(dataRes);
    //
    //             console.log('dataREs', dataRes)
    //
    //         }).catch((erro)=> {
    //         console.log('erro',erro);
    //     })
    // }
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
        callApiPostCmtSuCo( InfoUser[0].KDTID,params.SuCoId, InfoUser[0].UserID, InfoUser[0].FullName, SendCMT).then(dataRes => {
            data = JSON.parse(dataRes);
            // console.log('post bai thanh cong', dataRes)
            this.sendCmt(  SendCMT ,data.Value)
        })
    }


    render (){
        const { params } = this.props.navigation.state
        console.log('item su co', params)
        return(
            <ScrollView  style={{flex: 1 , backgroundColor:'white'}}>
                <View style = {{flexDirection:'row'}}>
                    <View style = {{flex:1, borderWidth:1,
                        borderColor:'#9E9E9E', marginLeft:10,
                        marginRight:10, marginTop:20,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Text>{params.ItemSuCo.Content}</Text>

                    </View>
                    <View style = {{flexDirection:'column', flex:1, marginTop:20}}>
                            <Image style={styles.image_circle}

                                   source={{
                                       uri: params.ItemSuCo.Image
                                   }}
                                   resizeMode="cover"
                            >
                            </Image>

                        <View style = {{flexDirection:'column',
                            borderWidth:1, borderColor:'#9E9E9E', marginTop:10}}>
                            <Text style = {{fontSize:16, marginLeft:10}}>{params.ItemSuCo.FullName}</Text>
                            <Text style = {{fontSize:16,  marginLeft:10}}>{params.ItemSuCo.PartName}</Text>

                        </View>
                        <View style = {{marginTop:10}}>
                            <Text>{moment(new Date(params.ItemSuCo.CreatedDate)).format("LT")}</Text>
                            <Text>{moment(new Date(params.ItemSuCo.CreatedDate)).format("L")}</Text>
                        </View>
                        {/*<View style={{*/}
                            {/*width: DEVICE_WIDTH / 2 - 10,*/}
                            {/*marginTop: 10, maxHeight: 40,*/}
                            {/*alignItems: 'center',*/}
                            {/*flexDirection: 'row', alignItems: 'center',*/}
                            {/*borderWidth: 1, borderColor: '#9E9E9E'*/}
                        {/*}}>*/}
                            {/*<Picker*/}
                                {/*style={styles.picker}*/}
                                {/*selectedValue={this.state.Status}*/}
                                {/*onValueChange={(itemValue, itemIndex) => this.setState({Status: itemValue})}>*/}
                                {/*<Picker.Item label={'Đã nhận'} value='key1'/>*/}
                                {/*<Picker.Item label={'Đang xử lý'} value={'key2'}/>*/}
                                {/*<Picker.Item label={'Đã xử lý'} value={'key3'}/>*/}
                            {/*</Picker>*/}
                        {/*</View>*/}

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

ChiTietSuCo = connect(mapStateToProps, mapDispatchToProps)(ChiTietSuCo);
export default ChiTietSuCo
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,


    },
    picker: {
        width: DEVICE_WIDTH / 2 - 40,
    }
})