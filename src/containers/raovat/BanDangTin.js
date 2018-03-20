import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import stylesContainer from "../../components/style";
import Dimensions from 'Dimensions';

class BanDangTin extends Component {
    TiepTucRaoVat =()=> {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate('KhuVucRaoVat',
            {
                danhMuc:params.danhMuc,
                name: params.name
            })
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <View style = {{ flexDirection:'column'}}>
                    <View style = {{marginHorizontal:10, marginTop: 10,
                        height:  DEVICE_HEIGHT/12, borderWidth:1, borderColor:'#BDBDBD', justifyContent:'center'}}>
                        <Text stytle = {{fontSize:16, marginLeft: 15}}>Cần bán</Text>

                    </View>
                    <View style = {{ marginHorizontal:10,
                        height:  DEVICE_HEIGHT/12, borderWidth:1, borderColor:'#BDBDBD', justifyContent:'center'}}>
                        <Text  stytle = {{fontSize:16, marginLeft: 15}}>Cần Mua</Text>

                    </View>
                </View>
                <View style = {styles.TiepTucView}>
                    <TouchableOpacity onPress = {this.TiepTucRaoVat}>
                        <Text style = {styles.TiepTucText}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default BanDangTin
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