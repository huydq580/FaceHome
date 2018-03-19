import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import stylesContainer from "../../components/style";
import Dimensions from 'Dimensions';

class GiaRaoVat extends Component {
    TiepTucRaoVat =()=> {
        this.props.navigation.navigate('KhuVucRaoVat')
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <View><Text>hhi</Text></View>
                <View style = {styles.TiepTucView}>
                    <Text style = {styles.TiepTucText}>TIẾP TỤC</Text>
                </View>
            </View>
        );
    }
}
export default GiaRaoVat
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