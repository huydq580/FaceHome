import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Dimensions from 'Dimensions';
import images from "../images";

class CmtItem extends Component {
    render (){
        const {item} = this.props.dataItem;
        // console.log('item', item)
        const { navigation } = this.props;
        return (
            <View style = {{flex:1}}>
                <View style = {{flexDirection: 'row'}}>
                    <Image style={styles.image_circle}

                           source={
                               (item.Avartar == "http://image.facehome.vn/avatar/default.png" || item.Avatar == "") ? images.noavatar : {uri: item.Avartar}
                           }
                           resizeMode="cover"
                    >
                    </Image>
                    <Text style = {styles.textName}>{item.FullName}</Text>
                </View>
                <View style = {styles.viewCmt}>
                    <Text style = {styles.textCmt}>{item.Content}</Text>
                    <View style = {{flexDirection:'row'}}>
                        <Text>{moment(item.CreatedDate).format("HH:mm, DD-MM-YYYY")}</Text>
                        <Text style = {{marginLeft:15, color:'black'}}>Like</Text>
                        <Text style = {{marginLeft:15, color: 'black'}}>Reply</Text>
                    </View>

                </View>
                <View style = {{height:1, backgroundColor:'#E0E0E0', marginLeft: DEVICE_WIDTH / 10 + 10, marginTop:10}}>
                </View>

            </View>

        );

    }
}
export default CmtItem
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        marginTop: 10

    },
    textCmt: {
        fontSize: 15,
        marginRight:20,
        color: 'black',
    },
    textName: {
        color: 'black', fontWeight:'bold', fontSize:16, marginLeft:5, marginTop:DEVICE_WIDTH / 20
    },
    viewCmt: {
        marginLeft: DEVICE_WIDTH / 10 + 15,
    }
})