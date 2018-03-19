import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';

class TiepTucRaoVat extends Component {
    render (){
        return (
                <View style = {styles.TiepTucView}>
                    <Text style = {styles.TiepTucText}>TIẾP TỤC</Text>
                </View>
        );
    }
}
export default TiepTucRaoVat
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    TiepTucView: {
        height: DEVICE_HEIGHT/11,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF9800'

    },
    TiepTucText: {
        fontWeight:'bold',
        color: 'white'
    }
})