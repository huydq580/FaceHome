import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Picker,
    TextInput
} from 'react-native';
import stylesContainer from "../../../components/style";

class BaoSuCoMoi extends Component {
    constructor(props){
        super(props)
        this.state = {
            SuCo: '',
            NoiDung: '',
        }
    }
    BaoSuCoMoi(){

    }
    render () {
        return(
            <View style = {stylesContainerc.container}>
                <Picker
                    selectedValue={this.state.SuCo}
                    onValueChange={(itemValue, itemIndex) => this.setState({SuCo: itemValue})}>
                    <Picker.Item label = {'Tất cả'} value = ''/>
                    <Picker.Item label = {'Nhà riêng'} value ={'key1'}/>
                    <Picker.Item label = {'Công cộng'} value ={'key2'}/>
                </Picker>
                <View style = {[styles.itemBoder, {minHeight:120}]}>
                    <TextInput placeholder = 'Nhập nội dung và ảnh sự cố tại đây'
                               underlineColorAndroid="transparent"
                               onChangeText ={(NoiDung)=> this.setState({NoiDung})}/>
                </View>
                <TouchableOpacity onPress = {this.BaoSuCoMoi}>
                    <View style = {{borderWidth:1, height:50, width:80, backgroundColor: '#82B1FF'}}>
                        <Text>Gửi</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
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