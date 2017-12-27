import React, { Component } from 'react';
import {StackNavigator, NavigationActions} from 'react-navigation'
import DangNhap from "../containers/DangNhap";
import DangKi from "../containers/DangKi";
import StackBQL from "./banquanli/NavigationBanQuanLy";
import StackCuDan from "./cudan/NavigationCuDan";
import StackNCC from "./nhacungcap/NavigationNCC";
import LoadData from "../components/LoadData";
import Launcher from "../containers/Launcher";


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