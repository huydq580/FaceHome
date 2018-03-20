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

class TieuDeRaoVat extends Component {
    constructor(props){
        super(props)
        this.state = {
            TieuDe: '',
        }

    }
    TiepTucRaoVat =()=> {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate('MoTaRaoVat', {
            danhMuc:params.danhMuc,
            name: params.name,
            tenVung: params.tenVung,
            maVung: params.maVung,
            linkImg: params.linkImg,
            Tinh: params.Tinh,
            Gia: params.Gia,
            TieuDe: this.state.TieuDe
        })
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <TextInput placeholder = 'Tiêu đề'
                           underlineColorAndroid="#FF9800"
                           onChangeText = {(TieuDe)=>this.setState({TieuDe})}
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
export default TieuDeRaoVat
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