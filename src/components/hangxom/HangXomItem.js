import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import Dimensions from 'Dimensions';
export default class HangXomItem extends Component {
    render (){
        const {item} = this.props.dataItem;
        return (
            <TouchableOpacity
            >
                <ImageBackground style={styles.image_item}
                       source={{
                           uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                       }}
                       resizeMode="cover"
                >
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_item: {
        height: DEVICE_WIDTH / 3-30,
        width: DEVICE_WIDTH / 3-30,
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 20,
        justifyContent: 'center'

    }
})