import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import stylesContainer from "../../../components/style";

export default class QuanLyTaiKhoan extends Component {
    Logout() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'DangNhap',
                }),
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }
    render (){
        return (
            <View style = {[stylesContainer.container,{justifyContent:'center'}]}>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('ThayDoiMatKhau')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Thay đổi mật khẩu
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Thay đổi mật khẩu đăng nhập
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.Logout.bind(this)}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10, }}>
                            Đăng xuất
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10,textDecorationColor:'#BDBDBD', marginBottom:10, marginLeft:10}}>
                            Thoát và đăng nhập với tài khoản khác
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewitem : {
        borderWidth: 1,
        marginHorizontal:20,
        borderColor:'#BDBDBD'

    }
})