import {TabNavigator} from 'react-navigation'
import SanhChinh from "../../containers/banquanli/SanhChinh";
import QuanLyCuDan from "../../containers/banquanli/QuanLyCuDan";
import DichVu from "../../containers/banquanli/DichVu";
import Notification from "../../containers/banquanli/Notification";

const TabBQL = TabNavigator({
    SanhChinh:{
        screen: SanhChinh,
        navigationOptions: {
            header: null
        }
    },
    QuanLyCuDan: {
        screen: QuanLyCuDan,
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
    Notification: {
        screen: Notification,
        navigationOptions: {
            header: null
        }
    }
})
export default TabBQL;