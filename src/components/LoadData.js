import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from 'react-native';

export default class LoadData extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentWillMount(){
        const {params} = this.props.navigation.state;
        setTimeout(()=> {
            if (params.data.Value[0].Type ===1){
                this.props.navigation.navigate('TabBQL')
            }
            else if(params.data.Value[0].Type ===2){
                this.props.navigation.navigate('TabCuDan')
            }
            else if (params.data.Value[0].Type ===3){
                this.props.navigation.navigate(('TabNCC'))
            }
        },1500)
    }


    render (){
        return (
            <View style={{flex: 1,justifyContent:'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

}