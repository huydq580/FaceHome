import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import TestScrollTabView from "../../../components/TestScrollTabView";

export default class HuongDan extends Component {
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