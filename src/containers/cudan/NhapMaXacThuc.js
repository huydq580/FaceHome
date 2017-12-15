import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';

export default class NhapMaXacThuc extends Component {
    render (){
        return (
            <View>
                <View style = {{alignItems:'center', justifyContent: 'center', marginTop:10}}>
                        <Text>Một mã xác thực sẽ được gửi tới sđt của bạn!</Text>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập Mã Xác Thực '
                                 underlineColorAndroid='transparent'/>
                </View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Tab')}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{alignItems:'center', justifyContent: 'center', marginTop:10}}>
                    <Text>Bạn không nhận được mã xác thực?</Text>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <Text>GỬI LẠI</Text>
                    <Text>ĐỔI SĐT</Text>
                </View>
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