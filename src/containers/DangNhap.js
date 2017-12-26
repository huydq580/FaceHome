import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator

} from 'react-native';
import Dimensions from 'Dimensions';
import UserInput from '../components/dangnhap/UserInput';
import images from '../components/images'
import {URL, URL_LOGIN} from "../components/Api";


export default class DangNhap extends Component {
    constructor(props){
        super(props)
        this.state = {
            SoDienThoai: '',
            MatKhau: '',
            loading: true,
            error: false
        }
        console.log('loading1', this.state.loading)
    }

    Login(){
        // const {} = this.props
        // fetch(URL + URL_LOGIN , {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         so_dien_thoai: this.state.SoDienThoai,
        //         mat_khau:this.state.MatKhau,
        //     })
        // })
        //     .then((response) => response.json())
        //     .then((dataRes)=> {
        //         data = JSON.parse(dataRes);
        //         // console.log('data', data)
        //         // console.log('dataLogin', data.Value)
        //         // console.log('datavalue', data.Value[0].Type)
        //         if(data.IsError === false && data.ErrorCode === "00"){
        //             this.setState({
        //                 loading: false,
        //                 error: false,
        //             })
        //            console.log('loading2', this.state.loading)
        //             this.props.navigation.navigate('SanhChinh')
        //             // Alert.alert(
        //             //     'Alert Title',
        //             //     'Đăng kí thành công',
        //             //     [
        //             //         {text: 'Ok', onPress: () => {
        //             //             if (data.Value[0].Type ===1){
        //             //                 this.props.navigation.navigate('TabBQL')
        //             //             }
        //             //             else if(data.Value[0].Type ===2){
        //             //                 this.props.navigation.navigate('TabCuDan')
        //             //             }
        //             //             else if (data.Value[0].Type ===3){
        //             //                 this.props.navigation.navigate(('TabNCC'))
        //             //             }
        //             //
        //             //         }},
        //             //     ],
        //             //     { cancelable: false }
        //             // )
        //             // this.props.navigation.navigate('SanhChinh')
        //         }
        //         else {
        //             this.setState({
        //                 loading: false,
        //                 error: true
        //             })
        //             Alert.alert(
        //                 'Error',
        //                 'Đăng nhập thất bại',
        //                 [
        //                     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //
        //                 ],
        //                 { cancelable: false }
        //             )
        //         }
        //
        //
        //     }).catch((erro)=> {
        //     this.setState({
        //         loading: false,
        //         error: true
        //     })
        // })
        this.props.navigation.navigate('TabCuDan')
    }
    render(){
        console.log('loading3', this.state.loading)
        // if(this.state.loading){
        //     return (
        //         <View style={{flex: 1,justifyContent:'center', alignItems: 'center'}}>
        //             <ActivityIndicator size="large"/>
        //         </View>
        //     )
        // }
        // else if(this.state.error){
        //     return(Alert.alert('Đăng nhập thất bại'))
        // }
        return (
            <View style = {{flex:1, backgroundColor:'white'}}>
                <View style = {{flex:2, alignItems:'center',justifyContent: 'center', borderWidth:1}}>
                    <Text>Banner ảnh</Text>
                </View>
                <View style = {{flex:5, alignItems: 'center'}}>
                    <Text>Tiếng việt - English</Text>
                    <UserInput source = {images.username}
                               placeholder={'Username'}
                               autoCapitalize={'none'}
                               returnKeyType={'done'}
                               autoCorrect={false}
                               style = {{marginTop: 20}}
                               onChangeText ={(SoDienThoai) => this.setState({SoDienThoai})}
                    />
                    <UserInput source={images.password}
                        //    secureTextEntry={this.state.showPass}
                               placeholder={'Password'}
                               returnKeyType={'done'}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               style = {{marginTop : 20}}
                               onChangeText ={(MatKhau) => {
                                   this.setState({MatKhau})
                               }}
                    />
                    <TouchableOpacity>
                        <Text>Hiển thị mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.Login()}>
                        <View style = {{backgroundColor:'#2196F3',borderWidth:1,width: DEVICE_WIDTH - 120,  marginHorizontal: 20, marginTop:30, minHeight:40,alignItems:'center', justifyContent: 'center'}}>
                            <Text>Đăng nhập</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style = {{marginTop:10}}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('DangKi')}>
                        <View style = {{backgroundColor:'#FFA726',borderWidth:1,width: DEVICE_WIDTH - 120,  marginHorizontal: 20, marginTop:30, minHeight:40,alignItems:'center', justifyContent: 'center'}}>
                            <Text>Tạo tài khoản mới</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style = {{marginTop:10}}>Giới thiệu</Text>
                    </TouchableOpacity>



                </View>
            </View>
        );
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    textinput : {
        borderWidth: 1,

    }
})