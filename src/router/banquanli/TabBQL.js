import {TabNavigator} from 'react-navigation'
import SanhChinh from "../../containers/banquanli/SanhChinh";
import QuanLyCuDan from "../../containers/banquanli/QuanLyCuDan";
import DichVu from "../../containers/banquanli/DichVu";
import Notification from "../../containers/banquanli/Notification";
import MenuLeftBQL from "../../containers/banquanli/MenuLeftBQL";

const TabBQL = TabNavigator({
    SanhChinh:{
        screen: SanhChinh,
        navigationOptions: {
            title: 'Sảnh Chính',
            tabBarLabel: 'Sanh Chinh',
        }
    },
    QuanLyCuDan: {
        screen: QuanLyCuDan,
        navigationOptions: {
            title: 'Quản lí cư dân'
        }
    },
    DichVu: {
        screen: DichVu,
        navigationOptions: {
            title: 'Dịch Vụ'
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            title: 'Notification'
        }
    },
    MenuLeftBQL: {
        screen: MenuLeftBQL,
        navigationOptions: {
            title: 'Menu'
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
)
export default TabBQL;