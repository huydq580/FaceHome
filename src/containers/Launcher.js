import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';

export default class Launcher extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isTime: false
        }
    }
    componentWillMount(){
        setTimeout(()=> {
            this.setState({
                isTime: true
            })
            this.pushScreen();
        },2000)

    }
    pushScreen(){
        AsyncStorage.getItem('token').then((value)=>{
            if(value){
                this.props.navigation.navigate('Tab')
            }
            else {
                this.props.navigation.navigate(('Login'))
            }
        })
    }
    render (){
        return (
            <View style = {{ flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Text>Logo</Text>
            </View>
        )

    }
}