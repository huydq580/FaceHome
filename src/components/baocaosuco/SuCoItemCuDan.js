import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

class SuCoItemCuDan extends Component {
    render (){
        const {item} = this.props.dataItem;
        const {navigation} = this.props;
        return (
            <View style = {{flex:1, marginTop: 20}}>
                <TouchableOpacity onPress = {() => navigation.navigate('ChiTietSuCoCuDan')}>
                    <View style = {{flexDirection:'row', height:100, alignItems:'center'}}>
                        <Image style = {styles.Img}
                               source={{
                                   uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                               }}
                               resizeMode="cover"></Image>
                        <View style = {{flexDirection:'column', flex:2, marginLeft:20, justifyContent:'center'}}>
                            <Text>
                                {item.noidung}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                {item.gio}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                {item.ngay}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                {item.status}
                            </Text>


                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

    }
}
export default SuCoItemCuDan;
const styles = StyleSheet.create({
    Img : {
        flex:1,
        height:100
    }
})