import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {ChangePassword, URL} from "../../../components/Api";
class ThayDoiMatKhau extends Component {
    constructor(props){
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            confirmPass: '',
        }
    }
    updatePass () {
        AsyncStorage.getItem('SoDienThoai').then((value) => {
            fetch( URL + ChangePassword,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    ten_dang_nhap: value,
                    mat_khau_cu: this.state.oldPass,
                    mat_khau_moi: this.state.newPass,
                    lang_name: 'vi_VN'
                })
            })
                .then((response) => response.json())
                .then((dataRes)=> {
                    data = JSON.parse(dataRes);
                    if(data.ErrorCode==="00") {
                        Alert.alert(
                            'Alert',
                            data.Message,
                            [
                                {text: 'OK', onPress: () => this.props.navigation.goBack()},
                            ],
                            { cancelable: false }
                        )
                    }
                    else {
                        Alert.alert(
                            'Alert',
                            data.Message,
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                        )
                    }

                }).catch((erro)=> {
                console.log('erro',erro);
            })
        })



    }
    render (){
        return (
            <View style = {[stylesContainer.container, {justifyContent:'center'}]}>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu cũ'
                               underlineColorAndroid="transparent"
                               onChangeText = {(oldPass)=>this.setState({oldPass})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu mới'
                               underlineColorAndroid="transparent"
                               onChangeText = {(newPass)=>this.setState({newPass})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Xác nhận mật khẩu mới'
                               underlineColorAndroid="transparent"
                               onChangeText = {(confirmPass)=>this.setState({confirmPass})}/>
                </View>
                <TouchableOpacity onPress = {this.updatePass.bind(this)}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Cập nhật</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
};


ThayDoiMatKhau = connect(mapStateToProps)(ThayDoiMatKhau);
export default ThayDoiMatKhau
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 20,
        marginTop:20,
    },


})
