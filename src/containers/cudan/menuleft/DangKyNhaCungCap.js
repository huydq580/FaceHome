import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
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
                            placeholder='Nhập mật khẩu '
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
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