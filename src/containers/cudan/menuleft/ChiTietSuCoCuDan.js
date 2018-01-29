import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity

} from 'react-native';
import stylesContainer from "../../../components/style";

class ChiTietSuCoCuDan extends Component {
    render () {
        return(
            <View style = {stylesContainer.container}>
                <TouchableOpacity onPress = { () => this.props.navigation.navigate('BaoSuCoMoi')}>
                    <Text style = {{color: 'black', textDecorationLine: "underline", marginTop:10, marginBottom:10, marginRight: 20}}>
                        Báo sự cố mới
                    </Text>
                </TouchableOpacity>
                <View style = {{flexDirection:'row', height:100, alignItems:'center'}}>
                    <Image style = {styles.Img}
                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"></Image>
                    <View style = {{flexDirection:'column', flex:2, marginLeft:20, justifyContent:'center'}}>
                        <Text>
                            Nội dung
                        </Text>
                        <Text style = {{marginTop:5}}>
                            10h:20
                        </Text>
                        <Text style = {{marginTop:5}}>
                           16/01/2018
                        </Text>
                        <Text style = {{marginTop:5}}>
                            Đang hoạt động
                        </Text>


                    </View>
                </View>
            </View>
        );
    }
}
export default ChiTietSuCoCuDan;
const styles = StyleSheet.create({
    Img : {
        flex:1,
        height:100
    }
})