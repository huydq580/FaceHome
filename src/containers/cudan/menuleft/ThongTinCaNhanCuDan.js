import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import { connect } from 'react-redux'
import moment from 'moment';
import stylesContainer from "../../../components/style";
import PickerImage from "../../../components/PickerImage";
import {callApiUpdateProfile} from "../../../actions/actionsBQL/UpdateProfileActions";
import {bindActionCreators} from "redux";
import {callApiUploadImage} from "../../../actions/SoanTinActions";
import {LINKIMG} from "../../../components/Api";

class ThongTinCaNhanCuDan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            Ten: '',
            ChucVu: '',
            NgaySinh: '',
            GioiTinh: '',
            SoCMT: '',
            SoDT: '',
            Email: '',
            SoHotlineQBL: '',
            NgayThamGia: '',
            //uoload image
            isCheck:true,
            dataImage: null,
            avatarSource: null,
            linkImg: '',
        }
    }
    componentWillMount(){
        const { infoCuDan } = this.props;
        if (infoCuDan.length <= 0) {
            return null;
        }
        {
            infoCuDan[0].Gender = 0 ? this.setState({GioiTinh: 'Nữ'}) :
                infoCuDan[0].Gender = 1 ? this.setState({GioiTinh: 'Nam'}) : null
        }
        {
            infoCuDan[0].Position = 1 ? this.setState({ChucVu: 'Trưởng BQL'}) :
                infoCuDan[0].Position = 2 ? this.setState({ChucVu: 'Thành viên BQL'}) : null
        }
        this.setState({
            Ten: infoCuDan[0].FullName ,
            NgaySinh: moment(new Date(infoCuDan[0].BirdDate)).format("L"),
            SoCMT: infoCuDan[0].CMND,
            SoDT: infoCuDan[0].Phone,
            Email: infoCuDan[0].Email,
            SoHotlineQBL: infoCuDan[0].HotLine,
            NgayThamGia: moment(new Date(infoCuDan[0].CreatedTime)).format("L"),
        })
    }
    show() {
        PickerImage((source, data) => this.setState({avatarSource: source, dataImage: data, isCheck: false}, ()=>{
            this.upload()
        }));
    }

    upload() {
        const {InfoUser, callApiUploadImage} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        callApiUploadImage(InfoUser[0].UserID, this.state.dataImage).then(dataImg => {
            dataImg = JSON.parse(dataImg)
            dataImg = dataImg.Value
            console.log('dataImage1', dataImg)
            this.setState({
                linkImg: LINKIMG + dataImg
            }, () => {
                this.UpdateAvt()
            })
        })
    }
    UpdateAvt () {

        const { callApiUpdateProfile, InfoUser } = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        callApiUpdateProfile(InfoUser[0].ProfileID,InfoUser[0].UserID, "Avatar", this.state.linkImg ).then(dataRes => {
            data = JSON.parse(dataRes);
            console.log('upload thanh cong', data)
        })
    }
    render (){
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={styles.image_circle}
            />

        const { infoCuDan, InfoUser } = this.props;
        if (infoCuDan.length <= 0 || InfoUser.length <= 0) {
            return null;
        }
        console.log('infoBQL', infoCuDan)
        return(
            <View style = {stylesContainer.container}>
                <View style = {{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    {
                        this.state.isCheck ? <TouchableOpacity onPress={this.show.bind(this)}>
                            <Image style={styles.image_circle}
                                   source={{
                                       uri: InfoUser[0].Avatar == "/Store/lib/noavatar.png" ? LINKIMG + "/Store/lib/noavatar.png" : InfoUser[0].Avatar
                                   }}
                                   resizeMode="cover"
                            >
                            </Image>
                        </TouchableOpacity> : img
                    }
                    <Text style = {{marginTop:20, fontSize: 20}}>{infoCuDan[0].FullName}</Text>
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
                    <Text style = {styles.textL}>Chức vụ: </Text>
                    <TextInput
                        value = {this.state.ChucVu}
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
                    <Text style = {styles.textL}>Giới tính: </Text>
                    <TextInput
                        value = {this.state.GioiTinh}
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
                    <Text style = {styles.textL}>Số điện thoại: </Text>
                    <TextInput
                        value = {this.state.SoDT}
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
                    <Text style = {styles.textL}>Số Hotline BQL: </Text>
                    <TextInput
                        value = {this.state.SoHotlineQBL}
                        underlineColorAndroid={this.state.underline}
                        editable={false}
                        selectTextOnFocus={false}
                        style = {styles.textinput}/>
                </View>
                <View style = {styles.viewcon}>
                    <Text style = {styles.textL}>Ngày tham gia: </Text>
                    <TextInput
                        value = {this.state.NgayThamGia}
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
        infoCuDan: state.NhaCuDanReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImage: bindActionCreators(callApiUploadImage, dispatch),
        callApiUpdateProfile: bindActionCreators(callApiUpdateProfile, dispatch),
    }
};

ThongTinCaNhanCuDan = connect(mapStateToProps, mapDispatchToProps)(ThongTinCaNhanCuDan);
export default ThongTinCaNhanCuDan;
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
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,
        borderRadius: DEVICE_WIDTH / 6,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 20

    }
})