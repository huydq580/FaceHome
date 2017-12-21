import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import NhapThongTinChiTietCuDan from '../../containers/cudan/NhapThongTinChiTietCuDan';
import NhapMaXacThuc from '../../containers/cudan/NhapMaXacThuc';
import TabCuDan from "./TabNavigatorCuDan";

const StackCuDan = StackNavigator({
    NhapThongTinChiTietCuDan: {
        screen: NhapThongTinChiTietCuDan,
        navigationOptions: {
            header: null
        }
    },
    // NhapMaXacThuc: {
    //     screen: NhapMaXacThuc,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    TabCuDan: {
        screen: TabCuDan,
        navigationOptions: {
            header: null
        }
    }


})
export default StackCuDan;