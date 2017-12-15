import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native'

export default class SanhChinh extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataBanTin: [''],
            dataBaiDang: [''],
        }
    }
    render(){
        return(
            <View>
                <Text>Thông Tin Từ Ban Quản Lý</Text>
                
                
            </View>
        )
    }
}