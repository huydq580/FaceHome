import React, {Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { RegisterBQL, URL } from "../../components/Api";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stylesContainer from "../../components/style";
import { NavigationActions } from 'react-navigation';

export default class DangKyTaiKhoanBQL extends Component {
    constructor(props){
        super(props)
        this.state = {
            SoDienThoai:'',
            MatKhau: '',
            showPass: true,
            press: false,

        }
        this.showPass = this.showPass.bind(this);
    }
    showPass() {
        this.state.press === false ? this.setState({showPass: false, press: true}) : this.setState({
            showPass: true,
            press: false
        });
    }
    RegisterBQL(params){
        // console.log('params', params.itemKDT)
        fetch(URL + RegisterBQL , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ho_ten: params.ten,
                so_dien_thoai: this.state.SoDienThoai,
                mat_khau:this.state.MatKhau,
                kdt_id: params.itemKDT.KDTID,
                ngay_sinh: "2017-12-20T10:35:34.5030898+07:00",
                gioi_tinh: params.GioiTinh,
                chuc_vu: params.ChucVu,
                hot_line: params.hotline,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                data = JSON.parse(dataRes);
                console.log('dataLogin', data)
                if(data.IsError === false && data.ErrorCode === "00"){
                    Alert.alert(
                        'Alert Title',
                        'Đăng kí thành công',
                        [
                            {text: 'Ok', onPress: () => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({
                                            routeName: 'DangNhap',
                                        }),
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction)
                            }},
                        ],
                        { cancelable: false }
                    )
                    // this.props.navigation.navigate('SanhChinh')
                }
                else {
                    Alert.alert(
                        'Error',
                        data.Message,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},

                        ],
                        { cancelable: false }
                    )
                }


            }).catch((erro)=> {
                this.setState({
                    Loading: false,
                    Error: true
                })
        })
    }
    render(){
        // if(this.state.Loading){
        //     return(
        //         <View style={{flex: 1,justifyContent:'center', alignItems: 'center'}}>
        //             <ActivityIndicator size="large"/>
        //         </View>
        //     )
        // }
        // else if(this.state.Error){
        //     return(
        //         <View>
        //             <Text>Dang ki that bai</Text>
        //         </View>
        //     )
        // }
        // else return(<View></View>)
        const { params } = this.props.navigation.state;
        return(
            <KeyboardAwareScrollView
                style={stylesContainer.container}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số điện thoại'
                               underlineColorAndroid="transparent"
                               keyboardType={'numeric'}
                                onChangeText = {(SoDienThoai)=>this.setState({SoDienThoai})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu'
                               secureTextEntry={this.state.showPass}
                               underlineColorAndroid="transparent"
                                onChangeText = {(MatKhau)=>this.setState({MatKhau})}/>
                </View>
                <View style = {{alignItems:'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.showPass}
                                      style = {{marginTop:10}}>
                        <Text>Hiển thị mật khẩu</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress = {() => this.RegisterBQL(params)}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
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