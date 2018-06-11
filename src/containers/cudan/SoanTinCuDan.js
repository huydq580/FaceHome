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
    Keyboard
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
import images from "../../components/images";
import TypePost from "../../components/soanbaivietcudan/TypePost";
import Toolbar from "../../components/soanbaivietcudan/Toolbar";


class SoanTinCuDan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkImg: 'http://192.168.1.254:9051',
            Status: '',
            avatarSource: null,
            dataImage: null,
            resizedImageUri: '',
            isCheck: true,
        }
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
    }

    handleTextInput = () => {
        this.setState({
            isCheck: false
        })

    }

    render() {
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>

                {
                    this.state.isCheck ? <TypePost/> : <Toolbar/>
                }


            </View>
        );
    }

}

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

