import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

class DangKyNhaCungCap extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Đăng kí tài khoản',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    render () {
        return(
            <View>
                <View style = {styles.headerView}>
                    <Text style = {styles.headerText}>
                        Trở thành nhà cung cấp của Facehome bạn sẽ có cơ hội quảng
                        cáo sản phẩm dịch vụ cho toàn bộ cộng đồng dân cư quanh khu
                        vực của bạn. Cộng đồng cư dân sẽ nhìn thấy dịch vụ của bạn
                        trong mục dịch vụ của ứng dụng và có thể nhắn tin trực tiếp tới
                        bạn qua ứng dụng Facehome
                    </Text>

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Nhập mật khẩu '
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Loại hình dịch vụ '
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{height: 100, borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Mô tả dịch vụ '
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Tên nhà cung cấp '
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Số điện thoại liên hệ'
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Địa chỉ cửa hàng'
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
                <View style = {{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:50, alignItems:'center'}}>
                    <Text style = {{color: 'black'}}>
                        Hình ảnh
                    </Text>
                    <TouchableOpacity onPress = {()=> this.props.navigation.navigate('DangKyNhaCungCap')}>
                        <View style = {{justifyContent:'center',
                            alignItems:'center', borderWidth: 1,
                            borderRadius: 3, height: 30,
                            width: 90}}>
                            <Text>
                               Tải lên
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <Text style = {{color: "black", marginLeft: 50, marginTop:10}}>Xác nhận vị trí cửa hàng trên bản đồ</Text>

            </View>
        )
    }
}
export default DangKyNhaCungCap
const styles = StyleSheet.create({
    headerView : {
        marginHorizontal: 20,
        marginTop: 10
    },
    headerText: {
        color: 'black'
    }
})