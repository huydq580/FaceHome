import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';

import stylesContainer from "../../../components/style";
import {ChangePasswordCuDan, URL} from "../../../components/Api";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

class ThayDoiMatKhauCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Thay đổi mật khẩu',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props) {
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            confirmPass: '',
        }
    }

    updatePass() {
        const {InfoUser} = this.props
        if (InfoUser.length <=0 ){
            return null
        }

        if (this.state.newPass !== this.state.confirmPass) {
            Alert.alert(
                'Alert',
                "Mật khẩu không trùng khớp",
                [
                    {text: 'OK',onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
        else {
            fetch(URL + ChangePasswordCuDan, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    ten_dang_nhap: InfoUser[0].Phone,
                    mat_khau_cu: this.state.oldPass,
                    mat_khau_moi: this.state.newPass,
                    lang_name: 'vi_VN'
                })
            })
                .then((response) => response.json())
                .then((dataRes) => {
                    console.log('datapass', dataRes)
                    data = JSON.parse(dataRes);
                    if (data.ErrorCode === "00") {
                        Alert.alert(
                            'Alert',
                            data.Message,
                            [
                                {text: 'OK', onPress: () => this.props.navigation.goBack()},
                            ],
                            {cancelable: false}
                        )
                    }
                    else {
                        Alert.alert(
                            'Alert',
                            data.Message,
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false}
                        )
                    }

                }).catch((erro) => {
                console.log('erro', erro);
            })

        }

    }

    render() {
        return (
            <View style={[stylesContainer.container, {justifyContent: 'center'}]}>
                <View style={styles.itemBoder}>
                    <TextInput placeholder='Nhập mật khẩu cũ'
                               secureTextEntry={true}
                               underlineColorAndroid="transparent"
                               onChangeText={(oldPass) => this.setState({oldPass})}/>
                </View>
                <View style={styles.itemBoder}>
                    <TextInput placeholder='Nhập mật khẩu mới'
                               secureTextEntry={true}
                               underlineColorAndroid="transparent"
                               onChangeText={(newPass) => this.setState({newPass})}/>
                </View>
                <View style={styles.itemBoder}>
                    <TextInput placeholder='Xác nhận mật khẩu mới'
                               secureTextEntry={true}
                               underlineColorAndroid="transparent"
                               onChangeText={(confirmPass) => this.setState({confirmPass})}/>
                </View>
                <TouchableOpacity onPress={this.updatePass.bind(this)}>
                    <View style={[styles.itemBoder, {
                        alignItems: 'center',
                        minHeight: 40,
                        justifyContent: 'center',
                        backgroundColor: '#2196F3',
                        borderRadius: 5
                    }]}>
                        <Text>Cập nhật</Text>
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
    }
};

ThayDoiMatKhauCuDan = connect(mapStateToProps, mapDispatchToProps)(ThayDoiMatKhauCuDan);

export default ThayDoiMatKhauCuDan
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth: 1,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 5,
    },


})
