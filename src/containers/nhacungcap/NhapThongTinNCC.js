import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class NhapThongTinNCC extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Tên cửa hàng cửa bạn?'
                               underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập địa chỉ cửa hàng'
                               underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Chọn vị trí cửa hàng theo map'
                               underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Giới thiệu chung cửa hàng'
                               underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Tên người bán'
                               underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Số điện thoại liên hệ'
                               underlineColorAndroid="transparent"/>
                </View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('KDTGanBan')}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Hoàn tất</Text>
                    </View>
                </TouchableOpacity>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },


})