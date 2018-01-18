import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import stylesContainer from "../../../components/style";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { callApiInfoKDT } from "../../../actions/actionsBQL/KDTInfoActions";

class ThongTinKhuDoThi extends Component {
    GetInfoKDT (){
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        // console.log('userbql', UserBQL.payload[0])
        const { callApiInfoKDT } = this.props;
        callApiInfoKDT(100, 1, UserBQL.payload[0].KDTID, UserBQL.payload[0].Type, 0).then(dataKDTInfo => {
            console.log('dataInfo', dataKDTInfo)

        })
        this.props.navigation.navigate('ChiTietThongTinKDT')
    }
    render (){
        return (
            <View style = {stylesContainer.container}>
                <View style = {styles.viewCha}>
                    <View style = {styles.viewCon}>
                        <TouchableOpacity onPress = {() => this.GetInfoKDT()}>
                            <Text style = {styles.text}>Giới thiệu chung - Quy định khu đô thi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Thông tin khác ban quản lí</Text>
                    </View>
                </View>
                <View style = {styles.viewCha}>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Trạm y tế, trường mầm non, tiểu học, trung học cơ sở, trung học phổ thông</Text>
                    </View>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Thủ tục đăng kí tạm trú tạm vắng</Text>
                    </View>
                </View>
                <View style = {styles.viewCha}>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}>Cơ quan hành chính sự nghiệp</Text>
                    </View>
                    <View style = {styles.viewCon}>
                        <Text style = {styles.text}></Text>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
        // infoBQL: state.NhaBQLReducers
        infonha: state.KDTInfoReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        callApiInfoKDT: bindActionCreators(callApiInfoKDT, dispatch)
    }
};

ThongTinKhuDoThi = connect(mapStateToProps, mapDispatchToProps)(ThongTinKhuDoThi);
export default ThongTinKhuDoThi;
const styles = StyleSheet.create({
    viewCha: {
        flex:1,
        flexDirection:'row'
    },
    viewCon: {
        flex:1,
        margin:20,
        backgroundColor: '#448AFF',
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        color: 'white',
        fontSize: 15
    }
})
