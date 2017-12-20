import React, {Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {URL, URL_REGISTER_BQL} from "../../components/Api";

export default class DangKyTaiKhoanBQL extends Component {
    constructor(props){
        super(props)
        this.state = {
            SoDienThoai:'',
            MatKhau: ''
        }
    }
    Register(){
        fetch(URL + URL_REGISTER_BQL , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ho_ten: "Nguyen Van A",
                so_dien_thoai: "0963145312",
                mat_khau:"123456",
                kdt_id: 53 ,
                ngay_sinh: "2017-12-20T10:35:34.5030898+07:00",
                gioi_tinh: 1,
                chuc_vu: 1,
                hot_line: "0123456",
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataSearch)=> {
                data2 = JSON.parse(dataSearch);
                this.setState({
                    dataKDT : data2.Value
                })
                // console.log('data3', this.state.dataKDT)


            }).catch((erro)=> {
            console.log('erro',erro);
        })
    }
    render(){
        const { params } = this.props.navigation.state;
        console.log('ngaysinh', params.NgaySinh)
        console.log('ten', params.ten)
        console.log('itemKDT', params.itemKDT)
        return(
            <View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số điện thoại'
                               underlineColorAndroid="transparent"
                                onChangeText = {(SoDienThoai)=>this.setState({SoDienThoai})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu'
                               underlineColorAndroid="transparent"
                                onChangeText = {(MatKhau)=>this.setState({MatKhau})}/>
                </View>
                <View style = {{alignItems:'center', justifyContent: 'center'}}>
                    <Text>Hiển thị mật khẩu</Text>
                </View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('SanhChinh')}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
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