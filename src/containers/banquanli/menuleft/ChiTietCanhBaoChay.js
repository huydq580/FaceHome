import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import stylesContainer from "../../../components/style";

class ChiTietCanhBaoChay extends Component {
    render (){
        return(
            <View style = {stylesContainer.container}>
                <Text> Chi Tiet Canh Bao Chay </Text>
            </View>
        )
    }
}
export default ChiTietCanhBaoChay
