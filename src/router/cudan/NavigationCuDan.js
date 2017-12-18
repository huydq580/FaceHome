import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import DangKi from '../../containers/DangKi';
import NhapThongTinChiTiet from '../../containers/cudan/NhapThongTinChiTiet';
import NhapMaXacThuc from '../../containers/cudan/NhapMaXacThuc';
import Tab from './TabNavigatorCuDan';
import DangNhap from '../../containers/DangNhap';
const StackCuDan = StackNavigator({
    // DangNhap: {
    //     screen: DangNhap,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // DangKi: {
    //     screen: DangKi,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
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
        screen: Tab,
        navigationOptions: {
            header: null
        }
    }


})
export default StackCuDan;