import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import stylesContainer from "../../../components/style";
import Modal from "react-native-modal";

export default class QuanLyTaiKhoanCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibleModal: null
        };
    }
    // Logout() {
    //     AsyncStorage.removeItem('UserID')
    //     const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //             NavigationActions.navigate({
    //                 routeName: 'DangNhap',
    //             }),
    //         ]
    //     });
    //     this.props.navigation.dispatch(resetAction)
    // }
    render (){
        return (
            <View style = {[stylesContainer.container,{justifyContent:'center'}]}>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('ThayDoiMatKhauCuDan')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Thay đổi mật khẩu
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Thay đổi mật khẩu đăng nhập
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('ChuyenDiaDiem')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Chuyển địa điểm
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Chuyển KĐT, chuyển phòng hoặc hủy tài khoản
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('ThayDoiMatKhau')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Thay đổi số điện thoại
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Cho phép thay đổi số điện thoại cho tài khoản hiện tại
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=> this.setState({ visibleModal: 5 })}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10, }}>
                            Đăng xuất
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10,textDecorationColor:'#BDBDBD', marginBottom:10, marginLeft:10}}>
                            Thoát và đăng nhập với tài khoản khác
                        </Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.visibleModal === 5}
                    style={styles.bottomModal}
                >
                    <View>
                        <TouchableOpacity onPress =  {()=> {AsyncStorage.removeItem('UserID')
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: 'DangNhap',
                                    }),
                                ]
                            });
                            this.props.navigation.dispatch(resetAction)}}>
                            <View style = {styles.modalContent}>
                                <Text style = {{fontSize:11}}>Bạn có muốn đăng xuất tài khoản này?</Text>
                                <View style = {{height:1, backgroundColor: 'red'}}/>
                                <Text style = {{color: 'red', fontSize:18, marginTop: 15}}>
                                    Đăng xuất
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = { ()=> this.setState({ visibleModal: null })}>
                            <View style = {[styles.modalContent, {marginTop: 10}]}>
                                <Text style = {{fontSize:18, color: '#2196F3'}}>
                                    Hủy
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewitem : {
        borderWidth: 1,
        marginHorizontal:20,
        borderColor:'#BDBDBD'

    },
    modalContent: {
        flexDirection:'column',
        backgroundColor: "white",
        padding: 22,
        // justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 10,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    }
})