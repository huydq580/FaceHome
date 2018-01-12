import {TabNavigator} from 'react-navigation'
import KDTGanBan from "../../containers/nhacungcap/KDTGanBan";
import RaoVat from "../../containers/nhacungcap/RaoVatNCC";
import TinNhan from "../../containers/nhacungcap/TinNhanNCC";

const TabNCC = TabNavigator({
    KDTGanBan: {
        screen: KDTGanBan,
        navigationOptions: {
            title: 'KĐT gần bạn'
        }
    },
    RaoVatNCC: {
        screen: RaoVat,
        navigationOptions:{
            title: 'Rao vặt'
        }
    },
    TinNhanNCC: {
        screen: TinNhan,
        navigationOptions: {
            title: 'Tin nhắn'
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
    })
export default TabNCC;