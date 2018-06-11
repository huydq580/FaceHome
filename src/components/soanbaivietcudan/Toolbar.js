import React, { Component } from 'react';
import {
    View,
    Text, Keyboard,
    TouchableOpacity, StyleSheet,

} from 'react-native'
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Toolbar extends Component {
    render () {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: 50,
                minHeight: 30,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress = {() => {
                    this.setState({
                        isCheck:true

                    })
                    Keyboard.dismiss()
                }}>
                    <View style = {{marginLeft: 10, borderWidth:1, height: 25, borderColor:"#E0E0E0", backgroundColor:'#EEEEEE', justifyContent:'center', width:DEVICE_WIDTH/2-20}}>
                        <Text style = {{marginLeft: 5}}>Chọn kiểu bài viết</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{flexDirection:'row'}}>
                    <TouchableOpacity>
                        <Icon name="md-images" size={25} color="#900"
                              style={{flex: 1}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {{marginLeft: 10,marginRight: 10, backgroundColor:'#B3E5FC', borderWidth:1, borderRadius:3, borderColor:'#81D4FA', alignItems:'center', justifyContent:'center', height:25, width:65}}>
                            <Text>Đăng</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },

})