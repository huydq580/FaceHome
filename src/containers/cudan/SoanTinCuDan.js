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
import Icon1 from 'react-native-vector-icons/FontAwesome';
import SocketIOClient from "socket.io-client";
import {LINKIMG, SOCKET, URL} from "../../components/Api";
import images from "../../components/images";
import {callApiUploadImage} from "../../actions/cudan/UploadImageActions";
import {callApiCreatePost} from "../../actions/cudan/CreatePostActions";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";
import {NavigationActions} from "react-navigation";
import {callApiPostSuCo} from "../../actions/suco/PostSuCoActions";

class SoanTinCuDan extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Tạo bài viết',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }

    constructor(props) {
        super(props)
        this.state = {
            linkImg: URL,
            ListToa: [],
            Status: '',
            avatarSource: null,
            dataImage: null,
            resizedImageUri: '',
            isCheckToolBar: 1, //interface toolbar
            isCheckContent: 1, // interface content
            type: 0,
            ArrOptions: [
                {
                    option: "Lựa chọn 1",
                    id: 1,
                },
                {
                    option: "Lựa chọn 2",
                    id: 2
                }
            ],

            ArrButton: [
                {
                    key: 1,
                    value: 1,
                    option: "Nhà riêng"
                },
                {
                    key: 2,
                    value: 2,
                    option: "Chung"
                },
            ],
            itemSelected: 1, //button radio
        }
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        console.log('dataProfile', dataProfile)
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.emit('loginpost', {
            KDTID: dataProfile[0].KDTID,
            IntUserID: InfoUser[0].IntUserID,

        })

    }


    //show toolbar
    handleTextInput = () => {
        this.setState({
            isCheckToolBar: 4
        })

    }

    //show tham do y kien
    ThamDoYKien = () => {
        this.setState({
            isCheckContent: 2,
            isCheckToolBar: 2,
            type: 1,
            ArrOptions: [
                {
                    OptionContent: "Lựa chọn 1",
                    id: 1,
                },
                {
                    OptionContent: "Lựa chọn 2",
                    id: 2
                }
            ],
        })
    }

    //them 1 lua chon
    Push = (index) => {
        // console.log('push')
        // console.log('ArrOptions', this.state.ArrOptions)
        var ArrMoi = this.state.ArrOptions
        ArrMoi.push({"OptionContent": `Lựa chọn ${index + 2}`})
        this.setState({
            ArrOptions: ArrMoi
        })
    }

    //show image
    show() {
        PickerImage((source, data) => this.setState({avatarSource: source, dataImage: data}, () => {
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
            }, () => console.log('linkImg', this.state.linkImg))
        })
    }

    // componentWillUnmount() {
    //     this.state.Status ? Alert.alert(
    //         'Thông báo',
    //         data.Message,
    //         [
    //             {text: 'OK', onPress: () => console.log('OK Pressed')},
    //         ],
    //         {cancelable: false}
    //     ) : null
    // }
    SendPost = (PostID, CreatedDate, PostContent, Images, PollVote, Type) => {
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        let dataSendPost = {
            KDTID: dataProfile[0].KDTID,
            IntUserID: InfoUser[0].IntUserID,
            PostID: PostID,
            FullName: InfoUser[0].FullName,
            CreatedDate: CreatedDate,
            PostContent: PostContent,
            Avatar: InfoUser[0].Avatar ? InfoUser[0].Avatar : "http://image.facehome.vn/avatar/default.png",
            UserType: 2,
            Images: Images,
            Poll: PollVote,
            Type: Type,
            Comments: [],
        }
        this.socket.emit("post", dataSendPost);
    }

    DangBaiViet = () => {
        const {callApiCreatePost, InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        // console.log('dataPro', dataProfile)
        // console.log("type", this.state.type)
        callApiCreatePost(
            dataProfile[0].KDTID,
            InfoUser[0].UserID,
            InfoUser[0].IntUserID,
            dataProfile[0].Type,
            InfoUser[0].FullName,
            this.state.Status,
            this.state.linkImg,
            InfoUser[0].Avatar,
            this.state.type,
            this.state.ArrOptions).then(dataRes => {
            data = JSON.parse(dataRes);
            // console.log('thong bao postbai', data)
            if (data.ErrorCode === "00") {
                this.SendPost(data.Value.PostID, data.Value.CreatedTime, this.state.Status, this.state.linkImg, this.state.ArrOptions, this.state.type)
                this.props.navigation.dispatch(NavigationActions.pop({
                    n: 2,
                }))
            }
            else {
                Alert.alert(
                    'Thông báo',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            }

        })

    }

    PostSuCo = () => {
        const { callApiPostSuCo, InfoUser } = this.props
        if (InfoUser.length <=0){
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        console.log('dataProfile[0].Type', dataProfile[0].Type)
        callApiPostSuCo(
            dataProfile[0].KDTID,
            InfoUser[0].UserID,
            InfoUser[0].IntUserID,
            InfoUser[0].FullName,
            InfoUser[0].Avatar,
            dataProfile[0].PartName,
            this.state.linkImg,
            dataProfile[0].Type,
            this.state.itemSelected,
            this.state.Status,
            ""

        ).then(dataRes => {
            data = JSON.parse(dataRes);
            // console.log('thong bao postbai', data)
            if (data.ErrorCode === "00") {
                this.props.navigation.dispatch(NavigationActions.pop({
                    n: 2,
                }))
            }
            else {
                Alert.alert(
                    'Thông báo',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            }
        })

    }


    render() {
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
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
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 15,
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}>
                        <View style={{flexDirection: "row"}}>
                            <Image
                                source={
                                    // uri: InfoUser[0].Avatar
                                    !InfoUser[0].Avatar ? images.noavatar : {uri: InfoUser[0].Avatar}
                                }
                                style={styles.image_circle}
                                resizeMode="cover">
                            </Image>
                            <View style={{marginLeft: 10}}>
                                <Text style={{color: 'black'}}>{InfoUser[0].FullName}</Text>
                                <Text>Mọi người</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: "black",
                                backgroundColor: "#80DEEA",
                                height: 25,
                                width: 90,
                                marginRight: 10,
                                borderRadius: 3
                            }}>
                                <Text>Hủy bài viết</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.state.isCheckContent == 1 ?
                        <View>

                            <View style={{marginHorizontal: 10, marginTop: 10}}>
                                <TextInput placeholder='Bạn muốn nói gì?'
                                           underlineColorAndroid="transparent"
                                           onChangeText={(Status) => this.setState({Status})}
                                           placeholderTextSize="20"
                                           returnKeyType={"search"}
                                           onFocus={() => {
                                               this.handleTextInput()
                                           }}
                                />
                            </View>
                            {img}
                        </View> : this.state.isCheckContent == 2 ?
                            <View>
                                <View style={{marginHorizontal: 10, marginTop: 10}}>
                                    <TextInput placeholder='Đặt câu hỏi?'
                                               underlineColorAndroid="transparent"
                                               returnKeyType={"next"}
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
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                                <View style={{
                                                    marginLeft: 10,
                                                    borderRadius: 15,
                                                    flexDirection: 'row',
                                                    borderColor: '#E0E0E0',
                                                    borderWidth: 1, width: "85%",
                                                }}>
                                                    <TextInput placeholder={item.OptionContent}
                                                               style={{padding: 0, marginLeft: 10, flex: 1}}
                                                               underlineColorAndroid="transparent"
                                                               placeholderTextSize="20"
                                                               onChangeText={(text) => {
                                                                   const ArrOptions = this.state.ArrOptions.map(toa => {
                                                                       if (toa == item) {
                                                                           toa.OptionContent = text
                                                                       }
                                                                       return toa;
                                                                   })
                                                                   this.setState({ArrOptions}, () => console.log('listToa', ArrOptions))
                                                               }}
                                                    />

                                                </View>
                                                {
                                                    index === (this.state.ArrOptions.length - 1) ?
                                                        <View style={{
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            width: "15%"
                                                        }}>
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


                            </View> : this.state.isCheckContent == 3 ? <View>
                                <View>

                                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                                        <TextInput placeholder='Nhập nội dung?'
                                                   underlineColorAndroid="transparent"
                                                   onChangeText={(Status) => this.setState({Status})}
                                                   placeholderTextSize="20"
                                                   returnKeyType={"search"}
                                            // onFocus={() => {
                                            //     this.handleTextInput()
                                            // }}
                                        />
                                    </View>
                                </View>
                                {img}
                            </View> : null
                    }
                </View>


                {
                    this.state.isCheckToolBar == 1 ? <View>
                        <View style={{height: 1, backgroundColor: '#E0E0E0', marginTop: 7}}/>
                        <TouchableOpacity onPress={() => this.ThamDoYKien()}>
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
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                isCheckContent: 3,
                                isCheckToolBar: 3,

                            })
                            // Keyboard.dismiss()
                        }}>
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
                                <Text style={{marginLeft: 10, color: 'black', fontSize: 16}}>Nhắn tin tới ban quản
                                    lý</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height: 1, backgroundColor: '#E0E0E0', marginTop: 7}}/>

                    </View> : this.state.isCheckToolBar == 2 ? <View style={{
                        flexDirection: 'row',
                        marginTop: 50,
                        minHeight: 30,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                isCheckToolBar: 1,
                                isCheckContent: 1

                            })
                            Keyboard.dismiss()
                        }}>
                            <View style={{
                                marginLeft: 10,
                                // borderWidth: 1,
                                // height: 25,
                                // borderColor: "#E0E0E0",
                                // backgroundColor: '#EEEEEE',
                                alignItems: 'center',
                                // width: DEVICE_WIDTH / 2 - 20,
                                flexDirection: 'row'
                            }}>
                                <Text style={{marginLeft: 5}}>Hủy thăm dò ý kiến</Text>
                                <Icon1 name="close" size={25} color="#757575" style={{marginLeft: 5}}/>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            {/*<TouchableOpacity onPress={this.show.bind(this)}>*/}
                            {/*<Icon name="md-images" size={25} color="#900"*/}
                            {/*style={{flex: 1}}/>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity onPress={() => this.DangBaiViet()}>
                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    backgroundColor: '#B3E5FC',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: '#81D4FA',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 25,
                                    width: 65
                                }}>
                                    <Text>Đăng</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View> : this.state.isCheckToolBar == 3 ? <View>
                        <View style = {{flexDirection:'row', alignItems:'center'}}>
                            <Text style = {{marginLeft: 10}}>Loại phản ánh</Text>
                            <FlatList
                                data={this.state.ArrButton}
                                horizontal={true}
                                renderItem={({item}) => {
                                    return (
                                        <View style = {{flexDirection:'row', alignItems:'center'}}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({itemSelected: item.key}, () => {
                                                    console.log('itemselected', this.state.itemSelected)
                                                })
                                            }}>
                                            <View style = {{marginLeft: 10, borderWidth: 1, height: 18, width: 18, borderRadius:9, justifyContent: "center", alignItems:'center', borderColor: "#BDBDBD"}}>
                                                <View style = {{borderWidth: 1, borderRadius: 5, width: 10, height: 10, backgroundColor: this.state.itemSelected === item.key ? '#616161' : '#BDBDBD', borderColor:"#BDBDBD"}}>

                                                </View>
                                            </View>
                                            </TouchableOpacity>
                                           <Text style = {{marginLeft: 10}}>{item.option}</Text>
                                        </View>
                                    )
                                }}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}

                            />
                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            minHeight: 30,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isCheckToolBar: 1,
                                    isCheckContent: 1

                                })
                                Keyboard.dismiss()
                            }}>
                                <View style={{
                                    marginLeft: 10,
                                    // borderWidth: 1,
                                    // height: 25,
                                    // borderColor: "#E0E0E0",
                                    // backgroundColor: '#EEEEEE',
                                    alignItems: 'center',
                                    // width: DEVICE_WIDTH / 2 - 20,
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{marginLeft: 5}}>Hủy phản ánh sự cố</Text>
                                    <Icon1 name="close" size={25} color="#757575" style={{marginLeft: 5}}/>
                                </View>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                {/*<Icon1 name="close" size={20} color="#EEEEEE"/>*/}
                                <TouchableOpacity onPress={this.show.bind(this)}>
                                    <Icon name="md-images" size={25} color="#900"
                                          style={{flex: 1}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.PostSuCo()}>
                                    <View style={{
                                        marginLeft: 10,
                                        marginRight: 10,
                                        backgroundColor: '#B3E5FC',
                                        borderWidth: 1,
                                        borderRadius: 3,
                                        borderColor: '#81D4FA',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 25,
                                        width: 65
                                    }}>
                                        <Text>Đăng</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View> : this.state.isCheckToolBar == 4 ? <View style={{
                        flexDirection: 'row',
                        marginTop: 50,
                        minHeight: 30,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                isCheckToolBar: 1,
                                isCheckContent: 1

                            })
                            Keyboard.dismiss()
                        }}>
                            <View style={{
                                marginLeft: 10,
                                borderWidth: 1,
                                height: 25,
                                borderColor: "#E0E0E0",
                                backgroundColor: '#EEEEEE',
                                alignItems: 'center',
                                width: DEVICE_WIDTH / 2 - 20,
                                flexDirection: 'row'
                            }}>
                                <Text style={{marginLeft: 5}}>Chọn kiểu bài viết</Text>
                                {/*<Icon1 name="close" size={25} color="#757575" style = {{marginLeft: 5}}/>*/}
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={this.show.bind(this)}>
                                <Icon name="md-images" size={25} color="#900"
                                      style={{flex: 1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.DangBaiViet()}>
                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    backgroundColor: '#B3E5FC',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: '#81D4FA',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 25,
                                    width: 65
                                }}>
                                    <Text>Đăng</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View> : null
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
        callApiCreatePost: bindActionCreators(callApiCreatePost, dispatch),
        callApiPostSuCo: bindActionCreators(callApiPostSuCo, dispatch),
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

