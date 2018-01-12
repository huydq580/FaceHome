import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation';
import TaoThongTinKDT from "../../containers/banquanli/TaoThongTinKDT";
import NhapThongTinChiTiet from "../../containers/banquanli/NhapThongTinChiTietBQL";
import DangKyTaiKhoanBQL from "../../containers/banquanli/DangKyTaiKhoanBQL";
import TabBQL from "./TabBQL";
import NhaBQL from "../../containers/banquanli/menuleft/NhaBQL";
import QuanLyTaiKhoan from "../../containers/banquanli/menuleft/QuanLyTaiKhoan";
import BanQuanLy from "../../containers/banquanli/menuleft/BanQuanLy";
import TiepNhanSuCoCuDan from "../../containers/banquanli/menuleft/TiepNhanSuCoCuDan";
import CanhBaoChayNhanh from "../../containers/banquanli/menuleft/CanhBaoChayNhanh";
import ThanhToanHoaDon from "../../containers/banquanli/menuleft/ThanhToanHoaDon";
import NhanDonDangKyDichVu from "../../containers/banquanli/menuleft/NhanDonDangKyDichVu";
import RaoVat from "../../containers/banquanli/menuleft/RaoVat";
import GioiThieu from "../../containers/banquanli/menuleft/GioiThieu";
import ThongTinKhuDoThi from "../../containers/banquanli/menuleft/ThongTinKhuDoThi";
import ThongTinCaNhanBQL from "../../containers/banquanli/menuleft/ThongTinCaNhanBQL";
import SoanTin from "../../containers/banquanli/SoanTin";
import ChiTietThanhVienBQL from "../../containers/banquanli/menuleft/ChiTietThanhVienBQL";
import TaoThanhVienBQL from "../../containers/banquanli/menuleft/TaoThanhVienBQL";


const StackBQL = StackNavigator({
    // TaoThongTinKDT: {
    //     screen: TaoThongTinKDT,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    NhapThongTinChiTiet: {
        screen: NhapThongTinChiTiet,
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
    TabBQL: {
        screen: TabBQL,
        // navigationOptions: {
        //     header: null
        // }
    },
    Nha: {
        screen: NhaBQL,
        navigationOptions: {
            title: 'Nhà'
        }
    },
    ThongTinKhuDoThi: {
        screen: ThongTinKhuDoThi,
        navigationOptions: {
            title: 'Thông tin khu đô thị'
        }
    },
    BanQuanLy: {
        screen: BanQuanLy,
        navigationOptions: {
            title: 'Ban quản lý'
        }
    },
    TiepNhanSuCoCuDan: {
        screen: TiepNhanSuCoCuDan,
        navigationOptions: {
            title: 'Tiếp nhận sự cố cư dân'
        }
    },
    CanhBaoChayNhanh: {
        screen: CanhBaoChayNhanh,
        navigationOptions: {
            title: 'Cảnh báo cháy nhanh'
        }
    },
    ThanhToanHoaDon: {
        screen: ThanhToanHoaDon,
        navigationOptions: {
            title: "Thanh toán hóa đơn"
        }
    },
    NhanDonDangKyDichVu: {
        screen: NhanDonDangKyDichVu,
        navigationOptions: {
            title: "Nhận đơn đăng ký dịch vụ"
        }
    },
    RaoVat: {
        screen: RaoVat,
        navigationOptions: {
            title: "Rao vặt"
        }
    },
    QuanLyTaiKhoan: {
        screen: QuanLyTaiKhoan,
        navigationOptions: {
            title: 'Quản lý tài khoản'
        }
    },
    GioiThieu: {
        screen: GioiThieu,
        navigationOptions: {
            title: "Giới thiệu"
        }
    },
    ThongTinCaNhanBQL: {
        screen: ThongTinCaNhanBQL,
        navigationOptions: {
            title: 'Thông tin cá nhân'
        }
    },
    SoanTin: {
        screen: SoanTin,
        navigationOptions: {
            title: 'Tạo bài viết'
        }
    },
    ChiTietThanhVienBQL: {
        screen: ChiTietThanhVienBQL,
        navigationOptions: {
            title: 'Chi tiết thành viên'
        }
    },
    TaoThanhVienBQL: {
        screen: TaoThanhVienBQL,
        navigationOptions:  {
            title: 'Tạo thành viên BQL'
        }
    }



})
export default StackBQL;