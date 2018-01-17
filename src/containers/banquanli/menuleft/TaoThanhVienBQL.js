import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import stylesContainer from "../../../components/style";
import {CreateAcc, URL} from "../../../components/Api";
import { connect } from 'react-redux'

class TaoThanhVienBQL extends Component{
    constructor(props){
        super(props)
        this.state = {
            HoTen:'',
            SoDienThoai: '',
            Pass: '',
            PassAgain: ''
        }

    }
    componentWillMount(){
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
    }
    TaoThanhVien() {
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }

        fetch(URL + CreateAcc , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ho_ten: this.state.HoTen,
                so_dien_thoai: this.state.SoDienThoai,
                mat_khau: this.state.Pass,
                kdt_id: UserBQL.payload[0].KDTID,
                chuc_vu: 2,
                full_path: UserBQL.payload[0].FullPath,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                data = JSON.parse(dataRes);
                console.log('dataLogin', data)
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
            this.setState({
                Loading: false,
                Error: true
            })
        })
    }
    render (){
        return (
            <View style = {stylesContainer.container}>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập họ tên thành viên'
                               underlineColorAndroid="transparent"
                               onChangeText = {(HoTen)=>this.setState({HoTen})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số điện thoại thành viên'
                               underlineColorAndroid="transparent"
                               keyboardType={'numeric'}
                               onChangeText = {(SoDienThoai)=>this.setState({SoDienThoai})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu'
                               underlineColorAndroid="transparent"
                               onChangeText ={(Pass)=> this.setState({Pass})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập lại mật khẩu'
                               underlineColorAndroid="transparent"
                               onChangeText ={(PassAgain)=> this.setState({PassAgain})}/>
                </View>
                <TouchableOpacity onPress = {this.TaoThanhVien.bind(this)}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tạo</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
        // infoBQL: state.NhaBQLReducers
    }
};



TaoThanhVienBQL = connect(mapStateToProps)(TaoThanhVienBQL);
export default TaoThanhVienBQL;
const styles = StyleSheet.create({
    itemBoder : {
        borderWidth: 1,
        marginHorizontal: 30,
        marginTop:20,

    }
})