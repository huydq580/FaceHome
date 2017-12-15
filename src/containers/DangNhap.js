import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet

} from 'react-native';
import Dimensions from 'Dimensions';
import UserInput from '../components/dangnhap/UserInput';
import images from '../components/images'
 

export default class DangNhap extends Component {
    constructor(props){
        super(props)
        this.state = {
            lang_name: 'vi_VN',
            arrName: [''],
        }
    }
    
    render(){
        return (
            <View style = {{flex:1, backgroundColor:'white'}}>
                <View style = {{flex:2, alignItems:'center',justifyContent: 'center', borderWidth:1}}>
                    <Text>Banner ảnh</Text>
                </View>
                <View style = {{flex:5, alignItems: 'center'}}>
                    <Text>Tiếng việt - English</Text>
                    <UserInput source = {images.username}
                           placeholder='Username'
                           autoCapitalize={'none'}
                           returnKeyType={'done'}
                           autoCorrect={false}
                           style = {{marginTop: 20}}
                        //    getData = {getEmail}
                           />
                    <UserInput source={images.password}
                        //    secureTextEntry={this.state.showPass}
                           placeholder='Password'
                           returnKeyType={'done'}
                           autoCapitalize={'none'}
                           autoCorrect={false}
                           style = {{marginTop : 20}}
                        //    getData = {getPass}
                    />
                    <TouchableOpacity>
                        <Text>Hiển thị mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
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