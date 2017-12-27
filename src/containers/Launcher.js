import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class Launcher extends Component {

    render (){
        return(
            <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style = {{fontSize: 30}}>LOGO</Text>
            </View>
        );
    }
}