import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import TinNhanItem from "../../components/TinNhanItem";
import Dimensions from 'Dimensions';
import stylesContainer from "../../components/style";
const DEVICE_WIDTH = Dimensions.get('window').width;


class TinNhan extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataMSG: [
                {
                    firstName: 'Giáp',
                    lastName: 'Đoàn',
                    lastTime: '16/01/2018',
                    email: 'giapdv@pateco.vn'
                },
                {
                    firstName: 'Hiệu',
                    lastName: 'Nguyễn',
                    lastTime: '15/01/2018',
                    email: 'hieunv@pateco.vn'
                },
                {
                    firstName: 'Tân',
                    lastName: 'Duy',
                    lastTime: '18/01/2018',
                    email: 'duydt@pate.vn'
                },
            ]
        }
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

    render() {
        const {navigation} = this.props;
        return (
            <View style = {stylesContainer.container}>
                <FlatList
                    data={this.state.dataMSG}
                    renderItem={(item) => {
                        return (
                            <TinNhanItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}
export default TinNhan;