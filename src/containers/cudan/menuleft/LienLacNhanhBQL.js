import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import stylesContainer from "../../../components/style";
import Communications from 'react-native-communications';

export default class LienLacNhanhBQL extends Component {
    render(){
        return(
            <View style = {stylesContainer.container}>
                <View style = {{alignItems:'center'}}>
                    <Text style = {{marginTop:40, marginHorizontal:10, justifyContent:'center', fontSize: 15}}>
                        Cư dân có thể gọi điện tới số điện thoại hoặc nhắn tin cho BQL theo thông tin ở dưới:
                    </Text>
                    <TouchableOpacity onPress={() => Communications.phonecall('0963250395', true)}>
                        <View style = {[styles.textItem, {marginTop:40}]}>
                            <Text style = {{fontSize:18, color:'white', fontWeight:'bold'}}>0963250395</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Communications.phonecall('0963250395', true)}>
                        <View style = {[styles.textItem, {marginTop:10}]}>
                            <Text style = {{fontSize:20, color:'white', fontWeight:'bold'}}>0963250395</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style = {{fontSize:18, color: 'black', fontWeight:'bold', marginTop:30}}>Nhắn tin cho BQL</Text>
                    <View style = {{flexDirection:'row', alignItems:'center', marginTop:30}}>
                        <Text style = {{fontSize: 16,fontWeight:'bold', color: 'red', textDecorationLine: "underline", textDecorationColor:'red'}}>
                            Nguyễn A
                        </Text>
                        <TouchableOpacity onPress={() => Communications.text('0963250395', true)}>
                            <View style = {[styles.textItem, { marginLeft:30}]}>
                                <Text style = {{fontSize:20, color:'white', fontWeight:'bold'}}>Gửi tin nhắn</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flexDirection:'row', alignItems:'center', marginTop:10}}>
                        <Text style = {{fontSize: 16,fontWeight:'bold', color: 'red', textDecorationLine: "underline", textDecorationColor:'red'}}>
                            Nguyễn B
                        </Text>
                        <TouchableOpacity onPress={() => Communications.text('0963250395', true)}>
                            <View style = {[styles.textItem, { marginLeft:30}]}>
                                <Text style = {{fontSize:20, color:'white', fontWeight:'bold'}}>Gửi tin nhắn</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flexDirection:'row', alignItems:'center', marginTop:10}}>
                        <Text style = {{fontSize: 16,fontWeight:'bold', color: 'red', textDecorationLine: "underline", textDecorationColor:'red'}}>
                            Nguyễn C
                        </Text>
                        <TouchableOpacity onPress={() => Communications.text('0963250395', true)}>
                            <View style = {[styles.textItem, { marginLeft:30}]}>
                                <Text style = {{fontSize:20, color:'white', fontWeight:'bold'}}>Gửi tin nhắn</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    textItem: {
        height: 40,
        width:150,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#448AFF',
        borderColor:'#2979FF',
        borderWidth:1
    }
})