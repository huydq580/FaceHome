import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NhapThongTinChiTietCuDan extends Component {
    constructor(props){
        super(props)
        dataTN = ['Ban Quản Lí', 'Cư Dân', 'Nhà Cung Cấp', 'Khách']
        dataTangLau = ['Ba  n Quản Lí', 'Cư Dân', 'Nhà Cung Cấp', 'Khách']
        this.state = {
            selected:''
        }
    }
    render (){
        console.log('Cu dan')
        return (
            <View>
                <View style = {styles.itemBoder}>
                <Picker
                    selectedValue={this.state.selected}
                    onValueChange={(value) => this.setState({selected: value})}>
                    {dataTN.map((value)=><Picker.Item key ={value} label={value} value={value}/>)}
                </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.selected}
                        onValueChange={(value) => this.setState({selected: value})}>
                        {dataTangLau.map((value)=><Picker.Item key ={value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số nhà '
                                underlineColorAndroid="transparent"  />
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Họ tên '
                                />
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập số điện thoại'
                            underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu'
                               underlineColorAndroid="transparent" />
                </View>
                <TouchableOpacity>
                    <View style = {{alignItems:'center', justifyContent: 'center', marginTop:10}}>
                        <Text>Hiển thị mật khẩu</Text>
                    </View>
                </TouchableOpacity>

                
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('SideMenu')}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{alignItems:'center', justifyContent: 'center', marginTop:10}}>
                        <Text>Một mã xác thực sẽ được gửi tới sđt của bạn!</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,  
        marginHorizontal: 30, 
        marginTop:20,
    },
    
    
})