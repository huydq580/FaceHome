import React, { Component } from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import NhapThongTinNCC from "../../containers/nhacungcap/NhapThongTinNCC";
import TabNCC from "./TabNavigationNCC";


const StackNCC = StackNavigator ({
    NhapThongTinNCC : {
        screen : NhapThongTinNCC,
        navigationOptions: {
            header: null,
        }
    },
    TabNCC : {
        screen: TabNCC,
        navigationOptions: {
            header: null
        }
    }

})
export default StackNCC;

