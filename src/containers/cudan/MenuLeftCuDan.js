import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, TouchableOpacity, StyleSheet,
    Image

} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemLeftMenu from "../../components/leftmenu/ItemLeftMenu";
import {connect} from "react-redux";
import {LINKIMG} from "../../components/Api";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";

class MenuLeftCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {

            headerStyle: { backgroundColor: BACKGROUND_HEADER },
            headerTitleStyle: { color: TITLE_HEADER },
            title: 'Menu'

        }

    }
    render (){

        return (
            <ScrollView style = {{flexDirection:'column', backgroundColor:'white'}}>
                <ItemLeftMenu title ="Tài khoản của bạn"
                              nameIcon = "home"
                              onPress = {()=> this.props.navigation.navigate('TaiKhoanCuaBanCuDan')}
                />
                <ItemLeftMenu title ="Hàng xóm của bạn"
                              nameIcon = "home"
                              onPress = {()=> this.props.navigation.navigate('HangXom')}
                />
                <ItemLeftMenu title ="Thông tin cần biết quanh khu đô thị"
                              nameIcon = "account-multiple"
                              onPress = {() => this.props.navigation.navigate('ThongTinKDTCuDan')}
                />
                <ItemLeftMenu title ="Liên hệ Ban Quản Lý"
                              nameIcon = "contacts"
                              onPress = {() => this.props.navigation.navigate('LienLacNhanhBQL')}
                />

                {/*<ItemLeftMenu title ="Đăng kí dịch vụ KĐT"*/}
                              {/*nameIcon = "lock-open"*/}
                              {/*onPress = {()=>this.props.navigation.navigate('DangKyDichVuKDT')}*/}
                {/*/>*/}

                <ItemLeftMenu title ="Phản ánh sự cố"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('BaoSuCoKDT')}
                />
                <ItemLeftMenu title ="Chợ FaceHome"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('ChoFaceHome')}
                />
                <ItemLeftMenu title ="Bếp ăn gia đình"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('BepAnGiaDinh')}
                />

                {/*<ItemLeftMenu title ="Cảnh báo cháy nhanh"*/}
                              {/*nameIcon = "phone-in-talk"*/}
                              {/*onPress = {()=> this.props.navigation.navigate('CanhBaoChayNhanhCuDan')}*/}
                {/*/>*/}
                <ItemLeftMenu title ="Hướng dẫn"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('HuongDan')}
                />
                <ItemLeftMenu title ="Giới thiệu"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('GioiThieuCuDan')}
                />

                <ItemLeftMenu title ="Quản lí tài khoản"
                              nameIcon = "web"
                              onPress = {()=> this.props.navigation.navigate('QuanLyTaiKhoanCuDan')}
                />
                <View style = {{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <TouchableOpacity>
                        <View style = {styles.canhbao}>
                            <Text style = {{color: "black", fontWeight:'bold'}}>CẢNH BÁO KHẨN CẤP</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};
MenuLeftCuDan = connect(mapStateToProps)(MenuLeftCuDan);
export default MenuLeftCuDan
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,
        borderRadius: DEVICE_WIDTH / 6,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 20

    },
    canhbao: {
        width: DEVICE_WIDTH / 2,
        height: 35,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor:'#EF6C00',
        backgroundColor: '#F57C00'


    }

})