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
            title: 'Nhập thông tin chi tiết'
        }
    },
    DangKyTaiKhoanBQL: {
        screen: DangKyTaiKhoanBQL,
        navigationOptions: {
            title: 'Bạn đang tạo tài khoản ban quản lí'
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