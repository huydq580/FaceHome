import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity, StyleSheet
} from 'react-native'
import images from "../images";

export default class ChuaDangNhapItem extends Component {
    render () {
        return (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-between'}}>
                <View style={{justifyContent: 'center', flex: 4, alignItems: 'center'}}>
                    <Image
                        source={images.khongcothongbao}
                        style={styles.notification}
                        resizeMode="cover"
                    >

                    </Image>
                    <Text style={{fontSize: 16}}>Không có thông báo nào</Text>

                </View>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DangNhap')}>
                        <View style={styles.viewDangNhap}>
                            <Text style={styles.textDangNhap}>Đăng nhập</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center'}}>

                        <Text style={{fontSize: 18, marginTop: 5}}>Hãy đăng nhập vào chung cư của bạn</Text>
                    </View>
                </View>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    icondichvu: {
        marginLeft: 10,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notification: {
        width: 100,
        height: 100,
    },
    viewDangNhap: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#01579B',
        marginHorizontal: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#01579B'
    },
    textDangNhap: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }


})
