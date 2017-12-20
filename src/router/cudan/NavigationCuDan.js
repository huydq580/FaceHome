import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import NhapThongTinChiTietCuDan from '../../containers/cudan/NhapThongTinChiTietCuDan';
import NhapMaXacThuc from '../../containers/cudan/NhapMaXacThuc';
import SideMenuCuDan from "./TabNavigatorCuDan";

const StackCuDan = StackNavigator({
    NhapThongTinChiTietCuDan: {
        screen: NhapThongTinChiTietCuDan,
        navigationOptions: {
            header: null
        }
    },
    NhapMaXacThuc: {
        screen: NhapMaXacThuc,
        navigationOptions: {
            header: null
        }
    },
    SideMenu: {
        screen: SideMenuCuDan,
        navigationOptions: {
            header: null
        }
    }


})
export default StackCuDan;