import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import _ from 'lodash';

export default class DangKi extends Component {
    constructor(props){
        super(props)
        // dataTK = ['Ban quản lí tòa nhà', 'Dân cư', 'Nhà cung cấp dịch vụ hàng hóa']
            // dataTinhThanh = ['']
            // dataQuanHuyen = ['']
        this.state = {
            TaiKhoan : '',

        }
    }
    componentWillMount () {
        //call api tỉnh
        fetch("http://192.168.1.254:9051/api/location/getdata", {
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
            // console.log('datatinh', data)
            //tạo mảng mới chỉ có TenVung
            let arr = [];
            data.Value.forEach((item)=>{
                arr.push(item.TenVung)
            })
            this.setState({
                dataTinhThanh: arr,
            })
            // this.setState({
            //     dataTinhThanh : data.Value
            // })
            console.log('arr', this.state.dataTinhThanh)
        }).catch((erro)=> {
            console.log('erro',erro);
        })
        //call api Quận huyện
        fetch("http://192.168.1.254:9051/api/location/getdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ma_vung: "01", option: 1, lang_name: "vi_VN"
            })
        })
        .then((response) => response.json())
        .then((dataQuan)=> {
            data1 = JSON.parse(dataQuan);
            console.log('dataQuan', data1)
            //tạo mảng mới chỉ có TenVung
            let arr1 = [];
            data1.Value.forEach((item1)=>{
                arr1.push(item1.TenVung)
            })
            this.setState({
                dataQuanHuyen: arr1,
            })
            // this.setState({
            //     dataTinhThanh : data.Value
            // })
            console.log('arr1', this.state.dataQuanHuyen)
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
                            onValueChange={(value) => this.setState({selected: TinhThanh})}>
                            {dataTinhThanh.map((value) => <Picker.Item key ={value} label={value} value={value}/>)}
                        </Picker>
                    </View>
                    <View style = {styles.itemBoder}>
                        <Picker
                            selectedValue={this.state.selected}
                            onValueChange={(value) => this.setState({selected: value})}>
                            {dataQuanHuyen.map((value) => <Picker.Item key ={value} label={value} value={value}/>)}
                        </Picker>
                    </View>
                    <View style = {styles.itemBoder}>
                        <TextInput placeholder = 'Tìm kiếm nhanh tên KĐT ở đây'
                                    underlineColorAndroid="transparent"/>
                    </View>
                    {/* // listview các tòa nhà  */}
                    <View>
                        
                    </View>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('NhapThongTinChiTiet')}>
                        <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                            <Text>Tiếp tục</Text>
                        </View>
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('NhapThongTinChiTiet')}>
                        <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                            <Text>Tiếp tục</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render (){
        return(
            <View>
                <View style = {styles.itemBoder}>
                    {this.renderTaiKhoan()}    
                </View>
                {this.renderGiaoDien()}
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