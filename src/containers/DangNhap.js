import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    AsyncStorage
} from 'react-native';
import Dimensions from 'Dimensions';
import UserInput from '../components/dangnhap/UserInput';
import images from '../components/images'
import {Login, URL} from "../components/Api";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {callApiLogin} from "../actions/actionsBQL/LoginActions";

class DangNhap extends Component {
    constructor(props){
        super(props)
        this.state = {
            SoDienThoai: '',
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
   componentDidMount(){



   }
    Login() {
        AsyncStorage.setItem('SoDienThoai', this.state.SoDienThoai)
        const { callApiLogin } = this.props;
        callApiLogin(this.state.SoDienThoai, this.state.MatKhau).then(dataLogin => {
            data = JSON.parse(dataLogin);
            // console.log('Log2', this.props.USER[0].dataLogin)
            // console.log('data', data.Value[0].UserID)
            if(data.IsError === false && data.ErrorCode === "00"){
                AsyncStorage.setItem('UserID', data.Value[0].UserID)
                this.props.navigation.navigate('LoadData')

            }
            else {
                this.setState({
                    loading: false,
                    error: true
                })
                Alert.alert(
                    'Error',
                    'Đăng nhập thất bại',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }
        })

    }
    render(){
        return (
            <View style = {{flex:1, backgroundColor:'white'}}>
                <View style = {{flex:2, alignItems:'center',justifyContent: 'center', borderWidth:1}}>
                    <Text>Banner ảnh</Text>
                </View>
                <View style = {{flex:5, alignItems: 'center'}}>
                    <Text>Tiếng việt - English</Text>
                    <UserInput nameIcon = "user-circle"
                               keyboardType={'numeric'}
                               placeholder={'Nhập số điện thoại'}
                               autoCapitalize={'none'}
                               returnKeyType={'done'}
                               autoCorrect={false}
                               style = {{marginTop: 20}}
                               onChangeText ={(SoDienThoai) => this.setState({SoDienThoai})}
                    />
                    <UserInput nameIcon = "lock"
                               secureTextEntry={this.state.showPass}
                               placeholder='Nhập mật khẩu'
                               returnKeyType={'done'}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               style = {{marginTop : 20}}
                               onChangeText ={(MatKhau) => {
                                   this.setState({MatKhau})
                               }}
                    />
                    <TouchableOpacity onPress={this.showPass}
                                        style = {{marginTop:10}}>
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
const mapStateToProps = (state) => {
    return {
        User: state.LoginReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiLogin: bindActionCreators(callApiLogin, dispatch)
    }
};

DangNhap = connect(mapStateToProps, mapDispatchToProps)(DangNhap);

export default DangNhap
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    textinput : {
        borderWidth: 1,

    }
})