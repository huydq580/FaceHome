import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import stylesContainer from "../../../components/style";

export default class BanQuanLy extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [
                {stt: 1, Ten: 'Nguyễn Văn A', ChucVu: 'Thành viên BQL', Status: 'Hoạt động'},
                {stt: 2, Ten: 'Nguyễn Văn B', ChucVu: 'Trưởng BQL', Status: 'Hoạt động'},
                {stt: 3, Ten: 'Nguyễn Văn C', ChucVu: 'Trưởng BQL', Status: 'Hoạt động'},
                {stt: 4, Ten: 'Nguyễn Văn D', ChucVu: 'Thành viên BQL', Status: 'Dừng hoạt '}
                ],


        }
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style = {stylesContainer.container}>
                <View style = {{alignItems:'center', marginTop: 30}}>
                    <Text style = {{color:'red'}}>Danh sách ban quản lí KĐT[ABC]</Text>
                </View>
                <FlatList
                    style = {{marginTop:20}}
                    data = {this.state.data}
                    renderItem = {({item}) =>
                        <TouchableOpacity onPress = {()=> navigate('ChiTietThanhVienBQL')}>
                            <View style = {{flexDirection:'row', marginTop: 30,}}>
                                <View style = {{flex:1, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.stt}</Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.Ten}</Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.ChucVu}</Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.Status}</Text>
                                </View>

                            </View>

                        </TouchableOpacity>

                    }
                    keyExtractor={(item, index) => index}
                />
                <View style = {{marginBottom:200, marginLeft:150}}>
                    <TouchableOpacity onPress = {()=> navigate('TaoThanhVienBQL')}>
                        <Text style = {{color: 'red'}}>Tạo tài khoản thành viên BQL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textItem: {
        color: 'black',
    }
})

