import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import stylesContainer from "../../../components/style";

export default class ThongTinKhuDoThi extends Component {
    render (){
        return (
            <View style = {stylesContainer.container}>
                <View style = {styles.viewCha}>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Giới thiệu chung - Quy định khu đô thi</Text>
                    </View>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Thông tin khác ban quản lí</Text>
                    </View>
                </View>
                <View style = {styles.viewCha}>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Trạm y tế, trường mầm non, tiểu học, trung học cơ sở, trung học phổ thông</Text>
                    </View>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Thủ tục đăng kí tạm trú tạm vắng</Text>
                    </View>
                </View>
                <View style = {styles.viewCha}>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Cơ quan hành chính sự nghiệp</Text>
                    </View>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}></Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewCha: {
        flex:1,
        flexDirection:'row'
    },
    viewCon: {
        flex:1,
        margin:20,
        backgroundColor: '#448AFF',
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        color: 'white',
        fontSize: 15
    }
})
