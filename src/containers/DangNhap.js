import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import CheckBox from 'react-native-check-box'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import SlideImage from "../components/SlideImage";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../Constants";
import {CallApiDangKy} from "../actions/cudan/DangKyActions";
import UserInput from "../components/dangnhap/UserInput";
import {CallApiLogin} from "../actions/actionsBQL/LoginActions";

class DangNhap extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Đăng nhập',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props) {
        super(props)
        this.state = {
            SoDienThoai: "",
            MatKhau: "",
            imageSlider: [
                {
                    thumbnail: 'http://file4.batdongsan.com.vn/2015/12/03/hmcVYWuR/20151203133249-f154.jpg'
                },
                {
                    thumbnail: 'http://file4.batdongsan.com.vn/2015/12/03/hmcVYWuR/20151203133249-f154.jpg'
                },
                {
                    thumbnail: 'http://file4.batdongsan.com.vn/2015/12/03/hmcVYWuR/20151203133249-f154.jpg'
                }
            ],
        }
    }
    Login() {
        this.setState({isLoading: true})
        AsyncStorage.setItem('SoDienThoai', this.state.SoDienThoai)
        const { CallApiLogin } = this.props;
        CallApiLogin(this.state.SoDienThoai, this.state.MatKhau).then(dataLogin => {
            this.setState({
                isLoading: false,
            })
            data = JSON.parse(dataLogin);
            let dataLtProfile = data.Value[0].LtProfile ? data.Value[0].LtProfile : null
            dataProfile = dataLtProfile ? JSON.parse(dataLtProfile): null;
            console.log("dataProfile", dataProfile)

            console.log('data', data)
            if(data.IsError === false && data.ErrorCode === "00"){
                AsyncStorage.setItem('UserID', data.Value[0].UserID)
                AsyncStorage.setItem('Type', dataProfile[0].Type.toString())
                this.props.navigation.navigate('LoadData')

            }
            else if (data.ErrorCode === "02") {
                this.props.navigation.navigate('DuyetTaiKhoan')
            }

            else {
                this.setState({
                    loading: false,
                    error: true
                })
                Alert.alert(
                    'Error',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }
        })

    }

    onClick = () => {
        console.log('hihi')
    }


    render() {
        // var leftText = data.name;

        return (
            <View style={{justifyContent: "space-between", flex: 1}}>
                <View>
                    <SlideImage
                        imageSlider={this.state.imageSlider}

                    />
                    <View style = {{marginTop: 30}}>

                    <UserInput
                               keyboardType={'numeric'}
                               placeholder={'Nhập số điện thoại'}
                               autoCapitalize={'none'}
                               returnKeyType={'done'}
                               autoCorrect={false}
                               style = {{marginTop: 20}}
                               onChangeText ={(SoDienThoai) => this.setState({SoDienThoai})}
                    />
                    <UserInput
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
                    </View>
                    <View style={{flexDirection: 'row', marginHorizontal: 70, alignItems: 'center', marginTop: 10}}>
                        <CheckBox
                        style={{}}
                        onClick={() => this.onClick()}
                        isChecked={data.checked}
                        // leftText={leftText}
                        />
                        <Text style={{marginLeft: 10, textDecorationLine: 'underline'}}>Điều khoản và dịch vụ</Text>
                    </View>

                        <TouchableOpacity onPress={() => this.Login()}>
                            <View style={{
                                marginTop: 20,
                                borderWidth: 1,
                                borderRadius: 5,
                                marginHorizontal: 70,
                                backgroundColor: '#90CAF9',
                                borderColor: '#64B5F6',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                            }}>
                                <Text style={{color: "black"}}>Đăng Nhập</Text>
                            </View>
                        </TouchableOpacity>

                </View>
                <View style={{marginBottom: 10, marginHorizontal: 20}}>
                    <Text style={{fontSize: 13}}>*Số điện thoại được đùng để xác minh tài khoản qua tin nhắn OTP</Text>
                    <Text style={{fontSize: 13}}>*Để được hỗ trợ vui lòng liên hệ qua fanpage</Text>
                </View>

            </View>
        )

    }
}


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        CallApiLogin: bindActionCreators(CallApiLogin, dispatch),
    }
};

DangNhap = connect(mapStateToProps, mapDispatchToProps)(DangNhap);
export default DangNhap