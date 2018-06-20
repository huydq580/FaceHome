import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import images from "./images";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class ThanhVienItem extends Component {
    render() {
        const { item } = this.props.dataItem;
        return (
            <TouchableOpacity onPress = {()=> this.props.navigation.navigate('CuDanKhac', { Info: item})}>
                <View style={{flexDirection: 'column', marginTop: 15, justifyContent:'center', alignItems:'center' ,  width:DEVICE_WIDTH/3}}>
                    <Image style={styles.image_circle}
                           source={
                               !item.Avatar ? images.noavatar : {uri: item.Avatar}
                           }
                           resizeMode="cover"
                    >
                    </Image>
                    <Text style = {{marginTop: 5}}>{item.FullName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}
const styles = StyleSheet.create({
    image_circle: {
        width:40,
        height:40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,


    },
})