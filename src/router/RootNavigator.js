import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import SanhChinhBQL from "../containers/banquanli/SanhChinhBQL";
import QuanLyCuDan from "../containers/banquanli/QuanLyCuDan";
import DichVuBQL from "../containers/banquanli/DichVuBQL";
import NotificationBQL from "../containers/banquanli/NotificationBQL";
import MenuLeftBQL from "../containers/banquanli/MenuLeftBQL";


import SanhChinh from "../containers/cudan/SanhChinh";
import DichVuCuDan from "../containers/cudan/DichVuCuDan";
import TinNhanCuDan from "../containers/cudan/TinNhanCuDan";
import NotificationCuDan from "../containers/cudan/NotificationCuDan";
import MenuLeftCuDan from "../containers/cudan/MenuLeftCuDan";


import KDTGanBan from "../containers/nhacungcap/KDTGanBan";
import RaoVatNCC from "../containers/nhacungcap/RaoVatNCC";
import TinNhanNCC from "../containers/nhacungcap/TinNhanNCC";

import NhapThongTinChiTietBQL from "../containers/banquanli/NhapThongTinChiTietBQL";
import DangKyTaiKhoanBQL from "../containers/banquanli/DangKyTaiKhoanBQL";

import NhapThongTinChiTietCuDan from "../containers/cudan/NhapThongTinChiTietCuDan";

import NhapThongTinNCC from "../containers/nhacungcap/NhapThongTinNCC";
import DangNhap from "../containers/DangNhap";
import DangKi from "../containers/DangKi";
import LoadData from "../components/LoadData";
import NhaBQL from "../containers/banquanli/menuleft/NhaBQL";
import ThongTinKhuDoThi from "../containers/banquanli/menuleft/ThongTinKhuDoThi";
import ThongTinCaNhanBQL from "../containers/banquanli/menuleft/ThongTinCaNhanBQL";

//Tabbar BQL
const TabBQL = TabNavigator({
        SanhChinhBQL:{
            screen: SanhChinhBQL,
            navigationOptions: {
                title: 'Sảnh Chính',
            }
        },
        QuanLyCuDan: {
            screen: QuanLyCuDan,
            navigationOptions: {
                title: 'Quản lí cư dân'
            }
        },
        DichVuBQL: {
            screen: DichVuBQL,
            navigationOptions: {
                title: 'Dịch Vụ'
            }
        },
        NotificationBQL: {
            screen: NotificationBQL,
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
    })

//Tab Cu dan

const TabCuDan = TabNavigator ({
        SanhChinhCuDan: {
            screen: SanhChinh,
            navigationOptions: {
                title:'Sảnh chính'
            }
        },
        DichVuCuDan: {
            screen: DichVuCuDan,
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
        NotificationCuDan: {
            screen: NotificationCuDan,
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

//Tab Ncc
const TabNCC = TabNavigator({
        KDTGanBan: {
            screen: KDTGanBan,
            navigationOptions: {
                title: 'KĐT gần bạn'
            }
        },
        RaoVatNCC: {
            screen: RaoVatNCC,
            navigationOptions:{
                title: 'Rao vặt'
            }
        },
        TinNhanNCC: {
            screen: TinNhanNCC,
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

//StackBQL
const StackBQL = StackNavigator({
    // TaoThongTinKDT: {
    //     screen: TaoThongTinKDT,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // NhapThongTinChiTietBQL: {
    //     screen: NhapThongTinChiTietBQL,
    //     navigationOptions: {
    //         title: 'Nhập thông tin chi tiết'
    //     }
    // },
    // DangKyTaiKhoanBQL: {
    //     screen: DangKyTaiKhoanBQL,
    //     navigationOptions: {
    //         title: 'Bạn đang tạo tài khoản ban quản lí'
    //     }
    // },
    TabBQL: {
        screen: TabBQL,
        // navigationOptions: {
        //     header: null
        // }
    },
    NhaBQL: {
        screen: NhaBQL,
        navigationOptions: {
            title: 'Nha'
        }
    },
    ThongTinCaNhanBQL: {
        screen: ThongTinCaNhanBQL,
        navigationOptions: {
            title: 'Nhap thong tin chi tiet'
        }
    }
});

//StackCuDan
const StackCuDan = StackNavigator({
    NhapThongTinChiTietCuDan: {
        screen: NhapThongTinChiTietCuDan,
        navigationOptions: {
            title: 'Nhập thông tin chi tiết'
        }
    },
    // NhapMaXacThuc: {
    //     screen: NhapMaXacThuc,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    TabCuDan: {
        screen: TabCuDan,
        navigationOptions: {}
    },
})

//StackNCC
const StackNCC = StackNavigator({
    NhapThongTinNCC: {
        screen: NhapThongTinNCC,
        navigationOptions: {
            title: 'Nhập thông tin nhà cung cấp'
        },
    },
    TabNCC: {
        screen: TabNCC,

    }
})

//RootStack
const RootStack = StackNavigator ({
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
    NhapThongTinChiTietBQL: {
        screen: NhapThongTinChiTietBQL,
        navigationOptions: {
            title: 'Nhập thông tin chi tiết'
        }
    },
    DangKyTaiKhoanBQL: {
        screen: DangKyTaiKhoanBQL,
        navigationOptions: {
            title: 'Bạn đang tạo tài khoản ban quản lí'
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
    },
    TabBQL: {
        screen: TabBQL,
    },
    TabNCC: {
        screen: TabNCC
    },
    TabCuDan: {
        screen: TabCuDan
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

export default RootStack;


