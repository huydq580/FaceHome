import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import stylesContainer from "../../../components/style";
import moment from 'moment';

class ChiTietThanhVienBQL extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            underline : 'transparent',
            TaiKhoan : '',
            Ten: '',
            NgaySinh: '',
            SoCMT: '',
            GioiTinh: '',
            Email: '',
            ChucVu: '',
            SoDienThoai: '',
            NgayTao: '',
        }
    }

componentWillMount(){
    const {params} = this.props.navigation.state;
    // console.log('data', params.dataBQL)
    {
        params.dataBQL[0].Gender = 0 ? this.setState({GioiTinh: 'Nam'}) :
            params.dataBQL[0].Gender = 1 ? this.setState({GioiTinh: 'Nữ'}) : null
    }
    this.setState({
        TaiKhoan: params.dataBQL[0].Phone,
        Ten:  params.dataBQL[0].FullName,
        NgaySinh:  moment(new Date(params.dataBQL[0].BirdDate)).format("L"),
        SoCMT:  params.dataBQL[0].CMND,
        Email:  params.dataBQL[0].Email,
        ChucVu:  '',
        SoDienThoai:  params.dataBQL[0].Phone,
        NgayTao: moment(new Date(params.dataBQL[0].CreatedTime)).format("L"),

    })
}
render (){
        return(
            <View style = {stylesContainer.container}>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Tài khoản: </Text>
                    <TextInput
                        value = {this.state.TaiKhoan}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Họ tên: </Text>
                    <TextInput
                        value = {this.state.Ten}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Ngày Sinh: </Text>
                    <TextInput
                        value = {this.state.NgaySinh}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Số CMT: </Text>
                    <TextInput
                        value = {this.state.SoCMT}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Giới tính: </Text>
                    <TextInput
                        value = {this.state.GioiTinh}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Email: </Text>
                    <TextInput
                        value = {this.state.Email}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Chức vụ: </Text>
                    <TextInput
                        value = {this.state.ChucVu}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Số điện thoại: </Text>
                    <TextInput
                        value = {this.state.SoDienThoai}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Ngày tạo: </Text>
                    <TextInput
                        value = {this.state.NgayTao}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
             </View>
        );
    }
}

export default ChiTietThanhVienBQL;
const styles = StyleSheet.create({
    circle: {
        marginTop: 15,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#42A5F5',
        alignItems: 'center',
        justifyContent:'center'
    },
    viewcon: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    textL: {
        marginLeft: 15,

        fontWeight:'bold'
    },
    textinput: {
        color: "#757575",
        padding: 0,
    }
})