import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


export default class TrangChuBQL extends Component {
    render(){
        return(
            <View>
                <View style = {[styles.itemBoder, {minHeight: 50, justifyContent: 'center'}]}>
                    <Text>Bản tin số 1</Text>
                </View>
                <View style = {[styles.itemBoder, {minHeight: 50, justifyContent: 'center'}]}>
                    <Text>Bản tin số 2</Text>
                </View>
                <View style = {[styles.itemBoder, {minHeight: 50, justifyContent: 'center'}]}>
                    <Text>Bản tin số 3</Text>
                </View>
                <View style = {[styles.itemBoder, {flexDirection:'row'}]}>
                    <TextInput placeholder = 'Soạn đăng bản tin cho KĐT tại đây'
                               underlineColorAndroid="transparent"
                               style = {{flex:5}}/>
                <View style = {{flex:1, minHeight:50, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style ={{height: 36, width: 55,backgroundColor: "#2196F3"}}>ĐĂNG</Text>
                </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,  
        marginHorizontal: 30, 
        marginTop:10,
    },
    
    
})