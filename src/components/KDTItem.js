import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import GioiThieuKDT from "../containers/cudan/GioiThieuKDT";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class KDTItem extends Component {
    render() {
        const { item } = this.props.dataItem;
        const {navigation, fromCapMa} = this.props

        return (
            <TouchableOpacity onPress = {()=> {
                if(fromCapMa){
                    navigation.navigate('CapMaCanHo', {title: item.TenKDT});
                } else

                navigation.navigate('GioiThieuKDT', {title: item.TenKDT})
            }}>
                <View style = {{ flexDirection:'column', alignItems:'center'}}>
                    <Image style={styles.image_circle}
                           source={
                               require('../images/Commercial_buy_online_cart_sell_sale_offer.png')
                           }
                           resizeMode="cover"
                    >
                    </Image>
                    <Text>{item.TenKDT}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}
const styles = StyleSheet.create({
    image_circle: {
        width:DEVICE_WIDTH/3-10,
        height:DEVICE_WIDTH/3-10,

        marginRight: 10,
        marginBottom: 10,
    }
})