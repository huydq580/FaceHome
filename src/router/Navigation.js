import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation'
import DangNhap from "../containers/DangNhap";
import DangKi from "../containers/DangKi";
import StackBQL from "./banquanli/NavigationBanQuanLy";
import StackCuDan from "./cudan/NavigationCuDan";
import StackNCC from "./nhacungcap/NavigationNCC";


const Stack = StackNavigator ({
    DangNhap: {
        screen: DangNhap,
        navigationOptions: {
            header: null,
        }
    },
    DangKi: {
        screen: DangKi,
        navigationOptions: {
            title: 'Vui lòng chọn loại tài khoản'
        }
    },

    StackBQL: {
        screen: StackBQL,
        navigationOptions: {
            header: null
        }
    },
    StackCuDan: {
        screen: StackCuDan,
        navigationOptions: {
            header: null,
        }
    },
    StackNCC: {
        screen: StackNCC,
        navigationOptions: {
            header: null,
        }
    }


})
export default Stack;