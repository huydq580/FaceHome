import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';

import TaoThongTinKDT from "../../containers/banquanli/TaoThongTinKDT";
import NhapThongTinChiTiet from "../../containers/banquanli/NhapThongTinChiTiet";
import SanhChinh from "../../containers/banquanli/SanhChinh";
// import TrangChuBQL from '../../containers/banquanli/TrangChuBQL';
const StackBQL = StackNavigator({
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
    },
    SanhChinh: {
        screen: SanhChinh,
        navigationOptions: {
            header: null
        }
    }


})
export default StackBQL;