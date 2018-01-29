import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import NhapThongTinChiTietCuDan from '../../containers/cudan/NhapThongTinChiTietCuDan';
import NhapMaXacThuc from '../../containers/cudan/NhapMaXacThuc';
import TabCuDan from "./TabNavigatorCuDan";
import LienLacNhanhBQL from "../../containers/cudan/menuleft/LienLacNhanhBQL";
import DangKyDichVuKDT from "../../containers/cudan/menuleft/DangKyDichVuKDT";
import BaoSuCoKDT from "../../containers/cudan/menuleft/BaoSuCoKDT";
import ThanhToanHoaDon from "../../containers/cudan/menuleft/ThanhToanHoaDon";
import CanhBaoChayNhanhCuDan from "../../containers/cudan/menuleft/CanhBaoChayNhanhCuDan";
import QuanLyTaiKhoanCuDan from "../../containers/cudan/menuleft/QuanLyTaiKhoanCuDan";
import GioiThieu from "../../containers/cudan/menuleft/GioiThieu";
import NhaCuDan from "../../containers/cudan/menuleft/NhaCuDan";
import HangXom from "../../containers/cudan/menuleft/HangXom";
import RaoVatCuDan from "../../containers/cudan/menuleft/RaoVatCuDan";
import ThongTinKDTCuDan from "../../containers/cudan/menuleft/ThongTinKDTCuDan";
import ThongTinCaNhanCuDan from "../../containers/cudan/menuleft/ThongTinCaNhanCuDan";
import ThayDoiMatKhauCuDan from "../../containers/cudan/menuleft/ThayDoiMatKhauCuDan";
import ChiTietCanhBaoChayCuDan from "../../containers/cudan/menuleft/ChiTietCanhBaoChayCuDan";
import ChiTietSuCoCuDan from "../../containers/cudan/menuleft/ChiTietSuCoCuDan";
import BaoSuCoMoi from "../../containers/cudan/menuleft/BaoSuCoMoi";

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
        screen: CanhBaoChayNhanhCuDan,
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
        screen: QuanLyTaiKhoanCuDan,
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
    },
    ThayDoiMatKhauCuDan: {
        screen: ThayDoiMatKhauCuDan,
        navigationOptions: {
            title: 'Thay đổi mật khẩu'
        }
    },
    ChiTietCanhBaoChayCuDan: {
        screen: ChiTietCanhBaoChayCuDan,
        navigationOptions: {
            title: 'Chi tiết cảnh báo cháy'
        }
    },
    ChiTietSuCoCuDan: {
        screen: ChiTietSuCoCuDan,
        navigationOptions: {
            title: 'Chi tiết sự cố'
        }
    },
    BaoSuCoMoi: {
        screen: BaoSuCoMoi,
        navigationOptions: {
            title: 'Báo sự cố mới'
        }
    }


})
export default StackCuDan;