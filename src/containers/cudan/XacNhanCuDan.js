import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity

} from 'react-native'
import SlideImage from "../../components/SlideImage";
import CheckBox from 'react-native-check-box'
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";
class XacNhanCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Đăng kí tài khoản',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
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
    render () {
        // var leftText = data.name;

        return (
            <View style = {{justifyContent: "space-between", flex:1}}>
                <View>
                    <SlideImage
                        imageSlider={this.state.imageSlider}

                    />
                        <View
                            style={{borderWidth: 1, borderColor: 'black', marginTop: 30, marginHorizontal: 90}}>
                            <TextInput
                                placeholder='Nhập mã xác thực '
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                onChangeText={(Ho) => this.setState({Ho})}/>
                        </View>
                    <View style = {{flexDirection: 'row', marginHorizontal: 70, marginTop: 20, justifyContent: 'space-between'}}>
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
                    <View style = {{marginTop: 30, flexDirection: 'row', alignItems:'center'}}>
                        <Text style = {{flex:3, marginLeft: 10}}>* Không nhận được mã nhấn </Text>
                        <View style = {{flex:2}}>
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
                                    <Text>
                                        Gửi lại
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {{marginTop: 5, flexDirection: 'row', alignItems:'center'}}>
                        <Text style = {{flex:3, marginLeft: 10}}>* Số điện thoại nhập sai </Text>
                        <View style = {{flex:2}}>
                            <TouchableOpacity>
                                <View style={{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    backgroundColor: '#90CAF9',
                                    borderColor: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 35,
                                    width: 130
                                }}>
                                    <Text>
                                        Đổi số điện thoại
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                <View style = {{ marginBottom: 10,marginHorizontal: 20}}>
                    <Text style = {{fontSize: 13}}>*Để được hỗ trợ vui lòng liên hệ qua fanpage</Text>
                </View>

            </View>
        )

    }
}
export default XacNhanCuDan