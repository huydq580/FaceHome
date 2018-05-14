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
export default class ThanhVienItem extends Component {
    render() {
        const { item } = this.props.dataItem;
        return (
            <TouchableOpacity>
                <View style={{ flexDirection: 'column', marginTop: 15, justifyContent:'center', alignItems:'center' }}>
                    <Image style={styles.image_circle}
                           source={{
                              uri: item.avt
                           }}
                           resizeMode="stretch"
                    >
                    </Image>
                    <Text>{item.username}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}
const styles = StyleSheet.create({
    image_circle: {
        width:DEVICE_WIDTH/3-30,
        height:DEVICE_WIDTH/3-30,

        marginRight: 10,
        marginBottom: 10,

    },
    view_infovideo: {
        height: DEVICE_HEIGHT / 8,
        width: DEVICE_HEIGHT / 3.5,
    },
    duration: {
        position: "absolute",
        bottom: 15,
        right: DEVICE_WIDTH-DEVICE_HEIGHT/4,
        backgroundColor: 'black',
        borderRadius: 3,
        justifyContent:'flex-end'
    }
})