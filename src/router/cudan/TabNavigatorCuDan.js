import React, { Component } from 'react'
import {TabNavigator, DrawerNavigator} from 'react-navigation'
import SanhChinh from '../../containers/cudan/SanhChinh';
import DichVu from '../../containers/cudan/DichVu';
import TinNhan from '../../containers/cudan/TinNhan';
import Notification from '../../containers/cudan/Notification';
import MenuLeft from '../../containers/cudan/MenuLeft';
const TabCuDan = TabNavigator ({
    SanhChinh: {
        screen: SanhChinh,
        navigationOptions: {
            header: null
        }
    },
    DichVu: {
        screen: DichVu,
        navigationOptions: {
            header: null
        }
    },
    TinNhan: {
        screen: TinNhan,
        navigationOptions: {
            header: null
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            header: null
        },
    },
    // MenuLeft: {
    //     screen: MenuLeft,
    //     navigationOptions: {
    //         header: null
    //     }
    // }

},
{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        tabStyle: {margin: 0, padding: 0, height: 60},
        // showIcon: true,
        style: {height: 60, padding:0, margin:0},
        upperCaseLabel: false, //chu thuong
        pressOpacity: 0.1
    },
    animationEnabled: false
})

// const SideMenuCuDan = DrawerNavigator ({
//     Tab: {
//         screen: TabCuDan,
//     }},
//     {
//         drawerWidth: 300,
//         drawerWidth: 250,
//         drawerPosition: "left",
//         contentComponent: props => <MenuLeft {...props}/>
//     }
// )
export default TabCuDan;