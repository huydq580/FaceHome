import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator,
    AsyncStorage, StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import stylesContainer from "../../components/style";
import {callApiNhaCuDan} from "../../actions/actionsCuDan/NhaCuDanActions";
import {callApiSearchPost} from "../../actions/SearchPostActions";
import {default as FCM, FCMEvent} from "react-native-fcm";
import {SOCKET, UpdateProfile, URL} from "../../components/Api";
import SocketIOClient from "socket.io-client";
import StatusItemCuDan from "../../components/status/StatusItemCuDan";
import {callApiSubcribe} from "../../actions/SubcribeActions";
import ChuaDangNhap from "../ChuaDangNhap";
import ChuaCoCanHo from "./ChuaCoCanHo";

class SanhChinh extends Component {
    constructor (props){
        super(props)
        this.state = {
            value: ''
        }

    }
    componentDidMount () {
        AsyncStorage.getItem('UserID').then((value)=> {
            this.setState({
                value: value
            })
        })
    }
    renderGiaoDien = () => {
        const { navigation } = this.props;
        if (this.state.value) {
            return (
                <ChuaCoCanHo
                    navigation={navigation}/>
            )
        }
        else {
            return (
                <ChuaDangNhap
                    navigation={navigation}/>
            )
        }

    }
    render () {
        const { navigation } = this.props;
        return (
            <View style = {{flex:1}}>
                {this.renderGiaoDien()}
            </View>

        )
    }
}

export default SanhChinh;
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