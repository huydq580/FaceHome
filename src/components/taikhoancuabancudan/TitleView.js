import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
class TitleView extends Component {
    render (){
        return (
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={this.props.source}
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10, marginTop: 10}}>
                        <Text style = {{color: 'black'}}>
                            {this.props.titleText}
                        </Text>
                        <View style = {{height:1, backgroundColor:'#9E9E9E', width: DEVICE_WIDTH}}/>
                    </View>


                </View>
        )
    }
}
export default TitleView
const styles = StyleSheet.create({
    circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 50,
        height: 50,
        borderRadius: 50/2,
        alignItems: 'center',
        justifyContent:'center'
    },
    info: {
        marginTop: 10,
        marginLeft: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent:'center'
    },

    viewItem: {
        borderWidth: 1,
        padding: 3, justifyContent:'center',
        height: 28, width: 170
    },
    image_circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        alignItems: 'center',
        justifyContent:'center'
    }


})