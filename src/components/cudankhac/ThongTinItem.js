import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
class ThongTinItem extends Component {
    render (){
        return (
            <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 10}}>
                <Text style = {{flex:1, color: 'black'}}>{this.props.title}</Text>
                <View style = {{flex:3,}}>

                    <Text style = {{marginLeft: 5}}>{this.props.value}</Text>

                </View>

            </View>
        )
    }
}
export default ThongTinItem
const styles = StyleSheet.create({
    circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 50,
        height: 50,
        borderRadius: 50/2,
        alignItems: 'center',
        justifyContent:'center'
    },
    info: {
        marginTop: 10,
        marginLeft: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent:'center'
    },

    viewItem: {
        borderWidth: 1,
        padding: 3, justifyContent:'center',
        height: 28, width: 170
    },
    image_circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        alignItems: 'center',
        justifyContent:'center'
    }


})