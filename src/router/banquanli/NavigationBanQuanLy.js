import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import DangKi from '../../containers/DangKi';
import DangNhap from '../../containers/DangNhap';
import TaoThongTinKDT from "../../containers/banquanli/TaoThongTinKDT";
import NhapThongTinChiTiet from "../../containers/banquanli/NhapThongTinChiTiet";
import TrangChuBQL from '../../containers/banquanli/TrangChuBQL';
const StackBQL = StackNavigator({
    // DangNhap: {
    //     screen: DangNhap,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // DangKi: {
    //     screen: DangKi,
    //     navigationOptions: {
    //         title :'Chọn tài khoản và tạo tên KĐT'
    //     }
    // },
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
    TrangChuBQL: {
        screen: TrangChuBQL,
        navigationOptions: {
            header: null
        }
    }


})
export default StackBQL;