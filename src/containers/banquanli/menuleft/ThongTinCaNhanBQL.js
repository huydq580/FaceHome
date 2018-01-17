import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";

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
        }
    }
    componentWillMount(){
        const { infoBQL } = this.props;
        if (infoBQL.length <= 0) {
            return null;
        }

        this.setState({
            Ten: infoBQL[0].FullName ,
            ChucVu: infoBQL[0].FullName,
            NgaySinh: infoBQL[0].BirdDate,
            GioiTinh: infoBQL[0].FullName,
            SoCMT: infoBQL[0].CMND,
            SoDT: infoBQL[0].Phone,
            Email: infoBQL[0].Email,
            SoHotlineQBL: infoBQL[0].HotLine,
            NgayThamGia: infoBQL[0].CreatedTime,
        })
    }
    render (){
        const { infoBQL } = this.props;
        if (infoBQL.length <= 0) {
            return null;
        }
        // console.log('infoBQL', infoBQL[0])
        return(
            <View style = {stylesContainer.container}>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                    <View style = {styles.circle}>
                        <Text>Avatar</Text>
                    </View>
                    <Text style = {{color:'red', fontSize: 20}}>{infoBQL[0].FullName}</Text>
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
        infoBQL: state.NhaBQLReducers,
        dm: state.BQLReducers
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // addTodo: bindActionCreators(addTodo, dispatch),
//         callApiNha: bindActionCreators(callApiNha, dispatch)
//     }
// };

ThongTinCaNhanBQL = connect(mapStateToProps)(ThongTinCaNhanBQL);
export default ThongTinCaNhanBQL;
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