import React, { Component } from 'react';
import {StackNavigator, NavigationActions} from 'react-navigation'
import DangNhap from "../containers/DangNhap";
import DangKi from "../containers/DangKi";
import StackBQL from "./banquanli/NavigationBanQuanLy";
import StackCuDan from "./cudan/NavigationCuDan";
import StackNCC from "./nhacungcap/NavigationNCC";
import LoadData from "../components/LoadData";
import Launcher from "../containers/Launcher";
import TabBQL from "./banquanli/TabBQL";
import TabNCC from "./nhacungcap/TabNCC";
import TabCuDan from "./cudan/TabNavigatorCuDan";
import NhapThongTinChiTiet from "../containers/banquanli/NhapThongTinChiTiet";
import DangKyTaiKhoanBQL from "../containers/banquanli/DangKyTaiKhoanBQL";


const Stack = StackNavigator ({
    // Launcher: {
    //     screen: Launcher,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
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
    LoadData: {
        screen: LoadData,
        navigationOptions: {
            header: null,
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
    },
    TabBQL: {
        screen: TabBQL,
    },
    TabNCC: {
        screen: TabNCC
    },
    TabCuDan: {
        screen: TabCuDan
    }


})
// const resetAction = NavigationActions.reset({
//     index: 1,
//     actions: [
//         NavigationActions.navigate({ routeName: 'DangNhap'}),
//         NavigationActions.navigate({ routeName: 'TabBQL'})
//     ]
// })
// this.props.navigation.dispatch(resetAction)
//

export default Stack;