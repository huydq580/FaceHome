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
            <ScrollableTabView
                initialPage={0}
                tabBarBackgroundColor="white"
                // tabBarUnderlineStyle={{borderBottomColor: 'aqua'}}
                tabBarActiveTextColor="#1CAADE"
                tabBarUnderlineStyle={{ backgroundColor: '#1CAADE', borderColor: '#1CAADE', borderBottomWidth: 0.1, borderBottomColor: '#1CAADE' }}
                // renderTabBar={() => }
            >
                {
                    this.state.tab.map((data, index) => {
                        return

                        <FlatList
                            data={data1}
                            // renderItem={({ item }) => }
                            keyExtractor={item => item.id}
                            numColumns={2} />


                    })
                }

            </ScrollableTabView>
        )
    }

}