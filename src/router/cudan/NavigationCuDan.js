import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import NhapThongTinChiTietCuDan from '../../containers/cudan/NhapThongTinChiTietCuDan';
import NhapMaXacThuc from '../../containers/cudan/NhapMaXacThuc';
import TabCuDan from "./TabNavigatorCuDan";
import ThongTinCanBiet from "../../containers/cudan/menuleft/ThongTinCanBiet";
import LienLacNhanhBQL from "../../containers/cudan/menuleft/LienLacNhanhBQL";
import DangKyDichVuKDT from "../../containers/cudan/menuleft/DangKyDichVuKDT";
import BaoSuCoKDT from "../../containers/cudan/menuleft/BaoSuCoKDT";
import ThanhToanHoaDon from "../../containers/cudan/menuleft/ThanhToanHoaDon";
import CanhBaoChayNhanh from "../../containers/cudan/menuleft/CanhBaoChayNhanh";
import QuanLyTaiKhoan from "../../containers/cudan/menuleft/QuanLyTaiKhoan";
import GioiThieu from "../../containers/cudan/menuleft/GioiThieu";

const StackCuDan = StackNavigator({
    NhapThongTinChiTietCuDan: {
        screen: NhapThongTinChiTietCuDan,
        navigationOptions: {
            header: null
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
        navigationOptions: {
        }
    },
    ThongTinCanBiet: {
        screen: ThongTinCanBiet,
        navigationOptions: {
            title: 'Thông tin cần biết'
        }
    },
    LienLacNhanhBQL: {
        screen: LienLacNhanhBQL,
        navigationOptions: {
            title: 'Liên lạc nhanh BQL'

        }
    },
    DangKyDichVuKDT: {
        screen: DangKyDichVuKDT,
        navigationOptions: {
            title: 'Đăng ký dịch vụ KĐT'

        }
    },
    BaoSuCoKDT: {
        screen: BaoSuCoKDT,
        navigationOptions: {
            title: 'Báo cáo sự cố KĐT'
        }
    },
    ThanhToanHoaDonCuDan: {
        screen: ThanhToanHoaDon,
        navigationOptions: {
            title: 'Thanh toán hóa đơn'
        }
    },
    CanhBaoChayNhanhCuDan: {
        screen: CanhBaoChayNhanh,
        navigationOptions: {
            title: 'Cảnh báo cháy nhanh'
        }
    },
    QuanLyTaiKhoanCuDan: {
        screen: QuanLyTaiKhoan,
        navigationOptions: {
            title: 'Quản lý tài khoản'
        }
    },
    GioiThieuCuDan: {
        screen: GioiThieu,
        navigationOptions: {
            title: 'Giới thiệu'
        }
    }


})
export default StackCuDan;