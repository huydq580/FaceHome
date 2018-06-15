import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import SlideImage from "../../components/SlideImage";
import CheckBox from 'react-native-check-box'
import {BACKGROUND_HEADER, TITLE_HEADER} from '../../Constants'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiPostCmt} from "../../actions/cudan/PostCmtActions";
import {CallApiDangKy} from "../../actions/cudan/DangKyActions";
import UserInput from "../../components/dangnhap/UserInput";

class DangKyCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Đăng kí tài khoản',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props) {
        super(props)
        this.state = {
            SoDienThoai: "",
            FullName: "",
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
    DangKy = () => {
        const { CallApiDangKy } = this.props
        CallApiDangKy("09632501950", "Đặng Minh Bảo", "123456").then(data => {
            console.log('data', data)
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
                    <View style = {{marginTop: 20}}>
                    <UserInput
                        keyboardType={'numeric'}
                        placeholder={'Nhập họ tên'}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        style = {{marginTop: 20}}
                        onChangeText ={(FullName) => this.setState({FullName})}
                    />
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
                        keyboardType={'numeric'}
                        placeholder={'Nhập mật khẩu'}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        style = {{marginTop: 20}}
                        onChangeText ={(MatKhau) => this.setState({MatKhau})}
                    />
                    <UserInput
                        keyboardType={'numeric'}
                        placeholder={'Nhập lại mật khẩu'}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        style = {{marginTop: 20}}
                        onChangeText ={(MatKhau) => this.setState({MatKhau})}
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
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 70,
                        marginTop: 10,
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('XacNhanCuDan')}>
                            <View style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                backgroundColor: '#90CAF9',
                                borderColor: 'black',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 35,
                                width: 90
                            }}>
                                <Text style={{color: "black"}}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.DangKy}>
                            <View style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                backgroundColor: '#90CAF9',
                                borderColor: 'black',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 35,
                                width: 90
                            }}>
                                <Text style={{color: "black"}}>Hủy</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
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
        // InfoUser: state.DangKy,
        // tongCmt: state.SearchCmtReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        CallApiDangKy: bindActionCreators(CallApiDangKy, dispatch)
    }
};

DangKyCuDan = connect(mapStateToProps, mapDispatchToProps)(DangKyCuDan);
export default DangKyCuDan