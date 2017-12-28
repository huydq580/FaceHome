import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import stylesContainer from "../../components/style";

export default class QuanLyCuDan extends Component {
    render() {
        return (
            <View style = {stylesContainer.container}>
                <TextInput placeholder = 'Tìm kiếm nhanh tên cư dân '
                           underlineColorAndroid="transparent"
                />
            </View>
        );
    }
}
