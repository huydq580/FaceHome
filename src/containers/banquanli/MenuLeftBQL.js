import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, TouchableOpacity,
    Image, StyleSheet

} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon1 from 'react-native-vector-icons/Entypo';
import ItemLeftMenu from "../../components/leftmenu/ItemLeftMenu";
import {connect} from "react-redux";

class MenuLeftBQL extends Component {
    render (){
        const { InfoUser } = this.props
        if (InfoUser.length <=0 ) {
            return null
        }
        return (
            <ScrollView style = {{flexDirection:'column', backgroundColor:'white'}}>
                <View style = {{alignItems:'center', justifyContent:'center', minHeight:130}}>
                    <Image style={styles.image_circle}
                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <Text style = {{fontSize: 25, fontWeight: 'bold', color: '#212121', marginTop:10}}>{InfoUser[0].FullName}</Text>
                </View>
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Nhà [Tên căn hộ]"
                              nameIcon = "home"
                              onPress = {()=> this.props.navigation.navigate('Nha')}
                />
                <ItemLeftMenu title ="Thông tin khu đô thị"
                              nameIcon = "account-multiple"
                              onPress = {() => this.props.navigation.navigate('ThongTinKhuDoThi')}
                />

                <ItemLeftMenu title ="Ban quản lý"
                              nameIcon = "phone-classic"
                              onPress = {()=>this.props.navigation.navigate('BanQuanLy')}
                />

                <ItemLeftMenu title ="Tiếp nhận sự cố cư dân"
                              nameIcon = "security-home"
                              onPress = {()=> this.props.navigation.navigate('TiepNhanSuCoCuDan')}
                />

                <ItemLeftMenu title ="Cảnh báo cháy nhanh"
                              nameIcon = "phone-in-talk"
                              onPress = {()=> this.props.navigation.navigate('CanhBaoChayNhanh')}
                />
                <ItemLeftMenu title ="Thanh toán hóa đơn"
                              nameIcon = "square-inc-cash"
                              onPress = {()=> this.props.navigation.navigate('ThanhToanHoaDon')}
                />
                <ItemLeftMenu title ="Nhận đơn đăng ký dịch vụ"
                              nameIcon = "pencil-circle-outline"
                              onPress = {()=>this.props.navigation.navigate('NhanDonDangKyDichVu')}
                />

                <ItemLeftMenu title ="Rao vặt"
                              nameIcon = "language-r"
                              onPress = {()=> this.props.navigation.navigate('RaoVat')}
                />

                <ItemLeftMenu title ="Quản lí tài khoản"
                              nameIcon = "web"
                              onPress = {()=> this.props.navigation.navigate('QuanLyTaiKhoan')}
                />
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('GioiThieu')}
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
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};
MenuLeftBQL = connect(mapStateToProps)(MenuLeftBQL);
export default MenuLeftBQL
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,
        borderRadius: DEVICE_WIDTH / 6,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 20

    }
})