import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Button
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/Entypo'
import ThongBaoItem from '../../components/thongbao/ThongBaoItem';

export default class Notification extends Component {
    constructor(props){
        super(props)

        this.state = {
            listNoti:[
                {
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:false,
                    time:'2017-03-01 8:00'
                },
                {
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:true,
                    time:'2017-03-01 8:00'
                },{
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:false,
                    time:'2017-03-01 8:00'
                }
            ]
        }

    }
    render (){
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={this.state.listNoti}
                    renderItem={(item) => {
                        return (
                            <ThongBaoItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: DEVICE_WIDTH / 5
                }}
            />
        );
    }
}