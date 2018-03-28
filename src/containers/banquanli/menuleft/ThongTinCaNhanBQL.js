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
            check: true


        }
        this.toggleEditable = this.toggleEditable.bind(this)
        this.UpdateProfile = this.UpdateProfile.bind(this)
    }
    componentWillMount(){
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        {
            InfoUser[0].Gender = 0 ? this.setState({GioiTinh: 'Nữ'}) :
                InfoUser[0].Gender = 1 ? this.setState({GioiTinh: 'Nam'}) : null
        }
        {
            InfoUser[0].Position = 1 ? this.setState({ChucVu: 'Trưởng BQL'}) :
                InfoUser[0].Position = 2 ? this.setState({ChucVu: 'Thành viên BQL'}) : null
        }

        this.setState({
            Ten: InfoUser[0].FullName ,
            NgaySinh: moment(new Date(InfoUser[0].BirdDate)).format("L"),
            SoCMT: InfoUser[0].CMND,
            SoDT: InfoUser[0].Phone,
            Email: InfoUser[0].Email,
            SoHotlineQBL: InfoUser[0].HotLine,
            NgayThamGia: moment(new Date(InfoUser[0].CreatedTime)).format("L"),

        })
    }
    toggleEditable() {
        this.setState({
            check: false,
            editable: true
        })



    }
    UpdateProfile(){
        this.setState({
            check: true,
            editable: true
        })
        const { callApiUpdateProfile,  InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        console.log('user', InfoUser)

        callApiUpdateProfile(InfoUser[0].ProfileID, InfoUser[0].UserID,'FullName', this.state.Ten).then(dataRes => {
            console.log('datathongbao', dataRes)
        })
        console.log('ten', this.state.Ten)
    }
    render (){
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        return(
            <ScrollView style = {stylesContainer.container}>
                <View style = {{flexDirection:'column', alignItems:'center'}}>
                    <Image style={styles.image_circle}

                           source={{
                               uri: InfoUser[0].Avatar
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <Text style = {{marginTop:10, fontSize: 20}}>{InfoUser[0].FullName}</Text>
                </View>
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
        callApiUpdateProfile: bindActionCreators(callApiUpdateProfile, dispatch)
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