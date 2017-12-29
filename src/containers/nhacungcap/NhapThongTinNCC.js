import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stylesContainer from "../../components/style";
import {CreateProfileNCC, URL} from "../../components/Api";

export default class NhapThongTinNCC extends Component {
    constructor(props){
        super(props)
        this.state = {
            TenCuaHang: '',
            DiaChiCuaHang: '',
            GioiThieu:'',
            TenNguoiBan: '',
            HotLine:'',

        }
    }
    //call api cập nhập thông tin nhà cung cấp
    CapNhapThongTinNCC() {
        const { params } = this.props.navigation.state;
        // console.log('value', params.Value);
        // console.log('SoDienThoai',params.SDT)
        fetch(URL + CreateProfileNCC, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                user_id: params.Value.Value,
                ten_dang_nhap: params.SDT,
                ten_cua_hang: this.state.TenCuaHang,
                dia_chi: this.state.DiaChiCuaHang,
                toa_do_gps: "sample string 5",
                gioi_thieu: this.state.GioiThieu,
                ten_nguoi_ban_hang: this.state.TenNguoiBan,
                hotline: this.state.HotLine,
                hinh_anh: "sample string 9",
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataProfile)=> {
                dataProfile = JSON.parse(dataProfile);
                console.log('dataLogin', dataProfile)
                if(dataProfile.IsError === false && dataProfile.ErrorCode === "00"){
                    Alert.alert(
                        'Alert Title',
                        'Cập nhập thông tin thành công',
                        [
                            {text: 'Ok', onPress: () => {this.props.navigation.navigate('TabNCC')}},
                        ],
                        { cancelable: false }
                    )
                }
                else {
                    Alert.alert(
                        'Error',
                        dataProfile.Message,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},

                        ],
                        { cancelable: false }
                    )
                }


            }).catch((erro)=> {
            console.log('erro',erro);
        })
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
                               underlineColorAndroid="transparent"
                               onChangeText = {(TenCuaHang)=>this.setState({TenCuaHang})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập địa chỉ cửa hàng'
                               underlineColorAndroid="transparent"
                               onChangeText = {(DiaChiCuaHang)=>this.setState({DiaChiCuaHang})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Chọn vị trí cửa hàng theo map'
                               underlineColorAndroid="transparent"
                               onChangeText = {(SoDienThoai)=>this.setState({SoDienThoai})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Giới thiệu chung cửa hàng'
                               underlineColorAndroid="transparent"
                               onChangeText = {(GioiThieu)=>this.setState({GioiThieu})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Tên người bán'
                               underlineColorAndroid="transparent"
                               onChangeText = {(TenNguoiBan)=>this.setState({TenNguoiBan})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số điện thoại'
                               underlineColorAndroid="transparent"
                               keyboardType={'numeric'}
                               onChangeText = {(HotLine)=>this.setState({HotLine})}/>
                </View>
                <TouchableOpacity onPress = {() => this.CapNhapThongTinNCC()}>
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