import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import moment from 'moment';
class SuCoItemBQL extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
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
                        <View style = {{flexDirection:'column', flex:1, marginLeft:20, justifyContent:'center'}}>
                            <Text>
                                {item.Content}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                {item.FullName}
                            </Text>
                        </View>
                        <View style = {{flexDirection:'column', flex:1, marginLeft:20, justifyContent:'center'}}>
                            <Text>
                                {moment(new Date(item.CreatedDate)).format("LT")}
                            </Text>
                            <Text  style = {{marginTop:5}}>
                                {moment(new Date(item.CreatedDate)).format("L")}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

    }
}
export default SuCoItemBQL;
const styles = StyleSheet.create({
    Img : {
        flex:1,
        height:100
    }
})