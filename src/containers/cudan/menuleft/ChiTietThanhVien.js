import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity, Alert,
} from 'react-native';
import moment from 'moment';
import Dimensions from 'Dimensions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {callApiUpdateStatus} from "../../../actions/UpdateStatusActions";


class ChiTietThanhVien extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            underline : 'transparent',
            Ten : '',
            SoNha : '',
            Tang : '',
            Toa : '',
            QuanHe: '',
            LoaiHinhNhaO: '',
            SoDienThoai : '',
            SoCMT : '',
            GioiTinh : '',
            NgaySinh : '',
            NgayTao : '',
            TrangThai:'',
            Value: "",
        }
        this.Status = this.Status.bind(this);
    }
    //update status
    Status () {
        //cap nhap thieu gia tri value
        const {params} = this.props.navigation.state;
        const { callApiUpdateStatus } = this.props;
        console.log('param', params)
        // console.log('value', this.state.Value)
        const {InfoUser} = this.props
        if(InfoUser.length<=0){
            return null
        }
        console.log('RoleID', InfoUser[0].RoleID)
        callApiUpdateStatus(InfoUser[0].RoleID, params.dataCuDan.ProfileID, params.dataCuDan.UserID, this.state.Value ).then(dataRes => {
            data = JSON.parse(dataRes);
            console.log('data', data)
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

    componentWillMount(){
        const {params} = this.props.navigation.state;
        console.log('status', params.dataCuDan.Status)
        // console.log('data', params.dataCuDan)
        {
            params.dataCuDan.Status == 0 ? this.setState({Value: 1}) :
                params.dataCuDan.Status == 1 ? this.setState({Value: 2}) :
                params.dataCuDan.Status == 2 ? this.setState({Value: 1}) : null
                // params.dataCuDan.Status == 3 ? this.setState({Value: 1}) :
                //     params.dataCuDan.Status == 4 ? this.setState({Value: 5}) : null
        }
        {
            params.dataCuDan.Status == 0 && params.dataCuDan.Position ==3 ? this.setState({TrangThai: 'Duyệt tài khoản'}) :
                params.dataCuDan.Status == 1 ? this.setState({TrangThai: 'Khóa tài khoản'}) :
                    params.dataCuDan.Status == 2 ? this.setState({TrangThai: 'Phục hồi'}) : null
                // params.dataCuDan.Status == 3 && params.dataCuDan.Position ==3 ? this.setState({TrangThai: 'Duyệt tài khoản'}) :
                //     params.dataCuDan.Status == 4  && params.dataCuDan.Position ==3 ? this.setState({TrangThai: 'Xác nhận rời KDT'}) : null
            // params.dataCuDan.Status == 5 ? this.setState({TrangThai: 'Duyệt tài khoản'}) : null
        }
        this.setState({
            Ten : params.dataCuDan.FullName,
            SoNha :  params.dataCuDan.PartName,
            Tang : 'Tầng 1',
            Toa : "Tòa 17T1",
            QuanHe: "",
            LoaiHinhNhaO: "",
            SoDienThoai : params.dataCuDan.Phone,
            SoCMT : params.dataCuDan.CMND,
            GioiTinh : params.dataCuDan.Gender,
            NgaySinh : params.dataCuDan.BirdDate,
            NgayTao : moment(new Date(params.dataCuDan.CreatedTime)).format("L"),
        })
    }
    render (){
        return(
            <View style = {stylesContainer.container}>
                <View style = {{flexDirection: 'row'}}>
                    <Image style={styles.image_circle}

                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <View style = {{justifyContent:'center', marginLeft: 15}}>
                        <Text style = {{fontSize: 18, color:'black', fontWeight:'bold'}}>
                            {this.state.Ten}
                        </Text>
                        <View style = {{marginTop: 8, flexDirection:'row'}}>
                            <TouchableOpacity onPress = {this.Status}>
                                <Text style = {{fontSize: 18, textDecorationLine: "underline", textDecorationColor:'#FF3D00', color: '#FF3D00', fontWeight:'bold'}}>
                                    {this.state.TrangThai}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress = {()=> this.props.navigation.navigate('TinNhanDetails')}
                            >
                                <Text style = {{fontSize: 18, textDecorationLine: "underline", textDecorationColor:'#424242', color: '#424242', marginLeft: 20}}>
                                    Nhắn tin
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Tên: </Text>
                    <TextInput
                        value = {this.state.Ten}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Số nhà: </Text>
                    <TextInput
                        value = {this.state.SoNha}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Tầng/Lầu: </Text>
                    <TextInput
                        value = {this.state.Tang}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Tòa: </Text>
                    <TextInput
                        value = {this.state.Toa}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>QuanHe: </Text>
                    <TextInput
                        value = {this.state.QuanHe}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Loại hình nhà ở: </Text>
                    <TextInput
                        value = {this.state.LoaiHinhNhaO}
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
                    <Text style = {styles.textL}>Số CMT - Hộ chiếu: </Text>
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
                    <Text style = {styles.textL}>Ngày sinh: </Text>
                    <TextInput
                        value = {this.state.NgaySinh}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Ngày tạo tài khoản: </Text>
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
        InfoUser: state.GetProfileReducers,
    }
};
const mapDispatchToProps = (dispatch) => {

    return {
        callApiUpdateStatus: bindActionCreators( callApiUpdateStatus, dispatch),
    }
};
ChiTietThanhVien = connect( mapStateToProps, mapDispatchToProps)(ChiTietThanhVien);

export default ChiTietThanhVien;
const DEVICE_WIDTH = Dimensions.get('window').width;

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
    },
    image_circle: {
        height: DEVICE_WIDTH / 4,
        width: DEVICE_WIDTH / 4,
        borderRadius: DEVICE_WIDTH / 8,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})