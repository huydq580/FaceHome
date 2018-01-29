import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Picker,
    TextInput,
    Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import stylesContainer from "../../../components/style";
import {PostSuco, URL} from "../../../components/Api";

class BaoSuCoMoi extends Component {
    constructor(props){
        super(props)
        this.state = {
            SuCo: '',
            NoiDung: '',
        }
    }
    BaoSuCoMoi(){
        const { UserCuDan } = this.props;
        if (UserCuDan<=0){
            return null;
        }
        // console.log('UserCuDan', UserCuDan)
        fetch( URL+ PostSuco,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                kdt_id: UserCuDan.payload[0].KDTID,
                user_id: UserCuDan.payload[0].UserID,
                full_name: UserCuDan.payload[0].FullName,
                avatar: "",
                ten_can_ho: 1002,
                media: "",
                type: this.state.SuCo,
                post_content: this.state.NoiDung,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
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

            }).catch((erro)=> {
            console.log('erro',erro);
        })
    }
    render () {
        return(
            <View style = {stylesContainer.container}>
                <Picker
                    selectedValue={this.state.SuCo}
                    onValueChange={(itemValue, itemIndex) => this.setState({SuCo: itemValue})}>
                    <Picker.Item label = {'Tất cả'} value = ''/>
                    <Picker.Item label = {'Nhà riêng'} value = {'1'}/>
                    <Picker.Item label = {'Công cộng'} value ={'2'}/>
                </Picker>
                <View style = {[styles.itemBoder, {minHeight:120}]}>
                    <TextInput placeholder = 'Nhập nội dung và ảnh sự cố tại đây'
                               underlineColorAndroid="transparent"
                               onChangeText ={(NoiDung)=> this.setState({NoiDung})}/>
                </View>
                <TouchableOpacity onPress = {this.BaoSuCoMoi.bind(this)}>
                    <View style = {{borderWidth:1, height:30, width:50,marginTop: 20, marginLeft:30,justifyContent:'center',alignItems:'center', backgroundColor: '#82B1FF'}}>
                        <Text>Gửi</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserCuDan: state.LoginReducers,
        infoCuDan: state.NhaCuDanReducers
    }
};

BaoSuCoMoi = connect(mapStateToProps)(BaoSuCoMoi);
export default BaoSuCoMoi;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
        borderColor:'#9E9E9E',
        justifyContent:'center',
        // alignItems:'center'
    },
})