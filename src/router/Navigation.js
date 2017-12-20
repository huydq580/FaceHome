import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation'
import DangNhap from "../containers/DangNhap";
import DangKi from "../containers/DangKi";
import StackBQL from "./banquanli/NavigationBanQuanLy";
import StackCuDan from "./cudan/NavigationCuDan";
import StackNCC from "./nhacungcap/NavigationNCC";
import NhapThongTinNCC from "../containers/nhacungcap/NhapThongTinNCC";
import TaoThongTinKDT from "../containers/banquanli/TaoThongTinKDT";
import NhapThongTinChiTiet from "../containers/banquanli/NhapThongTinChiTiet";
import NhapThongTinChiTietCuDan from "../containers/cudan/NhapThongTinChiTietCuDan";
import SideMenuCuDan from "./cudan/TabNavigatorCuDan";
import TabNCC from "./nhacungcap/TabNavigationNCC";
import TabBQL from "./banquanli/TabBQL";
import DangKyTaiKhoanBQL from "../containers/banquanli/DangKyTaiKhoanBQL";


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
    },
    DangKyTaiKhoanBQL: {
        screen: DangKyTaiKhoanBQL,
        navigationOptions: {
            header: null
        }
    },
    NhapThongTinNCC: {
        screen: NhapThongTinNCC,
        navigationOptions: {
            header: null
        }
    },
    NhapThongTinChiTietCuDan: {
        screen: NhapThongTinChiTietCuDan,
        navigationOptions: {
            header: null
        }
    },
    SideMenu: {
        screen: SideMenuCuDan,
        navigationOptions: {
            header: null
        }
    },
    TabNCC: {
        screen: TabNCC,
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

    // StackBQL: {
    //     screen: StackBQL,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // StackCuDan: {
    //     screen: StackCuDan,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // StackNCC: {
    //     screen: StackNCC,
    //     navigationOptions: {
    //         header: null,
    //     }
    // }


})
export default Stack;