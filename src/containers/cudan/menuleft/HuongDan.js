import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import TestScrollTabView from "../../../components/TestScrollTabView";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

export default class HuongDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Hướng dẫn',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor (props) {
        super (props)
        this.state = {
            tab : [1, 2]
        }
    }
    render () {
        return (
            <View>
                <Text>Hướng dẫn</Text>
            </View>
        )
    }

}