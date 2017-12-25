import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native'
import ItemLeftMenu from "../../components/leftmenu/ItemLeftMenu";

export default class MenuLeft extends Component {
    render(){
        return(
            <View style = {{flex:1, flexDirection:'column'}}>
                <View style = {{flex:1}}>
                    <Text>Họ và Tên</Text>
                </View>
                <View style = {{flex:5}}>
                    <ItemLeftMenu title ="Nhà [Tên Căn Hộ]"
                                    />
                    <ItemLeftMenu title ="Nhà [Tên Căn Hộ]"
                    />
                    <ItemLeftMenu title ="Nhà [Tên Căn Hộ]"
                    />
                    <ItemLeftMenu title ="Nhà [Tên Căn Hộ]"
                    />

                </View>
            </View>
        )
    }
}