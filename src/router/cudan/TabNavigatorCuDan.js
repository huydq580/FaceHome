import React, { Component } from 'react'
import {TabNavigator, DrawerNavigator} from 'react-navigation'
import SanhChinh from '../../containers/cudan/SanhChinh';
import DichVu from '../../containers/cudan/DichVu';
import TinNhanCuDan from '../../containers/cudan/TinNhanCuDan';
import Notification from '../../containers/cudan/Notification';
import MenuLeftCuDan from "../../containers/cudan/MenuLeftCuDan";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';


const TabCuDan = TabNavigator ({
    SanhChinh: {
        screen: SanhChinh,
        navigationOptions: {
            header: null,
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25}
                       style={{ color: tintColor }}/>
            ),
        }
    },
        Notification: {
            screen: Notification,
            navigationOptions: {
                title: 'Thông báo',
                tabBarIcon: ({tintColor}) => (
                    <Icon1 name="ios-notifications" size={25}
                           style={{ color: tintColor }}/>
                ),
            },
        },

    TinNhanCuDan: {
        screen: TinNhanCuDan,
        navigationOptions: {
            title: 'Tin nhắn',
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="facebook-messenger" size={25}
                       style={{ color: tintColor }}/>
            ),
        }
    },
        DichVu: {
            screen: DichVu,
            navigationOptions: {
                title: 'Dịch vụ',
                tabBarIcon: ({tintColor}) => (
                    <Icon3 name="loop" size={25}
                           style={{ color: tintColor }}/>
                ),
            }
        },
    MenuLeftCuDan: {
        screen: MenuLeftCuDan,
        navigationOptions: {
            title:'Thêm',
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="dots-horizontal" size={25}
                       style={{ color: tintColor }}/>
            ),
        }
    }

},
    {
        tabBarPosition: 'bottom',

        animationEnabled: true,
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
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