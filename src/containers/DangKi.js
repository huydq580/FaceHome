import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert
} from 'react-native'
import _ from 'lodash';
import {
    GetData, GetKDTParts, RegisterNCC, Search, URL,
} from "../components/Api";
import stylesContainer from "../components/style";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {callApiTinh} from "../actions/TinhThanhActions";
import {callApiQuanHuyen} from "../actions/QuanHuyenActions";
import {callApiGetKDT, callApiSearchKDT} from "../actions/KDTActions";

class DangKi extends Component {
    constructor(props){
        super(props)
        this.state = {
            TaiKhoan : '',
            TinhThanh: '',
            QuanHuyen: '',
            dataTinhThanh :  [{MaVung: "", TenVung: 'Chọn Tỉnh/Thành'}],
            dataQuanHuyen : [{MaVung: "", TenVung: 'Chọn Quận/Huyện'}],
            keyword : '',
            dataKDT: '',
            item: '',
            SoDienThoai: '',
            MatKhau: '',
            showPass: true,
            press: false,


        }
        this.ClickItem = this.ClickItem.bind(this);
        this.showPass = this.showPass.bind(this);
    }
    showPass() {
        this.state.press === false ? this.setState({showPass: false, press: true}) : this.setState({
            showPass: true,
            press: false
        });
    }
    componentWillMount() {
        //call api tỉnh
        const { callApiTinh } = this.props;
        callApiTinh().then(dataTinh => {
            dataTinh = JSON.parse(dataTinh);
            dataTinh1 = dataTinh.Value;
            dataTinh1.unshift({MaVung: "", TenVung: 'Chọn Tỉnh/Thành'});
            this.setState({
                dataTinhThanh: dataTinh1
            })
        })

    }
    //call api Quan huyen
    CallApiQuanHuyen(maVung){
        const { callApiQuanHuyen } = this.props;
        callApiQuanHuyen(maVung).then(dataQuanHuyen => {
            dataQuanHuyen = JSON.parse(dataQuanHuyen);
            dataQuanHuyen1 = dataQuanHuyen.Value;
            dataQuanHuyen1.unshift({MaVung: "", TenVung: 'Chọn Quận/Huyện'});
            this.setState({
                dataQuanHuyen: dataQuanHuyen1
            })
        })
    }

