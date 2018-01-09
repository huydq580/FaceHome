import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import stylesContainer from "../../../components/style";

export default class TaoThanhVienBQL extends Component{
    constructor(props){
        super(props)
        this.state = {
            SoDienThoai: '',
            Pass: '',
            PassAgain: ''
        }

    }
    render (){
        return (
            <View style = {stylesContainer.container}>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số điện thoại thành viên'
                               underlineColorAndroid="transparent"
                               keyboardType={'numeric'}
                               onChangeText = {(SoDienThoai)=>this.setState({SoDienThoai})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu'
                               underlineColorAndroid="transparent"
                               onChangeText ={(Pass)=> this.setState({Pass})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập lại mật khẩu'
                               underlineColorAndroid="transparent"
                               onChangeText ={(PassAgain)=> this.setState({PassAgain})}/>
                </View>
                <TouchableOpacity>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tạo</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemBoder : {
        borderWidth: 1,
        marginHorizontal: 30,
        marginTop:20,

    }
})