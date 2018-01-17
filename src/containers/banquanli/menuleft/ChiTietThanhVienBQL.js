import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import stylesContainer from "../../../components/style";
// import {callApiGetBQL} from "../../../actions/BQLActions";
import { connect } from 'react-redux'
import {callApiNha} from "../../../actions/NhaActions";
import { bindActionCreators } from 'redux'

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
    const { UserBQL } = this.props;
    if (UserBQL.length <= 0) {
        return null;
    }
    this.setState({
        TaiKhoan: UserBQL[0].Phone,
        Ten: UserBQL[0].FullName,
        NgaySinh: UserBQL[0].BirdDate,
        SoCMT: UserBQL[0].CMND,
        GioiTinh: UserBQL[0].Gender,
        Email: UserBQL[0].Email,
        ChucVu: UserBQL[0].Position,
        SoDienThoai: UserBQL[0].Phone,
        NgayTao: UserBQL[0].CreatedTime,
    })
    // console.log('userid', UserBQL)
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
const mapStateToProps = (state) => {
    return {
        UserBQL: state.NhaBQLReducers
    }
};



ChiTietThanhVienBQL = connect(mapStateToProps)(ChiTietThanhVienBQL);
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