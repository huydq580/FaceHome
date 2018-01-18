import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import NhapThongTinChiTietCuDan from '../../containers/cudan/NhapThongTinChiTietCuDan';
import NhapMaXacThuc from '../../containers/cudan/NhapMaXacThuc';
import TabCuDan from "./TabNavigatorCuDan";
import LienLacNhanhBQL from "../../containers/cudan/menuleft/LienLacNhanhBQL";
import DangKyDichVuKDT from "../../containers/cudan/menuleft/DangKyDichVuKDT";
import BaoSuCoKDT from "../../containers/cudan/menuleft/BaoSuCoKDT";
import ThanhToanHoaDon from "../../containers/cudan/menuleft/ThanhToanHoaDon";
import CanhBaoChayNhanh from "../../containers/cudan/menuleft/CanhBaoChayNhanh";
import QuanLyTaiKhoan from "../../containers/cudan/menuleft/QuanLyTaiKhoan";
import GioiThieu from "../../containers/cudan/menuleft/GioiThieu";
import NhaCuDan from "../../containers/cudan/menuleft/NhaCuDan";
import HangXom from "../../containers/cudan/menuleft/HangXom";
import RaoVatCuDan from "../../containers/cudan/menuleft/RaoVatCuDan";
import ThongTinKDTCuDan from "../../containers/cudan/menuleft/ThongTinKDTCuDan";
import ThongTinCaNhanCuDan from "../../containers/cudan/menuleft/ThongTinCaNhanCuDan";

const StackCuDan = StackNavigator({
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
    NhaCuDan: {
        screen: NhaCuDan,
        navigationOptions: {
            title: 'Nhà'

        }
    },
    HangXom: {
        screen: HangXom,
        navigationOptions: {
            title: 'Hàng xóm'
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
    RaoVatCuDan: {
        screen: RaoVatCuDan,
        navigationOptions: {
            title: 'Rao vặt'
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
    },
    ThongTinKDTCuDan: {
        screen: ThongTinKDTCuDan,
        navigationOptions: {
            title: 'Thông tin khu đô thị'
        }
    },
    ThongTinCaNhanCuDan: {
        screen: ThongTinCaNhanCuDan,
        navigationOptions: {
            title: 'Thông tin cá nhân'
        }
    }


})
export default StackCuDan;