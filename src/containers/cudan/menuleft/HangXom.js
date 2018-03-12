import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import stylesContainer from "../../../components/style";
import HangXomItem from "../../../components/hangxom/HangXomItem";

export default class HangXom extends Component {
    constructor(props){
        super(props)
        this.state ={
            dataItem: [
                {
                    phong: "150"
                },
                {
                    phong: "1502"
                },
                {

                    phong: "1503"
                },
                {

                    phong: "1504"
                },
                {

                    phong: "1505"
                },
                {

                    phong: "1506"
                },
                {

                    phong: "1507"
                },
                {

                    phong: "1508"
                },
                {
                    phong: "1509"
                },
                {
                    phong: "1510"
                }
                ]

        }
    }
    render(){
        return(
            <View style = {stylesContainer.container}>
                <View style = {{flexDirection:'row', marginTop:25}}>
                    <Text style = {{marginLeft:15, color: 'red'}}>Tầng 15</Text>
                    <Text style = {{color: 'red', marginLeft: 150}}>Thảo luận tầng</Text>
                </View>
                <View style = {{height:1, backgroundColor:'red'}}/>
                <FlatList
                    style = {{marginTop: 10}}
                    data = {this.state.dataItem}
                    renderItem={(item) => {
                        return (
                            <HangXomItem
                                dataItem={item}/>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                    numColumns={3}
                />

            </View>
        )
    }
}