import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import TabNCC from "./TabNCC";

const StackNCC = StackNavigator({
    TabNCC: {
        screen: TabNCC,

    }
})
export default StackNCC;