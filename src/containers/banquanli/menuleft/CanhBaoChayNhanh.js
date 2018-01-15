import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

export default class CanhBaoChayNhanh extends Component {
    constructor(props){
        super(props)
        this.state = {
            CanhBao: '',
        }
    }
    render(){
        return(
            <View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Ban quản lí nhập thông tin tại đây và bấm nút báo chay bến duwois để thông báo nhanh tới toàn bộ dân cư trong KĐT'
                               underlineColorAndroid="transparent"
                               onChangeText ={(CanhBao)=> this.setState({CanhBao)}/>
                </View>
                <View style = {{justifyContent:'center', marginTop:20}}>
                    <Text style = {{borderWidth:1, backgroundColor:'red'}}>Báo Cháy</Text>
                </View>

                <View>
                    <Text>Hoặc gọi ngay cứu hỏa: </Text>
                    <Text>114</Text>
                </View>
                <Text>Lịch sử báo cháy</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },
})