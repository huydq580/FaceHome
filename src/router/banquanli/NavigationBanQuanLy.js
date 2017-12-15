import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import DangKi from '../../containers/DangKi';
import DangNhap from '../../containers/DangNhap';
import TaoThongTinKDT from "../../containers/banquanli/TaoThongTinKDT";
import NhapThongTinChiTiet from "../../containers/banquanli/NhapThongTinChiTiet";
const Stack = StackNavigator({
    DangNhap: {
        screen: DangNhap,
        navigationOptions: {
            header: null
        }
    },
    DangKi: {
        screen: DangKi,
        navigationOptions: {
            header: null
        }
    },
    TaoThongTinKDT: {
        screen: TaoThongTinKDT,
        navigationOptions: {
            header: null
        }
    },
    NhapThongTinChiTiet: {
        screen: NhapThongTinChiTiet,
        navigationOptions: {
            header: null
        }
    }


})
export default Stack;