    //api tim kiem KDT
    CallApiTimKiem(){
        const { callApiSearchKDT } = this.props;
        callApiSearchKDT(this.state.keyword,this.state.QuanHuyen,).then(dataRes  => {
            data2 = JSON.parse(dataRes);
            this.setState({
                dataKDT : data2.Value
            })
        })
    }
    // Api dang ki tai khoan ncc
    RegisterNCC(){
        fetch(URL + RegisterNCC , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                so_dien_thoai: this.state.SoDienThoai,
                mat_khau: this.state.MatKhau,
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
                            {text: 'Ok', onPress: () => {this.props.navigation.navigate('NhapThongTinNCC', {Value:data, SDT: this.state.SoDienThoai})}},
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
    //call api lay thong tin KDT
    GetKDTParts(){
        let item =_.assign(this.state.item);
        console.log('kdt',item.KDTID )
        const { callApiGetKDT } = this.props
        callApiGetKDT(item.KDTID).then(dataRes => {
            dataGetKDT = JSON.parse(dataRes);
            dataGetKDT = dataGetKDT.Value;
            console.log('hihi', dataGetKDT)
            this.props.navigation.navigate('NhapThongTinChiTietCuDan', { GetKDT: dataGetKDT, Item: item})
        })
    }
    //click item
    ClickItem(item){
        this.setState({
            item: item,
            keyword: item.TenKDT,

        })
        // console.log('Keyword', this.state.item)
    }
    //chon 1 trong 3 loai tai khoan bql, ncc, dan cu
    renderTaiKhoan(){
        return(
            <Picker
                selectedValue={this.state.TaiKhoan}
                onValueChange={(itemValue, itemIndex) => this.setState({TaiKhoan: itemValue})}>
                <Picker.Item label = {'Chọn loại tài khoản muốn tạo'} value = ''/>
                <Picker.Item label = {'Ban quản lí tòa nhà'} value ={'key1'}/>
                <Picker.Item label = {'Dân cư'} value ={'key2'}/>
                <Picker.Item label = {'Nhà cung cấp dịch vụ hàng hóa'} value ={'key3'}/>
            </Picker>
        )
    }
    //giao dien dang ki bql hoac cu dan
    renderGiaoDienTaiKhoan(){
        dataQuanHuyen = this.state.dataQuanHuyen;
        dataTinhThanh = this.state.dataTinhThanh;
        let TaiKhoan = this.state.TaiKhoan;
        if(TaiKhoan==='key1' || TaiKhoan ==='key2'){
            return(
                <View>
                    <View style = {styles.itemBoder}>
                        <Picker
                            selectedValue={this.state.TinhThanh}
                            onValueChange={(value) => {
                                this.setState({TinhThanh: value});
                                this.CallApiQuanHuyen(value);
                            }}>
                            {dataTinhThanh.map((value) => <Picker.Item key = {value.MaVung} label={value.TenVung} value={value.MaVung}/>)}
                        </Picker>
                    </View>
                    <View style = {styles.itemBoder}>
                        <Picker
                            selectedValue={this.state.QuanHuyen}
                            onValueChange={(value) => this.setState({QuanHuyen: value})}>
                            {dataQuanHuyen.map((value) => <Picker.Item key ={value.MaVung} label={value.TenVung} value={value.MaVung}/>)}
                        </Picker>
                    </View>
                    <View style = {styles.itemBoder}>
                        <TextInput
                                   placeholder = 'Nhập tên KĐT'
                                   underlineColorAndroid="transparent"
                                   value={this.state.keyword}
                                   onChangeText = {(keyword) => this.setState({keyword})}
                        />
                    </View>
                    <View style = {{alignItems: 'center', marginTop: 10}}>
                        <TouchableOpacity onPress = {this.CallApiTimKiem.bind(this)}>
                            <Text>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </View>
                    {/* // listview các tòa nhà  */}
                    <View style = {[styles.itemBoder, {height: 150}]}>
                        <FlatList
                            data = {this.state.dataKDT}
                            renderItem = {({item}) =>
                                <TouchableOpacity onPress = {()=> this.ClickItem(item)}>
                                    <View style = {{margin: 10}}>
                                        <Text>{item.TenKDT}</Text>
                                    </View>
                                </TouchableOpacity>


                        }
                            keyExtractor={(item, index) => index}
                            // ItemSeparatorComponent = {this.renderSeparator}
                        />

                    </View>
                    <TouchableOpacity onPress = {() => this.DangKiGiaoDien()}>
                        <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                            <Text>Tiếp tục</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            )
        }
        //giao dien tai khoan nha cung cap
        else if(TaiKhoan ==='key3'){
            return(
                <View>
                    <View style = {styles.itemBoder}>
                        <TextInput placeholder = 'Nhập số điện thoại'
                                   underlineColorAndroid="transparent"
                                   keyboardType={'numeric'}
                                   onChangeText = {(SoDienThoai)=>this.setState({SoDienThoai})}/>
                    </View>
                    <View style = {styles.itemBoder}>
                        <TextInput placeholder = 'Nhập mật khẩu'
                                   secureTextEntry={this.state.showPass}
                                   underlineColorAndroid="transparent"
                                   onChangeText = {(MatKhau)=>this.setState({MatKhau})}/>
                    </View>
                    <View style = {{alignItems:'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={this.showPass}
                                          style = {{marginTop:10}}>
                            <Text>Hiển thị mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress = {() => this.DangKiGiaoDien()}>
                        <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                            <Text>Tiếp tục</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    DangKiGiaoDien(){
        let TaiKhoan = this.state.TaiKhoan;
        let item =_.assign(this.state.item);
        if (TaiKhoan === 'key1'){
            this.props.navigation.navigate('NhapThongTinChiTiet',{itemKDT: item})
            // for(let i = 0; i< dataKDT.length; i++) {
            //     if (key === (dataKDT[i].TenKDT)) {
            //         this.props.navigation.navigate('NhapThongTinChiTiet')
            //     }
            //     else {
            //         this.props.navigation.navigate('TaoThongTinKDT')
            //     }
            // }


        }
        else if (TaiKhoan === 'key2'){
            this.GetKDTParts()

        }
        else if (TaiKhoan === 'key3'){
            this.RegisterNCC()

        }
    }
    render (){
        return(
            <View style = {stylesContainer.container}>
                <View style = {styles.itemBoder}>
                    {this.renderTaiKhoan()}
                </View>
                {this.renderGiaoDienTaiKhoan()}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dataLocationTinh: state.TinhThanhReducers,
        dataLocationHuyen: state.QuanHuyenReducers,
        // infoBQL: state.NhaBQLReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiTinh: bindActionCreators(callApiTinh, dispatch),
        callApiQuanHuyen: bindActionCreators(callApiQuanHuyen, dispatch),
        callApiSearchKDT: bindActionCreators(callApiSearchKDT, dispatch),
        callApiGetKDT: bindActionCreators(callApiGetKDT, dispatch)
    }
};

DangKi = connect(mapStateToProps, mapDispatchToProps)(DangKi);
export default DangKi;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },


})