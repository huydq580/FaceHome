import  { TabNavigator } from 'react-navigation';
import DichVuGanKDT from "../../containers/banquanli/DichVuGanKDT";
import RaoVatDichVu from "../../containers/banquanli/RaoVatDichVu";
import { Dimensions } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const TabDichVu = TabNavigator ({
    DichVuGanKDT: {
        screen: DichVuGanKDT,
        navigationOptions: {
            // header: null,
            label: 'Dịch vụ gần KDT'
        }
    },
    RaoVatDichVu: {
        screen: RaoVatDichVu,
        navigationOptions: {
            // header: null,
            label: 'Rao vặt'
        }
    }
},
{
    tabBarPosition: 'top',
        animationEnabled: true,
    scrollEnable: true,
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
    tabStyle: {
        marginHorizontal:30
    }

}
})
export default TabDichVu