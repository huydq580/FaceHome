import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

class BinhLuanBQL extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataCmt: [
                {
                    cmt: 'hang xom hay qua'
                },
                {
                    cmt: 'hihi'
                },
                {
                    cmt: 'may thich nhin deu tao a'
                },
            ]
        }
    }
    render (){
        return (
            <View>
                <View>
                    <Text>Binh luận</Text>
                    <Text>Cmt</Text>
                </View>
            </View>
        );
    }
}
export default BinhLuanBQL