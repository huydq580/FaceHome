import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import stylesContainer from "../../components/style";

class TaoGroup extends Component {
    render (){
        return (
            <View style  = {stylesContainer.container}>
                <View style = {{flexDirection:"row", borderWidth:1, minHeight:40, alignItems:"center", borderColor:"#9E9E9E"}}>
                    <Text style = {{marginLeft: 10}}>To: </Text>
                    <Text>Lê Công Hiệp</Text>
                </View>
            </View>
        );
    }
}
export default TaoGroup