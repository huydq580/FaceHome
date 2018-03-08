import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Button
} from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import stylesContainer from "../../components/style";
import PickerImage from "../../components/PickerImage"
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {callApiCreatePost, callApiUploadImage} from "../../actions/SoanTinActions";
import SocketIOClient from "socket.io-client";
import {SOCKET} from "../../components/Api";


class SoanTin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkImg: 'http://192.168.1.254:9051',
            Status: '',
            avatarSource: null,
            dataImage: null,
            resizedImageUri: '',
        }
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
    }

    //handle event header
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerRight: <TouchableOpacity style={{marginRight: 10}}
                                           onPress={() => params.handleSave()}>
                <Text style={{color: "#1565C0"}}>Chia sẻ</Text>
            </TouchableOpacity>
        }
    }

    // function header
    share() {
        const {UserBQL, callApiCreatePost} = this.props;
        if (UserBQL.length <= 0) {
            return null
        }
        // console.log('dfd', UserBQL.payload[0].KDTID)
        // console.log('linkimg', this.state.linkImg)
        callApiCreatePost(UserBQL.payload[0].KDTID, UserBQL.payload[0].UserID, UserBQL.payload[0].Type, UserBQL.payload[0].FullName, this.state.Status, this.state.linkImg).then(dataPost => {
            data = JSON.parse(dataPost);
            if (data.ErrorCode === "00") {
                Alert.alert(
                    'Alert',
                    data.Message,
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.sendPost( data.Value.CreatedDate, this.state.Status,data.Value.CommentID)
                                this.props.navigation.goBack()
                            }
                        },
                    ],
                    {cancelable: false}
                )
            }
            else {
                Alert.alert(
                    'Alert',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            }

        })

    }

    sendPost = (CreatedDate, Content, PostID) => {
        const {UserBQL} = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        // console.log("msg:", this.input_msg);
        //object need send to server
        let dataSendPost = {
            RowNum: "",
            KDTID: UserBQL.payload[0].KDTID,
            UserID: UserBQL.payload[0].UserID,
            FullName: UserBQL.payload[0].FullName,
            Avatar: UserBQL.payload[0].Avatar,
            CreatedDate: CreatedDate,
            UserType: 255,
            TotalComment: "",
            TotalLike: "",
            TotalShare: "",
            PostContent: Content,
            TotalRow: "",
            PostID: PostID,
            Comments:''
        }
        this.socket.emit("post", dataSendPost);

    }

    componentDidMount() {
        // call function SaveDetails
        this.props.navigation.setParams({handleSave: this.share.bind(this)});
    }

    //call function PickerImage component(upload image local)
    show() {
        PickerImage((source, data) => this.setState({avatarSource: source, dataImage: data}));
    }

    upload() {
        const {UserBQL, callApiUploadImage} = this.props;
        if (UserBQL.length <= 0) {
            return null
        }
        callApiUploadImage(UserBQL.payload[0].UserID, this.state.dataImage).then(dataImg => {
            dataImg = JSON.parse(dataImg)
            dataImg = dataImg.Value
            // console.log('dataImage1', dataImg)
            this.setState({
                linkImg: 'http://192.168.1.254:9051' + dataImg
            })
        })
    }

    render() {
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={{height: 200, width: 200}}
            />
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style={{resizeMode: 'cover', height: 40, width: 30, marginLeft: 10}}>
                        </Image>
                        <View style={{marginLeft: 10}}>
                            <Text style={{color: 'black'}}>Nguyễn Văn A</Text>
                            <Text>Mọi người</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                        <TextInput placeholder='Soạn tin mới'
                                   underlineColorAndroid="transparent"
                                   onChangeText={(Status) => this.setState({Status})}
                                   placeholderTextSize="20"/>
                    </View>
                </View>
                {/*<TouchableOpacity onPress={this.upload.bind(this)}>*/}
                {/*<Text style = {{fontSize: 30}}>Upload</Text>*/}
                {/*</TouchableOpacity>*/}

                {img}

                <View style={{
                    flexDirection: 'row',
                    marginTop: 50,
                    minHeight: 30,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>Thêm vào bài viết của bạn</Text>
                    <TouchableOpacity onPress={this.show.bind(this)}>
                        <Icon name="md-images" size={30} color="#900"
                              style={{flex: 1}}/>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImage: bindActionCreators(callApiUploadImage, dispatch),
        callApiCreatePost: bindActionCreators(callApiCreatePost, dispatch)
    }
};

SoanTin = connect(mapStateToProps, mapDispatchToProps)(SoanTin);
export default SoanTin;
