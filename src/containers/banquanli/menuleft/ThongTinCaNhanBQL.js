import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import stylesContainer from "../../../components/style";
import {callApiUpdateProfile} from "../../../actions/actionsBQL/UpdateProfileActions";
import PickerImage from "../../../components/PickerImage";
import {callApiUploadImage} from "../../../actions/SoanTinActions";
import {LINKIMG, URL} from "../../../components/Api";

class ThongTinCaNhanBQL extends Component {
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
            editable: false,
            check: true,

            //upload anh
            isCheck:true,
            dataImage: null,
            avatarSource: null,
            linkImg: '',


        }
        this.toggleEditable = this.toggleEditable.bind(this)
        this.UpdateProfile = this.UpdateProfile.bind(this)
    }
    componentWillMount(){
        const {params } = this.props.navigation.state
        console.log('params', params)

        {
            params.InfoBQL[0].Gender = 0 ? this.setState({GioiTinh: 'Nữ'}) :
                params.InfoBQL[0].Gender = 1 ? this.setState({GioiTinh: 'Nam'}) : null
        }
        {
            params.InfoBQL[0].Position = 1 ? this.setState({ChucVu: 'Trưởng BQL'}) :
                params.InfoBQL[0].Position = 2 ? this.setState({ChucVu: 'Thành viên BQL'}) : null
        }

        this.setState({
            Ten: params.InfoBQL[0].FullName ,
            NgaySinh: moment(new Date(params.InfoBQL[0].BirdDate)).format("L"),
            SoCMT: params.InfoBQL[0].CMND,
            SoDT: params.InfoBQL[0].Phone,
            Email: params.InfoBQL[0].Email,
            SoHotlineQBL: params.InfoBQL[0].HotLine,
            NgayThamGia: moment(new Date(params.InfoBQL[0].CreatedTime)).format("L"),

        })
    }
    toggleEditable() {
        this.setState({
            check: false,
            editable: true
        })



    }
    UpdateProfile(){
        const {params } = this.props.navigation.state
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        this.setState({
            check: true,
            editable: true
        })
        const { callApiUpdateProfile } = this.props;

        callApiUpdateProfile(InfoUser[0].ProfileID, InfoUser[0].UserID,'FullName', this.state.Ten).then(dataRes => {
            console.log('datathongbao', dataRes)
        })
        console.log('ten', this.state.Ten)
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
        const {params } = this.props.navigation.state
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={styles.image_circle}
            />
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        return(
            <ScrollView style = {stylesContainer.container}>
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
                <Text style = {{marginTop:20, fontSize: 20}}>{params.InfoBQL[0].FullName}</Text>
                <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 20}}/>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center'}}>
                        <Text style = {styles.textL}>Tên: </Text>
                        <TextInput
                            value = {this.state.Ten}
                            underlineColorAndroid={this.state.underline}
                            editable={this.state.editable}
                            placeholder={this.state.Ten}
                            // selectTextOnFocus={false}
                            style = {styles.textinput}
                            onChangeText = {(Ten) => this.setState({Ten})}/>
                    </View>

                        {
                            this.state.check ?
                                <TouchableOpacity onPress = {this.toggleEditable}>
                                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress = {this.UpdateProfile}>
                                    <Icon name="check" size={25} color="#424242" style = {{marginRight:15}}/>
                                </TouchableOpacity>

                        }
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Chức vụ: </Text>
                        <TextInput
                            value = {this.state.ChucVu}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Ngày Sinh: </Text>
                        <TextInput
                            value = {this.state.NgaySinh}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Giới tính: </Text>
                        <TextInput
                            value = {this.state.GioiTinh}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Số CMT: </Text>
                        <TextInput
                            value = {this.state.SoCMT}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Số điện thoại: </Text>
                        <TextInput
                            value = {this.state.SoDT}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Email: </Text>
                        <TextInput
                            value = {this.state.Email}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Số Hotline BQL: </Text>
                        <TextInput
                            value = {this.state.SoHotlineQBL}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>
                <View style = {styles.viewcon}>
                    <View style = {{flexDirection:'row', alignItems: 'center',}}>
                        <Text style = {styles.textL}>Ngày tham gia: </Text>
                        <TextInput
                            value = {this.state.NgayThamGia}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Icon name="drag" size={25} color="#424242" style = {{marginRight:15}}/>
                </View>


            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        dm: state.BQLReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUpdateProfile: bindActionCreators(callApiUpdateProfile, dispatch),
        callApiUploadImage: bindActionCreators(callApiUploadImage, dispatch),
    }
};

ThongTinCaNhanBQL = connect(mapStateToProps, mapDispatchToProps)(ThongTinCaNhanBQL);
export default ThongTinCaNhanBQL;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    // circle: {
    //     marginTop: 15,
    //     marginLeft: 15,
    //     width: 100,
    //     height: 100,
    //     borderRadius: 100/2,
    //     backgroundColor: '#42A5F5',
    //     alignItems: 'center',
    //     justifyContent:'center'
    // },
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,
        borderRadius: DEVICE_WIDTH / 6,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    },
    viewcon: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent:'space-between'
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