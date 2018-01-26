import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class Notification extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Button onPress={() => {navigation.navigate('TinNhanBQL')}}
                                 title = 'Tin nhắn'
                                 style = {{marginRight:10}}/>
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            status : 2
        }
    }
    render (){
        return (
           <View>
               <Text>hihi</Text>
               {

               }
           </View>
        );
    }
}
