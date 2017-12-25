import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/Entypo';
import ItemLeftMenu from "../../components/leftmenu/ItemLeftMenu";

export default class MenuLeftBQL extends Component {
    render (){
        return (
            <ScrollView style = {{flexDirection:'column'}}>
                <View style = {{alignItems:'center', justifyContent:'center', minHeight:110}}>
                    <Icon name="user-circle" size={60} color="#900" />
                    <Text style = {{fontSize: 30, fontWeight: 'bold'}}>Nguyễn Văn A</Text>
                </View>
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Nhà [Tên căn hộ]"
                              nameIcon = "home"
                              onPress = {()=> console.log('log1')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Hàng xóm"
                              // nameIcon = "tachometer"
                              onPress = {() =>console.log('log2')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Liên lạc nhanh BQL"
                              onPress = {()=>console.log('log3')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Đăng ký dịch vụ KĐT"
                              onPress = {()=> console.log('log4')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Báo cáo sự cố KĐT"
                              onPress = {()=> console.log('log4')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Thanh toán hóa đơn"
                              onPress = {()=> console.log('log4')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Cảnh báo cháy nhanh"
                              onPress = {()=> console.log('log4')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Rao vặt"
                              onPress = {()=> console.log('log4')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Quản lí tài khoản"
                              onPress = {()=> console.log('log4')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <ItemLeftMenu title ="Giới thiệu"
                              onPress = {()=> console.log('log4')}
                />
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>

            </ScrollView>
        );
    }
}