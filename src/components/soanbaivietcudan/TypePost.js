import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image, StyleSheet,
} from 'react-native';
import images from "../images";
import Dimensions from 'Dimensions';
export default class TypePost extends Component {
    render () {
        return (
            <View>
                <View style={{height: 1, backgroundColor: '#E0E0E0', marginTop: 7}}/>
                <TouchableOpacity>
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

            </View>
        )
    }
}
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