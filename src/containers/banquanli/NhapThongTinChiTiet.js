import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    TouchableOpacity
} from 'react-native'

export default class NhapThongTinChiTiet extends Component {
    constructor(props){
        super(props)
        NgaySinh =['Ngày Sinh','0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
        GioiTinh = ['Giới Tính', 'Nam', 'Nữ', 'Khác']
        ChucVu = ['Chức Vụ', 'Trưởng BQL', 'Thành viên BQL','Chủ căn hộ','Thành viên căn hộ']
        this.state = {
            NgaySinh: '',
            GioiTinh:'',
            ChucVu:'',
            ten: '',
            hotline: '',
        }
    }
    TiepTuc(){

    }
    render(){
        const { params } = this.props.navigation.state;
        console.log(params.itemKDT)
        return(
            <View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Họ tên'
                               underlineColorAndroid="transparent"
                               onChangeText ={(ten)=> this.setState({ten})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.NgaySinh}
                        onValueChange={(value) => this.setState({NgaySinh: value})}>
                        {NgaySinh.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.GioiTinh}
                        onValueChange={(value) => this.setState({GioiTinh: value})}>
                        {GioiTinh.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.ChucVu}
                        onValueChange={(value) => this.setState({ChucVu: value})}>
                        {ChucVu.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Số hotline BQL'
                               underlineColorAndroid="transparent"
                               onChangeText = {(hotline)=>this.setState({hotline})}/>
                </View>


                <TouchableOpacity onPress = {() => this.props.navigation.navigate('DangKyTaiKhoanBQL', {itemKDT: params.itemKDT, NgaySinh:this.state.NgaySinh, GioiTinh: this.state.GioiTinh, ChucVu: this.state.ChucVu, ten: this.state.ten, hotline:this.state.hotline })}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>


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