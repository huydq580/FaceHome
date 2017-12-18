import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import _ from 'lodash';
import {URL, URL_GETDATA} from "../components/Api";

export default class DangKi extends Component {
    constructor(props){
        super(props)
        this.state = {
            TaiKhoan : '',
            TinhThanh: '',
            QuanHuyen: '',
            dataTinhThanh : '',
            dataQuanHuyen : ''

        }
    }
    componentWillMount () {
        //call api tỉnh
        fetch( URL + URL_GETDATA,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ma_vung: "", option: 0, lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataTinh)=> {
                data = JSON.parse(dataTinh);
                //  console.log('datatinh', data)
                //tạo mảng mới chỉ có TenVung
                // let arr = [];
                // data.Value.forEach((item)=>{
                //     arr.push(item.TenVung)
                // })
                this.setState({
                    dataTinhThanh: data.Value,
                })
                // console.log('arr', this.state.dataTinhThanh)
                // this.setState({
                //     dataTinhThanh : data.Value
                // })

            }).catch((erro)=> {
            console.log('erro',erro);
        })
    }
    CallApiQuanHuyen(maVung){
        fetch(URL + URL_GETDATA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ma_vung: maVung,
                option: 1,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataQuan)=> {
                data1 = JSON.parse(dataQuan);
                this.setState({
                    dataQuanHuyen: data1.Value,
                })
                // console.log('arr1', this.state.dataQuanHuyen)
            }).catch((erro)=> {
            console.log('erro',erro);
        })
    }
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

    renderGiaoDien(){
        //gán giá trị data
        let dataTinhThanh = _.values(this.state.dataTinhThanh)
        let dataQuanHuyen = _.values(this.state.dataQuanHuyen)
        // console.log('rendergiaodien', dataTinhThanh)
        //gán giá trị tài khoản
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
                        <TextInput placeholder = 'Nhập tên KĐT'
                                   underlineColorAndroid="transparent"/>
                    </View>
                    <View style = {{alignItems: 'center', marginTop: 10}}>
                        <Text>Tìm kiếm</Text>
                    </View>
                    {/* // listview các tòa nhà  */}
                    <View style = {[styles.itemBoder, {minHeight: 100}]}>
                        <Text>ListView Các Khu Đô Thị</Text>

                    </View>

                </View>
            )
        }
        else if(TaiKhoan ==='key3'){
            return(
                <View>
                    <View style = {styles.itemBoder}>
                        <TextInput placeholder = 'Nhập số điện thoại'
                                   underlineColorAndroid="transparent"/>
                    </View>
                    <View style = {styles.itemBoder}>
                        <TextInput placeholder = 'Nhập mật khẩu'
                                   underlineColorAndroid="transparent"/>
                    </View>
                    <View style = {{alignItems:'center', justifyContent: 'center'}}>
                        <Text>Hiển thị mật khẩu</Text>
                    </View>

                </View>
            )
        }
    }
    DangKiGiaoDien(){
        let TaiKhoan = this.state.TaiKhoan;
        if (TaiKhoan === 'key1'){
            this.props.navigation.navigate('TaoThongTinKDT')

        }
        else if (TaiKhoan === 'key2'){
            this.props.navigation.navigate('NhapThongTinChiTiet')

        }
        else if (TaiKhoan === 'key3'){
            this.props.navigation.navigate('NhapThongTinNCC')

        }
    }
    render (){
        return(
            <View>
                <View style = {styles.itemBoder}>
                    {this.renderTaiKhoan()}
                </View>
                {this.renderGiaoDien()}
                <TouchableOpacity onPress = {() => this.DangKiGiaoDien()}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },


})