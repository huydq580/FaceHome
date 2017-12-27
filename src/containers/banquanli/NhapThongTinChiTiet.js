import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stylesContainer from "../../components/style";


export default class NhapThongTinChiTiet extends Component {
    constructor(props){
        super(props)
        this.state = {
            NgaySinh: '',
            GioiTinh: '',
            ChucVu: '',
            ten: '',
            hotline: '',
        }
    }
    TiepTuc(){

    }
    render(){
        const { params } = this.props.navigation.state;
        return(
            <KeyboardAwareScrollView
                style={stylesContainer.container}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Họ tên'
                               underlineColorAndroid="transparent"
                               onChangeText ={(ten)=> this.setState({ten})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Ngày Sinh MM/DD/YYYY'
                               underlineColorAndroid="transparent"
                               onChangeText ={(NgaySinh)=> this.setState({NgaySinh})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.GioiTinh}
                        onValueChange={(value) => this.setState({GioiTinh: value})}>
                        <Picker.Item label = {'Giới Tính'} value = ''/>
                        <Picker.Item label = {'Nam'} value ={'0'}/>
                        <Picker.Item label = {'Nữ'} value ={'1'}/>
                        <Picker.Item label = {'Khác'} value ={'2'}/>
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.ChucVu}
                        onValueChange={(value) => this.setState({ChucVu: value})}>
                        <Picker.Item label = {'Chức Vụ'} value = ''/>
                        <Picker.Item label = {'Trưởng BQL'} value ={'1'}/>
                        <Picker.Item label = {'Thành viên BQL'} value ={'2'}/>
                        <Picker.Item label = {'Chủ căn hộ'} value ={'3'}/>
                        <Picker.Item label = {'Thành viên căn hộ'} value ={'4'}/>
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Số hotline BQL'
                               underlineColorAndroid="transparent"
                               keyboardType={'numeric'}
                               onChangeText = {(hotline)=>this.setState({hotline})}/>
                </View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('DangKyTaiKhoanBQL', {itemKDT: params.itemKDT, NgaySinh:this.state.NgaySinh, GioiTinh: this.state.GioiTinh, ChucVu: this.state.ChucVu, ten: this.state.ten, hotline:this.state.hotline })}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>


            </KeyboardAwareScrollView>
        )
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },


})