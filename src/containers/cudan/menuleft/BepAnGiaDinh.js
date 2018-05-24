import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

class BepAnGiaDinh extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: "Bếp ăn gia đình",
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    render (){
        return (
            <View>
                <Text>
                    Bếp ăn gia đình
                </Text>
            </View>
        )
    }
}
export default BepAnGiaDinh