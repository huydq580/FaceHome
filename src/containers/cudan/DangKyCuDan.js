import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import SlideImage from "../../components/SlideImage";
import CheckBox from 'react-native-check-box'

class DangKyCuDan extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            marginTop: 30,
                            marginHorizontal: 70,
                            flex: 1
                        }}>
                            <TextInput
                                style={{marginLeft: 10, padding: 0}}
                                placeholder='Nhập họ tên '
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                onChangeText={(Ho) => this.setState({Ho})}/>
                        </View>
                        {/*<Text>(*)</Text>*/}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View
                            style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 70, flex: 1}}>
                            <TextInput
                                style={{marginLeft: 10, padding: 0}}
                                placeholder='Nhập số điện thoại '
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                onChangeText={(Ho) => this.setState({Ho})}/>
                        </View>
                        {/*<Text>(*)</Text>*/}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View
                            style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 70, flex: 1}}>
                            <TextInput
                                style={{marginLeft: 10, padding: 0}}
                                placeholder='Nhập mật khẩu '
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                onChangeText={(Ho) => this.setState({Ho})}/>
                        </View>
                        {/*<Text>(*)</Text>*/}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View
                            style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 70, flex: 1}}>
                            <TextInput
                                style={{marginLeft: 10, padding: 0}}
                                placeholder='Nhập lại mật khẩu '
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                onChangeText={(Ho) => this.setState({Ho})}/>
                        </View>
                        {/*<Text>(*)</Text>*/}
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
                        <TouchableOpacity>
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

export default DangKyCuDan