import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class Nha extends Component {
    render (){
        return (
            <View>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                    <View style = {styles.circle}>
                        <Text>Avatar</Text>
                </View>
                    <Text style = {{color:'red', fontSize: 20}}>Nguyễn Văn A</Text>
                </View>
                <TouchableOpacity style = {styles.Touch}>
                    <Text style = {{color: 'white'}}>
                        Nhật ký
                    </Text>
                </TouchableOpacity>
                <View style = {{flexDirection: 'column', marginLeft: 40,
                    backgroundColor:"#42A5F5",width:200,height:100, borderWidth:1,marginTop:8,
                    justifyContent:'center'
                }}>
                    <Text style ={{marginLeft:10, color:'white'}}>Thông tin cá nhân</Text>
                    <View style = {{flexDirection:'row', marginLeft:10, fontSize:15}}>
                        <Text style = {{color: 'white', fontSize:15}}>Địa chỉ:</Text>
                        <Text></Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft:10, }}>
                        <Text style = {{color: 'white',fontSize:15}}>Số điện thoại:</Text>
                        <Text></Text>
                    </View>
                </View>
                <View style = {styles.viewItem}>
                    <Text style = {{flex:5}}>Bạn có muốn đăng bài lên bản tin không?</Text>
                    <View style = {{flex:1,borderWidth:1, backgroundColor: '#42A5F5', width:100,height:40,
                        alignItems:'center', justifyContent:'center'}}>
                        <Text>Đăng</Text>
                    </View>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng 1</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng 2</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng 3</Text>
                </View>



            </View>
        )
    }
}
const styles = StyleSheet.create({
    circle: {
        marginTop: 15,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#42A5F5',
        alignItems: 'center',
        justifyContent:'center'
    },
    Touch: {
        marginTop: 8,marginLeft: 40,
        borderWidth:1, backgroundColor: '#FB8C00', width:100,height:40,
        alignItems:'center', justifyContent:'center'
    },
    viewItem: {
        flexDirection: 'row',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 30,
        marginTop:20,
        minHeight:50,
    }
})
