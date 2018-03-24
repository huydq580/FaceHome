import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity, StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';

class ItemSearchRaoVat extends Component {
    render (){
        const {item} = this.props.dataItem;
        return (
            <TouchableOpacity>
                <View style = {{flexDirection:'row', marginTop: 5, flex:1}}>
                    <Image style = {styles.image_item}
                           source={{
                               uri: "http://media.tinmoi.vn/2018/01/23/ban-xe.jpg"
                           }}
                           resizeMode="cover">

                    </Image>
                    <View style = {{marginLeft: 5, justifyContent:'center', flex:1}}>
                        <Text style = {{ fontSize:16, flexWrap:'wrap'}}>{item.Title}</Text>
                        <Text style = {{color:'red', marginTop: 10, fontWeight:'bold'}}>{item.Price} đ</Text>
                    </View>
                </View>
                <View style = {{height:1, backgroundColor:"#BDBDBD", marginTop:5}}/>

            </TouchableOpacity>
        )
    }
}
export default ItemSearchRaoVat
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_item: {
        height: DEVICE_WIDTH/5,
        width: DEVICE_WIDTH/3,
        marginLeft: 5


    }
})