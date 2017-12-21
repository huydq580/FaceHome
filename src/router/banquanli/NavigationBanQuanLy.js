import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import TaoThongTinKDT from "../../containers/banquanli/TaoThongTinKDT";
import NhapThongTinChiTiet from "../../containers/banquanli/NhapThongTinChiTiet";
import DangKyTaiKhoanBQL from "../../containers/banquanli/DangKyTaiKhoanBQL";
import TabBQL from "./TabBQL";

const StackBQL = StackNavigator({
    // TaoThongTinKDT: {
    //     screen: TaoThongTinKDT,
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
    DangKyTaiKhoanBQL: {
        screen: DangKyTaiKhoanBQL,
        navigationOptions: {
            header: null
        }
    },
    TabBQL: {
        screen: TabBQL,
        navigationOptions: {
            header: null
        }
    }


})
export default StackBQL;