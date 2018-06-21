import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native'
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

export default class GioiThieuCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Giới thiệu',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    render(){
        return(
            <View>
                <Text>Gioi Thieu</Text>
            </View>
        )
    }
}