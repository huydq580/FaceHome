import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Button, StyleSheet,
    Keyboard,
    FlatList,

} from 'react-native';
import Dimensions from 'Dimensions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import stylesContainer from "../../components/style";
import PickerImage from "../../components/PickerImage"
import Icon from 'react-native-vector-icons/Ionicons';
import SocketIOClient from "socket.io-client";
import {LINKIMG, SOCKET, URL} from "../../components/Api";
import images from "../../components/images";
import {callApiUploadImage} from "../../actions/cudan/UploadImageActions";
import {callApiCreatePost} from "../../actions/cudan/CreatePostActions";


class SoanTinCuDan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkImg: URL,
            ListToa: [],
            Status: '',
            avatarSource: null,
            dataImage: null,
            resizedImageUri: '',
            isCheck: true,
            isCheck1: true,
            ArrOptions: [
                {
                    option: "Lựa chọn 1",
                    id: 1,
                },
                {
                    option: "Lựa chọn 2",
                    id: 2
                }
            ]
        }
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
    }

    //show toolbar
    handleTextInput = () => {
        this.setState({
            isCheck: false
        })

    }

    //show tham do y kien
    ThamDoYKien = () => {
        this.setState({
            isCheck1: false,
            isCheck: false,
            ArrOptions: [
                {
                    option: "Lựa chọn 1",
                    id: 1,
                },
                {
                    option: "Lựa chọn 2",
                    id: 2
                }
            ]
        })
    }

    //them 1 lua chon
    Push = (index) => {
        // console.log('push')
        // console.log('ArrOptions', this.state.ArrOptions)
        var ArrMoi = this.state.ArrOptions
        ArrMoi.push({"option": `Lựa chọn ${index + 2}`})
        this.setState({
            ArrOptions: ArrMoi
        })
    }
    //show image
    show() {
        PickerImage((source, data) => this.setState({avatarSource: source, dataImage: data}, ()=>{
            this.upload()
        }));
    }
    // upload image
    upload() {
        const {InfoUser, callApiUploadImage} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        callApiUploadImage(InfoUser[0].UserID, this.state.dataImage).then(dataImg => {
            dataImg = JSON.parse(dataImg)
            dataImg = dataImg.Value
            // console.log('dataImage1', dataImg)
            this.setState({
                linkImg: LINKIMG + dataImg
            }, console.log('linkImg', this.state.linkImg))
        })
    }

    DangBaiViet = () => {
        const { callApiCreatePost, InfoUser } = this.props
        if (InfoUser.length <=0) {
            return null
        }
        let dataLtProfile = ( InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile): null;
        console.log('dataPro', dataProfile)
        console.log('dataPro', dataProfile[0].KDTID)
        callApiCreatePost(
            dataProfile[0].KDTID,
            InfoUser[0].UserID,
            InfoUser[0].IntUserID,
            dataProfile[0].Type,
            InfoUser[0].FullName,
            this.state.Status,
            this.state.linkImg,
            InfoUser[0].Avatar,
            this.state.ArrOptions).then(dataPost => {
            // data = JSON.parse(dataPost);
            console.log('thong bao postbai', dataPost)
            // if (data.ErrorCode === "00") {
            //     Alert.alert(
            //         'Alert',
            //         data.Message,
            //         [
            //             {
            //                 text: 'OK', onPress: () => {
            //                     this.sendPost( data.Value.CreatedTime, this.state.Status,data.Value.PostID)
            //                     this.props.navigation.goBack()
            //                 }
            //             },
            //         ],
            //         {cancelable: false}
            //     )
            // }
            // else {
            //     Alert.alert(
            //         'Alert',
            //         data.Message,
            //         [
            //             {text: 'OK', onPress: () => console.log('OK Pressed')},
            //         ],
            //         {cancelable: false}
            //     )
            // }

        })

    }



    render() {
        const {  InfoUser } = this.props
        if (InfoUser.length <=0) {
            return null
        }

        // console.log('infouser', InfoUser)
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={{height: 200, width: 200}}
            />
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                {this.state.isCheck1 ? <View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Image
                            source={{
                                uri: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg"
                            }}
                            style={styles.image_circle}
                            resizeMode="cover">
                        </Image>
                        <View style={{marginLeft: 10}}>
                            <Text style={{color: 'black'}}>Nguyễn Văn Hiệu</Text>
                            <Text>Mọi người</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                        <TextInput placeholder='Bạn muốn nói gì?'
                                   underlineColorAndroid="transparent"
                                   onChangeText={(Status) => this.setState({Status})}
                                   placeholderTextSize="20"
                                   onFocus={() => {
                                       this.handleTextInput()
                                   }}
                        />
                    </View>
                    {img}
                </View> : <View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Image
                            source={{
                                uri: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg"
                            }}
                            style={styles.image_circle}
                            resizeMode="cover">
                        </Image>
                        <View style={{marginLeft: 10}}>
                            <Text style={{color: 'black'}}>Nguyễn Văn Hiệu</Text>
                            <Text>Mọi người</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                        <TextInput placeholder='Đặt câu hỏi'
                                   underlineColorAndroid="transparent"
                                   onChangeText={(Status) => this.setState({
                                       Status
                                   })}
                                   placeholderTextSize="20"
                        />
                    </View>
                    <FlatList
                        data={this.state.ArrOptions}
                        renderItem={({item, index}) => {
                            return (
                                <View style={{flexDirection: 'row', alignItems:'center',  marginTop: 10}}>
                                    <View style={{
                                        marginLeft: 10,
                                        borderRadius: 15,
                                        flexDirection: 'row',
                                        borderColor:'#E0E0E0',
                                        borderWidth: 1, width: "85%",
                                    }}>
                                        <TextInput placeholder = {item.option}
                                                   style = {{padding:0, marginLeft: 10, flex:1}}
                                                   underlineColorAndroid="transparent"
                                                   placeholderTextSize="20"
                                                   onChangeText = {(text)=>{
                                                       const ArrOptions = this.state.ArrOptions.map(toa=>{
                                                           if(toa == item) {
                                                               toa.option = text
                                                           }
                                                           return toa;
                                                       })
                                                       this.setState({ArrOptions}, ()=> console.log('listToa', ArrOptions))
                                                   }}
                                        />

                                    </View>
                                    {
                                        index === (this.state.ArrOptions.length - 1) ?
                                            <View style = {{justifyContent:"center", alignItems:'center', width: "15%"}}>
                                                <TouchableOpacity onPress={() => this.Push(index)}>
                                                    <Image
                                                        source={images.insert}
                                                        style={{height: 25, width: 25}}
                                                        resizeMode="cover">
                                                    </Image>
                                                </TouchableOpacity>
                                            </View>
                                            : null
                                    }


                                </View>
                            )
                        }}

                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}

                    />


                </View>
                }

                {
                    this.state.isCheck ? <View>
                        <View style={{height: 1, backgroundColor: '#E0E0E0', marginTop: 7}}/>
                        <TouchableOpacity onPress = {() => this.ThamDoYKien()}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 7}}>
                                <Image
                                    source={images.vote}
                                    style={{height: 30, width: 40, marginLeft: 15}}
                                    resizeMode="cover">
                                </Image>
                                <Text style={{marginLeft: 10, color: 'black', fontSize: 16}}>Thăm dò ý kiến</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height: 1, backgroundColor: '#E0E0E0', marginTop: 7}}/>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 7}}>
                                <Image
                                    source={images.warning}
                                    style={{height: 25, width: 25, marginLeft: 15}}
                                    resizeMode="cover">
                                </Image>
                                <Text style={{marginLeft: 10, color: 'black', fontSize: 16}}>Phản ánh sự cố</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{height: 1, backgroundColor: '#E0E0E0', marginTop: 7}}/>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 7}}>
                                <Image
                                    source={images.mess_admin}
                                    style={{height: 25, width: 25, marginLeft: 15}}
                                    resizeMode="cover">
                                </Image>
                                <Text style={{marginLeft: 10, color: 'black', fontSize: 16}}>Nhắn tin tới ban quản lý</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height: 1, backgroundColor: '#E0E0E0', marginTop: 7}}/>

                    </View> :  <View style={{
                        flexDirection: 'row',
                        marginTop: 50,
                        minHeight: 30,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress = {() => {
                            this.setState({
                                isCheck:true

                            })
                            Keyboard.dismiss()
                        }}>
                            <View style = {{marginLeft: 10, borderWidth:1, height: 25, borderColor:"#E0E0E0", backgroundColor:'#EEEEEE', justifyContent:'center', width:DEVICE_WIDTH/2-20}}>
                                <Text style = {{marginLeft: 5}}>Chọn kiểu bài viết</Text>
                            </View>
                        </TouchableOpacity>
                        <View style = {{flexDirection:'row'}}>
                            <TouchableOpacity onPress={this.show.bind(this)}>
                                <Icon name="md-images" size={25} color="#900"
                                      style={{flex: 1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() => this.DangBaiViet()}>
                                <View style = {{marginLeft: 10,marginRight: 10, backgroundColor:'#B3E5FC', borderWidth:1, borderRadius:3, borderColor:'#81D4FA', alignItems:'center', justifyContent:'center', height:25, width:65}}>
                                    <Text>Đăng</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                }


            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImage: bindActionCreators(callApiUploadImage, dispatch),
        callApiCreatePost: bindActionCreators(callApiCreatePost, dispatch)
    }
};

SoanTinCuDan = connect(mapStateToProps, mapDispatchToProps)(SoanTinCuDan);
export default SoanTinCuDan;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },

})

