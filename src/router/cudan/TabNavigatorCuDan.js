import React, { Component } from 'react'
import {TabNavigator, DrawerNavigator} from 'react-navigation'
import SanhChinh from '../../containers/cudan/SanhChinh';
import DichVu from '../../containers/cudan/DichVu';
import TinNhanCuDan from '../../containers/cudan/TinNhanCuDan';
import Notification from '../../containers/cudan/Notification';
import MenuLeftCuDan from "../../containers/cudan/MenuLeftCuDan";


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
            title: 'Dịch vụ'
        }
    },
    TinNhanCuDan: {
        screen: TinNhanCuDan,
        navigationOptions: {
            title: 'Tin nhắn'
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            title: 'Thông báo'
        },
    },
    MenuLeftCuDan: {
        screen: MenuLeftCuDan,
        navigationOptions: {
            title:'Thêm'
        }
    }

},
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            upperCaseLabel: false,
            // showIcon: true,
            activeTintColor: '#3785ff',
            inactiveTintColor: '#050302',
            indicatorStyle: {
                backgroundColor: '#3785ff'
            },
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#ffffff',
            },
        }
    }
);

export default TabCuDan;