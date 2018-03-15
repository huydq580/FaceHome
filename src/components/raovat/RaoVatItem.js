import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity, StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';

class RaoVatItem extends Component {
    render (){
        const {item} = this.props.dataItem;
        return (
            <TouchableOpacity>
                <ImageBackground style={styles.image_item}
                                 source={{
                                     uri: item.Icon
                                 }}
                                 resizeMode="cover"
                >
                    <View style = {{backgroundColor: 'rgba(0, 0, 0, .5)', flex:1, alignItems:'center'}}>
                        <Text style = {{marginTop: 10, color:'white',fontWeight:'bold'}}>{item.Name}</Text>
                    </View>
                </ImageBackground>

            </TouchableOpacity>
        )
    }
}
export default RaoVatItem
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_item: {
        height: DEVICE_WIDTH/3,
        width: DEVICE_WIDTH/3,


        marginTop: 1,
        marginLeft: 1,
        marginRight: 1,
        justifyContent: 'center'

    }
})