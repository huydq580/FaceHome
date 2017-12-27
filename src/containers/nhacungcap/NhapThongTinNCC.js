import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stylesContainer from "../../components/style";

export default class NhapThongTinNCC extends Component {
    constructor(props){
        super(props)
        this.state = {
            TenCuaHang: '',

        }
    }
    render(){
        return(
            <KeyboardAwareScrollView
                style={stylesContainer.container}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
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
                    <TextInput placeholder = 'Nhập số điện thoại'
                               underlineColorAndroid="transparent"
                               keyboardType={'numeric'}
                               onChangeText = {(SoDienThoai)=>this.setState({SoDienThoai})}/>
                </View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('TabNCC')}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Hoàn tất</Text>
                    </View>
                </TouchableOpacity>


            </KeyboardAwareScrollView>
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