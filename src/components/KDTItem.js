import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class KDTItem extends Component {
    render() {
        const { item } = this.props.dataItem;
        return (
            <TouchableOpacity>
                <View style={{ flexDirection: 'column', marginTop: 15, justifyContent:'center', alignItems:'center' }}>
                    <Image style={styles.image_circle}
                           source={
                               require('../images/Commercial_buy_online_cart_sell_sale_offer.png')
                           }
                           resizeMode="cover"
                    >
                    </Image>
                    <Text>{item.TenKDT.slice(0,12)}</Text>
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