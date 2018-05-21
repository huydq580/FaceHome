import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

class CuDanKhac extends  Component{
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Tài khoản của bạn',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    render (){
        return (
            <View>
                <Text>
                    cu dan khac
                </Text>
            </View>
        )
    }
}
export default CuDanKhac