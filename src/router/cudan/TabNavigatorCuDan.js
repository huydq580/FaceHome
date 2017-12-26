import React, { Component } from 'react'
import {TabNavigator, DrawerNavigator} from 'react-navigation'
import SanhChinh from '../../containers/cudan/SanhChinh';
import DichVu from '../../containers/cudan/DichVu';
import TinNhan from '../../containers/cudan/TinNhan';
import Notification from '../../containers/cudan/Notification';
import MenuLeftCuDan from "../../containers/cudan/MenuLeftCuDan";


const TabCuDan = TabNavigator ({
    SanhChinh: {
        screen: SanhChinh,
        navigationOptions: {
            title:'Sảnh chính'
        }
    },
    DichVu: {
        screen: DichVu,
        navigationOptions: {
            title: 'Dịch vụ'
        }
    },
    TinNhan: {
        screen: TinNhan,
        navigationOptions: {
            title: 'Tin nhắn'
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            title: 'Notification'
        },
    },
    MenuLeftCuDan: {
        screen: MenuLeftCuDan,
        navigationOptions: {
            title:'Menu'
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