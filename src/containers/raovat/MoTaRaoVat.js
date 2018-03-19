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

class MoTaRaoVat extends Component {
    constructor(props){
        super(props)
        this.state = {
            MoTa: '',
        }

    }
    TiepTucRaoVat =()=> {
        this.props.navigation.navigate('KhuVucRaoVat')
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <TextInput placeholder = 'Mô tả rao vặt'
                           underlineColorAndroid="#FF9800"
                           onChangeText = {(MoTa)=>this.setState({MoTa})}
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
export default MoTaRaoVat
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