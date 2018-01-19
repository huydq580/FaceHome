import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class DichVu extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Button onPress={() => {navigation.navigate('TinNhanBQL')}}
                                 title = 'Tin nhắn'
                                 style = {{marginRight:10}}/>
        }
    }
    render() {
        return(
            <View>
                <Text>Dịch vụ</Text>
            </View>
        );
    }
}
