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

export default class MenuLeftBQL extends Component {
    render (){
        return (
            <ScrollView style = {{flexDirection:'column', backgroundColor:'white'}}>
                <View style = {{alignItems:'center', justifyContent:'center', minHeight:130}}>
                    <Icon name="user-circle" size={70} color="#424242" />
                    <Text style = {{fontSize: 25, fontWeight: 'bold', color: '#212121', marginTop:10}}>Nguyễn Văn A</Text>
                </View>
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Nhà [Tên căn hộ]"
                              nameIcon = "home"
                              onPress = {()=> this.props.navigation.navigate('Nha')}
                />
                <ItemLeftMenu title ="Hàng xóm"
                              nameIcon = "account-multiple"
                              onPress = {() =>console.log('log2')}
                />

                <ItemLeftMenu title ="Liên lạc nhanh BQL"
                              nameIcon = "phone-classic"
                              onPress = {()=>console.log('log3')}
                />

                <ItemLeftMenu title ="Đăng ký dịch vụ KĐT"
                              nameIcon = "pencil-circle-outline"
                              onPress = {()=> console.log('log4')}
                />

                <ItemLeftMenu title ="Báo cáo sự cố KĐT"
                              nameIcon = "security-home"
                              onPress = {()=> console.log('log4')}
                />

                <ItemLeftMenu title ="Thanh toán hóa đơn"
                              nameIcon = "square-inc-cash"
                              onPress = {()=> console.log('log4')}
                />

                <ItemLeftMenu title ="Cảnh báo cháy nhanh"
                              nameIcon = "phone-in-talk"
                              onPress = {()=> console.log('log4')}
                />

                <ItemLeftMenu title ="Rao vặt"
                              nameIcon = "language-r"
                              onPress = {()=> console.log('log4')}
                />

                <ItemLeftMenu title ="Quản lí tài khoản"
                              nameIcon = "web"
                              onPress = {()=> console.log('log4')}
                />

                {/*<ItemLeftMenu title ="Giới thiệu"*/}
                              {/*nameIcon = "information-variant"*/}
                              {/*onPress = {()=> console.log('log4')}*/}
                {/*/>*/}
                <TouchableOpacity
                    onPress={this.props.onPress}
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