import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Picker
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
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
            PassAgain: '',
            ChucVu: 1
        }

    }
    componentWillMount(){
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
    }
    TaoThanhVien() {
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
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
                kdt_id: InfoUser[0].KDTID,
                chuc_vu: this.state.ChucVu,
                full_path: InfoUser[0].FullPath,
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
                <View style={{
                    marginHorizontal: 30,
                    width: DEVICE_WIDTH - 60,
                    marginTop: 20, maxHeight: 50,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    borderWidth: 1, borderColor: '#9E9E9E'
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Chức vụ:</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.ChucVu}
                        onValueChange={(itemValue, itemIndex) => this.setState({ChucVu: itemValue})}>
                        <Picker.Item label={'Trưởng BQL'} value='1'/>
                        <Picker.Item label={'Thành viên BQL'} value={'2'}/>
                    </Picker>
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
        InfoUser: state.GetProfileReducers,
    }
};



TaoThanhVienBQL = connect(mapStateToProps)(TaoThanhVienBQL);
export default TaoThanhVienBQL;
const styles = StyleSheet.create({
    itemBoder : {
        borderWidth: 1,
        marginHorizontal: 30,
        marginTop:20,

    },
    picker: {
        width: DEVICE_WIDTH / 2,
    }
})