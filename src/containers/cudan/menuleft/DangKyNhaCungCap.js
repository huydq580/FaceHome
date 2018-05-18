import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

class DangKyNhaCungCap extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Đăng kí tài khoản',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    render () {
        return(
            <View>
                <Text>
                    Đăng ký nhà cung cấp
                </Text>
            </View>
        )
    }
}
export default DangKyNhaCungCap