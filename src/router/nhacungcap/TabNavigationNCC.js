import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import KDTGanBan from "../../containers/nhacungcap/KDTGanBan";
import RaoVat from "../../containers/nhacungcap/RaoVat";
import TinNhan from "../../containers/nhacungcap/TinNhan";

const TabNCC = TabNavigator ({
    KDTGanBan: {
        screen: KDTGanBan,
        navigationOptions: {
            header : null,
        }
    },
    RaoVat: {
        screen: RaoVat,
        navigationOptions: {
            header : null
        }
    },
    TinNhan: {
        screen: TinNhan,
        navigationOptions: {
            header : null
        }
    }
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
export default TabNCC