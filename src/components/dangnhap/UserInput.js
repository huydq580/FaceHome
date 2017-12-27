import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
} from 'react-native';
import images from "../images";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class UserInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
        }
    }

    render() {
        return (
            <View style = {{marginTop:20}}>
                <Icon name={this.props.nameIcon} size={20} color="#616161"
                       style={styles.inlineImg} />
                <TextInput
                    {...this.props}
                    style={styles.input}
                           placeholder={this.props.placeholder}
                           secureTextEntry={this.props.secureTextEntry}
                           autoCorrect={this.props.autoCorrect}
                           autoCapitalize={this.props.autoCapitalize}
                           returnKeyType={this.props.returnKeyType}
                           // placeholderTextColor='white'
                           underlineColorAndroid='transparent'
                           onChangeText={(text)=>{
                               this.props.onChangeText && this.props.onChangeText(text);
                           }}

                />
            </View>
        );
    }
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        // backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 120,
        height: 40,
        borderWidth: 1,
        marginHorizontal: 20,
        paddingLeft: 45,
        // borderRadius: 20,
        // marginTop: 20
        color: 'black',
    },
    inputWrapper: {
        flex: 1,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
});