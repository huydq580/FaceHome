import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/FontAwesome';


export default class ItemLeftMenu extends Component {
    render(){
        return(
            <View style={{maxHeight: 50}}>
                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name={this.props.nameIcon} size={30} color="green"
                             style={{marginLeft: 10, marginRight: 10}}/>
                    <Text style={{fontSize:20}}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>

        );
    }
}
