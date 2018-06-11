import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput, StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';
export default class Post extends Component {
    constructor (props) {
        super (props)
        this.state = {
            Status: ""
        }
    }
    render () {
        return (
            <View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Image
                        source={{
                            uri: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg"
                        }}
                        style={styles.image_circle}
                        resizeMode="cover">
                    </Image>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: 'black'}}>Nguyễn Văn Hiệu</Text>
                        <Text>Mọi người</Text>
                    </View>
                </View>
                <View style={{marginHorizontal: 10, marginTop: 10}}>
                    <TextInput placeholder='Bạn muốn nói gì?'
                               underlineColorAndroid="transparent"
                               onChangeText={(Status) => this.setState({Status})}
                               placeholderTextSize="20"
                               // onFocus={() => {
                               //     this.handleTextInput()
                               // }}
                    />
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
