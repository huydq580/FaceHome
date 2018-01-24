import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Picker,Alert,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RegisterCuDan, URL} from "../../components/Api";
import stylesContainer from "../../components/style";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NhapThongTinChiTietCuDan extends Component {
    constructor(props){
        super(props)
        dataTangLau = ['Chọn Tầng Lầu','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
        this.state = {
            dataToa: [{Code: "", Ten:"Chọn tòa nhà"}],
            ToaNha:'',
            Tang:'',
            soNha:'',
            hoTen:'',
            soDT:'',
            matKhau:'',
            showPass: true,
            press: false,
        }
        this.showPass = this.showPass.bind(this);
    }
    showPass() {
        this.state.press === false ? this.setState({showPass: false, press: true}) : this.setState({
            showPass: true,
            press: false
        });
    }
    RegisterDanCu(){
        const { params } = this.props.navigation.state;
        // console.log('wtf', params.GetKDT.Value)
        fetch(URL + RegisterCuDan, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ho_ten: this.state.hoTen,
                so_dien_thoai: this.state.soDT,
                mat_khau: this.state.matKhau,
                kdt_id: params.Item.KDTID,
                block_code: this.state.ToaNha,
                tang: this.state.Tang,
                so_nha: this.state.soNha,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                data = JSON.parse(dataRes);
                // console.log('dataLogin', data)
                if(data.IsError === false && data.ErrorCode === "00"){
                    Alert.alert(
                        'Alert Title',
                        'Đăng kí thành công',
                        [
                            {text: 'Ok', onPress: () => {this.props.navigation.navigate('DangNhap')}},
                        ],
                        { cancelable: false }
                    )
                    // this.props.navigation.navigate('SanhChinh')
                }
                else {
                    Alert.alert(
                        'Error',
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
    componentWillMount(){
        const { params } = this.props.navigation.state;
        dataToaNha = params.GetKDT
        this.setState({
            dataToa: dataToaNha
        })
    }
    render (){
       dataToa = this.state.dataToa;
       console.log('dataToa', dataToa)

        return (
            <KeyboardAwareScrollView
                style={stylesContainer.container}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <ScrollView>
                    {/*khong co du lieu se co loi*/}
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.ToaNha}
                        onValueChange={(value) => this.setState({ToaNha: value})}>
                        {dataToa.map((value)=><Picker.Item key ={value} label={value.Ten} value={value.Code}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.Tang}
                        onValueChange={(value) => this.setState({Tang: value})}>
                        {dataTangLau.map((value)=><Picker.Item key ={value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số nhà '
                                underlineColorAndroid="transparent"
                                onChangeText = {(soNha) => this.setState({soNha})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Họ tên '
                               underlineColorAndroid="transparent"
                               onChangeText = {(hoTen) => this.setState({hoTen})}/>
                </View>
                    <View style = {styles.itemBoder}>
                        <TextInput placeholder = 'Nhập số điện thoại'
                                   underlineColorAndroid="transparent"
                                   keyboardType={'numeric'}
                                   onChangeText = {(soDT)=>this.setState({soDT})}/>
                    </View>
                    <View style = {styles.itemBoder}>
                        <TextInput placeholder = 'Nhập mật khẩu'
                                   secureTextEntry={this.state.showPass}
                                   underlineColorAndroid="transparent"
                                   onChangeText = {(matKhau)=>this.setState({matKhau})}/>
                    </View>
                    <View style = {{alignItems:'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={this.showPass}
                                          style = {{marginTop:10}}>
                            <Text>Hiển thị mật khẩu</Text>
                        </TouchableOpacity>
                    </View>


                <TouchableOpacity onPress = {() => this.RegisterDanCu()}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{alignItems:'center', justifyContent: 'center', marginTop:10}}>
                        <Text>Một mã xác thực sẽ được gửi tới sđt của bạn!</Text>
                </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        )
        // return (
        //     <View>
        //         <Text>dm</Text>
        //         <Text>dm</Text>
        //     </View>
        // )
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,  
        marginHorizontal: 30, 
        marginTop:20,
    },
    
    
})