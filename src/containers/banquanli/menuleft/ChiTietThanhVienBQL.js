import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    TouchableOpacity, Alert
} from 'react-native';
import stylesContainer from "../../../components/style";
import moment from 'moment';
import Dimensions from 'Dimensions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiUpdateStatus} from "../../../actions/UpdateStatusActions";

const DEVICE_WIDTH = Dimensions.get('window').width;

class ChiTietThanhVienBQL extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Status: '',
            edit: false,
            underline: 'transparent',
            TaiKhoan: '',
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

    componentWillMount() {
        const {params} = this.props.navigation.state;
        console.log('data', params.dataBQL)
        console.log('dataItem bql', params.ItemBQL)
        {
            params.dataBQL[0].Gender = 0 ? this.setState({GioiTinh: 'Nam'}) :
                params.dataBQL[0].Gender = 1 ? this.setState({GioiTinh: 'Nữ'}) : null
        }
        this.setState({
            TaiKhoan: params.dataBQL[0].Phone,
            Ten: params.dataBQL[0].FullName,
            NgaySinh: moment(new Date(params.dataBQL[0].BirdDate)).format("L"),
            SoCMT: params.dataBQL[0].CMND,
            Email: params.dataBQL[0].Email,
            ChucVu: '',
            SoDienThoai: params.dataBQL[0].Phone,
            NgayTao: moment(new Date(params.dataBQL[0].CreatedTime)).format("L"),

        })
    }
    CheckTinhTrang =()=> {
        const {params} = this.props.navigation.state;
        const {InfoUser} = this.props
        if(InfoUser.length<=0){
            return null
        }
        const { callApiUpdateStatus } = this.props
        callApiUpdateStatus(InfoUser[0].RoleID,params.ItemBQL.ProfileID,params.ItemBQL.UserID, this.state.Status  ).then(dataRes => {
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
        })
    }

    render() {
        return (
            <View style={stylesContainer.container}>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Tài khoản: </Text>
                    <Text>{this.state.TaiKhoan}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Họ tên: </Text>
                    <Text>{this.state.Ten}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Ngày Sinh: </Text>
                    <Text>{this.state.NgaySinh}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Số CMT: </Text>
                    <Text>{this.state.SoCMT}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Giới tính: </Text>
                    <Text>{this.state.GioiTinh}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Email: </Text>
                    <Text>{this.state.Email}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Chức vụ: </Text>
                    <Text>{this.state.ChucVu}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Số điện thoại: </Text>
                    <Text>{this.state.SoDienThoai}</Text>
                </View>
                <View style={styles.viewcon}>
                    <Text style={styles.textL}>Ngày tạo: </Text>
                    <Text>{this.state.NgayTao}</Text>
                </View>
                <View style={{
                    marginHorizontal: 40,
                    width: DEVICE_WIDTH - 80,
                    marginTop: 20, maxHeight: 50,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    borderWidth: 1, borderColor: '#9E9E9E'
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Tình trạng:</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.Status}
                        onValueChange={(itemValue, itemIndex) => this.setState({Status: itemValue})}>
                        <Picker.Item label={'Hoạt động'} value='1'/>
                        <Picker.Item label={'Dừng hoạt động'} value={'2'}/>
                    </Picker>
                </View>
                <TouchableOpacity onPress = {this.CheckTinhTrang}>
                    <View style={{
                        marginHorizontal: 120,
                        width: DEVICE_WIDTH - 240,
                        marginTop: 5, height: 50, alignItems: 'center', justifyContent: 'center',
                        borderWidth: 1, borderColor: '#9E9E9E',
                        backgroundColor: '#64B5F6'
                    }}>

                            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>OK</Text>

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

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUpdateStatus: bindActionCreators(callApiUpdateStatus, dispatch)
    }
};
ChiTietThanhVienBQL = connect(mapStateToProps, mapDispatchToProps)(ChiTietThanhVienBQL);
export default ChiTietThanhVienBQL;

const styles = StyleSheet.create({
    circle: {
        marginTop: 15,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: '#42A5F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewcon: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    textL: {
        marginLeft: 15,

        fontWeight: 'bold'
    },
    textinput: {
        color: "#757575",
        padding: 0,
    },
    picker: {
        width: DEVICE_WIDTH / 2,
    }

})