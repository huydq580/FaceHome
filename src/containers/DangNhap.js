import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    ActivityIndicator, Platform
} from 'react-native'
import CheckBox from 'react-native-check-box'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import SlideImage from "../components/SlideImage";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../Constants";
import {CallApiDangKy} from "../actions/cudan/DangKyActions";
import UserInput from "../components/dangnhap/UserInput";
import {CallApiLogin} from "../actions/actionsBQL/LoginActions";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

class DangNhap extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Đăng nhập',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            SoDienThoai: "",
            MatKhau: "",
            isCheck: false,
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
        if (this.state.isCheck == false) {
            Alert.alert(
                'Thông báo',
                "Bạn chưa đồng ý Điều khoản và dịch vụ",
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
        else {
            this.setState({isLoading: true})
            AsyncStorage.setItem('SoDienThoai', this.state.SoDienThoai)
            const {CallApiLogin} = this.props;
            CallApiLogin(this.state.SoDienThoai, this.state.MatKhau).then(dataLogin => {
                this.setState({
                    isLoading: false,
                })
                data = JSON.parse(dataLogin);
                console.log('datalogin', data)
                let userid = data.Value ? data.Value[0].UserID : null
                console.log('userid', userid)
                let dataLtProfile = (data.Value && data.Value[0].LtProfile) ? data.Value[0].LtProfile : null
                dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
                console.log("dataProfile", dataProfile)
                // console.log("dataProfile0", dataProfile[0])
                // console.log("dataProfile1", dataProfile[0].Type)
                let type = dataProfile && dataProfile[0].Type ? dataProfile[0].Type.toString() : null
                console.log('type', type)
                AsyncStorage.setItem('UserID', userid)
                AsyncStorage.setItem('Type', type)
                if (data.ErrorCode === "00") {

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
                        'Thông báo',
                        data.Message,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false}
                    )
                }
            })

        }

    }

    onClick = (data) => {
        data.checked = !data.checked;
        data.checked ? this.setState({
            isCheck: true
        }) : this.setState({
            isCheck: false
        })
    }


    render() {
        // var leftText = data.name;

        return (
            <KeyboardAwareScrollView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? "padding" : null}
                // keyboardVerticalOffset={64}
            >
                <View style={{justifyContent: "space-between", flex: 1}}>
                    <View>
                        <SlideImage
                            imageSlider={this.state.imageSlider}

                        />
                        <View style={{marginTop: 30}}>

                            <UserInput
                                keyboardType={'numeric'}
                                placeholder={'Nhập số điện thoại'}
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                style={{marginTop: 20}}
                                onChangeText={(SoDienThoai) => this.setState({SoDienThoai})}
                            />
                            <UserInput
                                secureTextEntry={this.state.showPass}
                                placeholder='Nhập mật khẩu'
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                style={{marginTop: 20}}
                                onChangeText={(MatKhau) => {
                                    this.setState({MatKhau})
                                }}
                            />
                        </View>
                        <View style={{flexDirection: 'row', marginHorizontal: 70, alignItems: 'center', marginTop: 10}}>
                            <CheckBox
                                style={{}}
                                onClick={() => this.onClick(data)}
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
                        <Text style={{fontSize: 13}}>*Số điện thoại được đùng để xác minh tài khoản qua tin nhắn
                            OTP</Text>
                        <Text style={{fontSize: 13}}>*Để được hỗ trợ vui lòng liên hệ qua fanpage</Text>
                    </View>
                    {this.state.isLoading ?
                        <View style={{
                            top: -10,
                            bottom: -10,
                            left: -10,
                            right: -10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            zIndex: 1,
                            backgroundColor: 'white'
                        }}>
                            <ActivityIndicator size="large" color="green"/>
                        </View> : null
                    }

                </View>
            </KeyboardAwareScrollView>
        )

    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        CallApiLogin: bindActionCreators(CallApiLogin, dispatch),
    }
};

DangNhap = connect(mapStateToProps, mapDispatchToProps)(DangNhap);
export default DangNhap
