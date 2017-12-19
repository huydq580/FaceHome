import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import NhapThongTinChiTiet from '../../containers/cudan/NhapThongTinChiTiet';
import NhapMaXacThuc from '../../containers/cudan/NhapMaXacThuc';
import TabCuDan from './TabNavigatorCuDan';
const StackCuDan = StackNavigator({
    NhapThongTinChiTiet: {
        screen: NhapThongTinChiTiet,
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
        screen: TabCuDan,
        navigationOptions: {
            header: null
        }
    }


})
export default StackCuDan;