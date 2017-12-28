import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import NhapThongTinNCC from "../../containers/nhacungcap/NhapThongTinNCC";
import TabNCC from "./TabNCC";

const StackNCC = StackNavigator({
    NhapThongTinNCC: {
        screen: NhapThongTinNCC,
        navigationOptions: {
            title: 'Nhập thông tin nhà cung cấp'
        },
    },
    TabNCC: {
        screen: TabNCC,

    }
})
export default StackNCC;