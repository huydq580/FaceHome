import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import stylesContainer from "../../components/style";
import Dimensions from 'Dimensions';

class GiaRaoVat extends Component {
    constructor(props){
        super(props)
        this.state = {
            Gia: '',
        }

    }
    TiepTucRaoVat =()=> {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate('TieuDeRaoVat',
            {
                danhMuc:params.danhMuc,
                name: params.name,
                BanDangTin: params.BanDangTin,
                BanLa: params.BanLa,
                tenVung: params.tenVung,
                maVung: params.maVung,
                linkImg: params.linkImg,
                Tinh: params.Tinh,
                Gia: this.state.Gia,
            })
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <TextInput placeholder = 'Giá'
                           underlineColorAndroid="#FF9800"
                           keyboardType={'numeric'}
                           onChangeText = {(Gia)=>this.setState({Gia})}
                style = {{marginLeft: 15, marginTop:10}}/>
                <View style = {styles.TiepTucView}>
                    <TouchableOpacity onPress = {this.TiepTucRaoVat}>
                     <Text style = {styles.TiepTucText}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default GiaRaoVat
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    TiepTucView: {
        height: DEVICE_HEIGHT/11,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF9800'

    },
    TiepTucText: {
        fontWeight:'bold',
        color: 'white'
    }
})