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
        NgaySinh =['Ngày Sinh','0','1','2','3','4','5','6','7','8','9','10']
        GioiTinh = ['Giới Tính', 'Nam', 'Nữ']
        ChucVu = ['Chức Vụ']
        this.state = {
            NgaySinh: '',
            GioiTinh:'',
            ChucVu:'',
        }
    }
    render(){
        return(
            <View>
                <View style = {[styles.itemBoder, {minHeight: 50, justifyContent: 'center'}]}>
                    <Text>Họ tên</Text>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.NgaySinh}
                        onValueChange={(itemValue, itemIndex) => this.setState({NgaySinh: itemValue})}>
                        {NgaySinh.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.GioiTinh}
                        onValueChange={(itemValue, itemIndex) => this.setState({GioiTinh: itemValue})}>
                        {GioiTinh.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.ChucVu}
                        onValueChange={(itemValue, itemIndex) => this.setState({ChucVu: itemValue})}>
                        {ChucVu.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {[styles.itemBoder, {minHeight: 50, justifyContent: 'center'}]}>
                    <Text>Số Hotline BQL</Text>
                </View>


                <TouchableOpacity onPress = {() => this.props.navigation.navigate('TrangChuBQL')}>
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