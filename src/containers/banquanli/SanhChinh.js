import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import stylesContainer from "../../components/style";

export default class SanhChinh extends Component {
    render (){
        return (
            <ScrollView style = {stylesContainer.container}>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text style = {{fontSize:22, fontWeight:'bold'}}>
                        Thông Tin Từ Ban Quản Lý
                    </Text>
                </View>
                <View style = {[styles.viewItem, {marginTop:20}]}>
                    <Text>Bản tin số 1</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bản tin số 2</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bản tin số 3</Text>
                </View>
                <View style = {styles.viewItem}>
                    <TextInput placeholder = 'Soạn bài đăng cho KĐT tại đây '
                               underlineColorAndroid="transparent"
                               style = {{flex:5}}
                               />
                    <View style = {{flex:1,borderWidth:1, backgroundColor: '#42A5F5', width:100,height:40,
                        alignItems:'center', justifyContent:'center'}}>
                        <Text>Đăng</Text>
                    </View>
                </View>
                <Text style = {{marginLeft:20}}>+Tạo sự kiện</Text>

                <View style = {[styles.viewItem, {marginTop:20}]}>
                    <Text>Bài đăng của cư dân trong KĐT</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng của cư dân trong KĐT</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng của cư dân trong KĐT</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng của cư dân trong KĐT</Text>
                </View>



            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 20,
        marginTop:7,
        minHeight:50,
    },

})