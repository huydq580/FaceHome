import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import stylesContainer from "../../../components/style";
export default class ChiTietThanhVienBQL extends Component{
    render (){
        return (
            <View style = {stylesContainer.container}>
                <Text>Chi tiết thành viên BQL</Text>

            </View>
        );
    }
}