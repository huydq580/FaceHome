import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, TouchableOpacity

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon1 from 'react-native-vector-icons/Entypo';
import ItemLeftMenu from "../../components/leftmenu/ItemLeftMenu";

export default class MenuLeftCuDan extends Component {
    render (){
        return (
            <ScrollView style = {{flexDirection:'column', backgroundColor:'white'}}>
                <View style = {{alignItems:'center', justifyContent:'center', minHeight:130}}>
                    <Icon name="user-circle" size={70} color="#424242" />
                    <Text style = {{fontSize: 25, fontWeight: 'bold', color: '#212121', marginTop:10}}>Nguyễn Văn A</Text>
                </View>
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Thông tin cần biết"
                              nameIcon = "information-outline"
                              onPress = {()=> this.props.navigation.navigate('ThongTinCanBiet')}
                />
                <ItemLeftMenu title ="Liên lạc nhanh BQL"
                              nameIcon = "contacts"
                              onPress = {() => this.props.navigation.navigate('LienLacNhanhBQL')}
                />

                <ItemLeftMenu title ="Đăng kí dịch vụ KĐT"
                              nameIcon = "lock-open"
                              onPress = {()=>this.props.navigation.navigate('DangKyDichVuKDT')}
                />

                <ItemLeftMenu title ="Báo cáo sự cố KĐT"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('BaoSuCoKDT')}
                />

                <ItemLeftMenu title ="Thanh toán hóa đơn"
                              nameIcon = "square-inc-cash"
                              onPress = {()=> this.props.navigation.navigate('ThanhToanHoaDonCuDan')}
                />
                <ItemLeftMenu title ="Cảnh báo cháy nhanh"
                              nameIcon = "phone-in-talk"
                              onPress = {()=> this.props.navigation.navigate('CanhBaoChayNhanhCuDan')}
                />

                <ItemLeftMenu title ="Quản lí tài khoản"
                              nameIcon = "web"
                              onPress = {()=> this.props.navigation.navigate('QuanLyTaiKhoanCuDan')}
                />
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('GioiThieuCuDan')}
                    style={{flexDirection: 'row',marginTop:20, marginBottom:20}}>
                    <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 name = "information-variant" size={25} color="#424242"/>
                    </View>
                    <Text style={{flex:5, fontSize:17, color:'#616161'}}>Giới thiệu</Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}