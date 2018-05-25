import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Button, StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import stylesContainer from "../../components/style";
import PickerImage from "../../components/PickerImage"
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SocketIOClient from "socket.io-client";
import {LINKIMG, SOCKET} from "../../components/Api";
import {callApiCreatePost, callApiUploadImage} from "../../actions/SoanTinActions";


class SoanTinCuDan extends Component {
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

    render() {
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <View>
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
                        <TextInput placeholder='Soạn tin mới'
                                   underlineColorAndroid="transparent"
                                   onChangeText={(Status) => this.setState({Status})}
                                   placeholderTextSize="20"/>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 50,
                    minHeight: 30,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>Thêm vào bài viết của bạn</Text>
                    <TouchableOpacity>
                        <Icon name="md-images" size={30} color="#900"
                              style={{flex: 1}}/>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

}

export default SoanTinCuDan;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },

})

