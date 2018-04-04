import React, { Component } from 'react';
import {StackNavigator, NavigationActions} from 'react-navigation'
import DangNhap from "../containers/DangNhap";
import DangKi from "../containers/DangKi";
import StackBQL from "./banquanli/NavigationBanQuanLy";
import StackCuDan from "./cudan/NavigationCuDan";
import StackNCC from "./nhacungcap/NavigationNCC";
import LoadData from "../components/LoadData";
import Launcher from "../containers/Launcher";
import TabBQL from "./banquanli/TabBQL";
import TabNCC from "./nhacungcap/TabNCC";
import TabCuDan from "./cudan/TabNavigatorCuDan";
import NhapThongTinChiTiet from "../containers/banquanli/NhapThongTinChiTiet";
import DangKyTaiKhoanBQL from "../containers/banquanli/DangKyTaiKhoanBQL";
import NhapThongTinChiTietCuDan from "../containers/cudan/NhapThongTinChiTietCuDan";
import NhapThongTinNCC from "../containers/nhacungcap/NhapThongTinNCC";
import QuanLyTaiKhoan from "../containers/banquanli/menuleft/QuanLyTaiKhoan";
import QuanLyTaiKhoanCuDan from "../containers/cudan/menuleft/QuanLyTaiKhoanCuDan";
import Nha from "../containers/banquanli/menuleft/Nha";
import ThongTinKhuDoThi from "../containers/banquanli/menuleft/ThongTinKhuDoThi";
import BanQuanLy from "../containers/banquanli/menuleft/BanQuanLy";
import TiepNhanSuCoCuDan from "../containers/banquanli/menuleft/TiepNhanSuCoCuDan";
import CanhBaoChayNhanh from "../containers/banquanli/menuleft/CanhBaoChayNhanh";
import ThanhToanHoaDon from "../containers/banquanli/menuleft/ThanhToanHoaDon";
import NhanDonDangKyDichVu from "../containers/banquanli/menuleft/NhanDonDangKyDichVu";
import RaoVat from "../containers/banquanli/menuleft/RaoVat";
import GioiThieu from "../containers/banquanli/menuleft/GioiThieu";
import ThongTinCaNhanBQL from "../containers/banquanli/menuleft/ThongTinCaNhanBQL";
import SoanTin from "../containers/banquanli/SoanTin";
import ChiTietThanhVienBQL from "../containers/banquanli/menuleft/ChiTietThanhVienBQL";
import TaoThanhVienBQL from "../containers/banquanli/menuleft/TaoThanhVienBQL";
import ChiTietThongTinKDT from "../containers/banquanli/menuleft/ChiTietThongTinKDT";
import ChiTietCanhBaoChay from "../containers/banquanli/menuleft/ChiTietCanhBaoChay";
import ThayDoiMatKhau from "../containers/banquanli/menuleft/ThayDoiMatKhau";
import TaiKhoanDanCu from "../containers/banquanli/TaiKhoanDanCu";
import TinNhan from "../containers/banquanli/TinNhan";
import TinNhanDetails from "../containers/banquanli/TinNhanDetails";
import BinhLuanBQL from "../containers/banquanli/BinhLuanBQL";
import ChiTietSuCo from "../containers/banquanli/menuleft/ChiTietSuCo";
import NhaCuDan from "../containers/cudan/menuleft/NhaCuDan";
import HangXom from "../containers/cudan/menuleft/HangXom";
import LienLacNhanhBQL from "../containers/cudan/menuleft/LienLacNhanhBQL";
import DangKyDichVuKDT from "../containers/cudan/menuleft/DangKyDichVuKDT";
import BaoSuCoKDT from "../containers/cudan/menuleft/BaoSuCoKDT";
import ThanhToanHoaDonCuDan from "../containers/cudan/menuleft/ThanhToanHoaDonCuDan";
import CanhBaoChayNhanhCuDan from "../containers/cudan/menuleft/CanhBaoChayNhanhCuDan";
import RaoVatCuDan from "../containers/cudan/menuleft/RaoVatCuDan";
import GioiThieuCuDan from "../containers/cudan/menuleft/GioiThieuCuDan";
import ThongTinKDTCuDan from "../containers/cudan/menuleft/ThongTinKDTCuDan";
import ThongTinCaNhanCuDan from "../containers/cudan/menuleft/ThongTinCaNhanCuDan";
import ThayDoiMatKhauCuDan from "../containers/cudan/menuleft/ThayDoiMatKhauCuDan";
import ChiTietCanhBaoChayCuDan from "../containers/cudan/menuleft/ChiTietCanhBaoChayCuDan";
import ChiTietSuCoCuDan from "../containers/cudan/menuleft/ChiTietSuCoCuDan";
import BaoSuCoMoi from "../containers/cudan/menuleft/BaoSuCoMoi";
import SoanTinMoi from "../containers/banquanli/SoanTinMoi";
import Contact from "../containers/banquanli/Contact";
import TinNhanDetailsCuDan from "../containers/cudan/TinNhanDetailsCuDan";
import SoanTinMoiCuDan from "../containers/cudan/SoanTinMoiCuDan";
import TaoGroup from "../containers/banquanli/TaoGroup";
import SoanTinCuDan from "../containers/cudan/SoanTinCuDan";
import BinhLuanCuDan from "../containers/cudan/BinhLuanCuDan";
import ChiTietThongTinKDTCuDan from "../containers/cudan/menuleft/ChiTietThongTinKDTCuDan";
import ChuyenDiaDiem from "../containers/cudan/menuleft/ChuyenDiaDiem";
import ChuyenKDT from "../containers/cudan/menuleft/ChuyenKDT";
import RoiKDT from "../containers/cudan/menuleft/RoiKDT";
import ChuyenCanHo from "../containers/cudan/menuleft/ChuyenCanHo";
import DuyetTaiKhoan from "../containers/DuyetTaiKhoan";
import DanhMuc from "../containers/raovat/DanhMuc";
import BanDangTin from "../containers/raovat/BanDangTin";
import GiaRaoVat from "../containers/raovat/GiaRaoVat";
import HinhAnhRaoVat from "../containers/raovat/HinhAnhRaoVat";
import QuanHuyenRaoVat from "../containers/raovat/QuanHuyenRaoVat";
import KhuVucRaoVat from "../containers/raovat/KhuVucRaoVat";
import TieuDeRaoVat from "../containers/raovat/TieuDeRaoVat";
import MoTaRaoVat from "../containers/raovat/MoTaRaoVat";
import XemLaiTinDang from "../containers/raovat/XemLaiTinDang";
import BanLa from "../containers/raovat/BanLa";
import PickToaNha from "../containers/banquanli/quanlicudan/PickToaNha";
import ThanhVienCanHo from "../containers/cudan/menuleft/ThanhVienCanHo";
import ChiTietThanhVien from "../containers/cudan/menuleft/ChiTietThanhVien";
import CreateGroupBQL from "../containers/banquanli/CreateGroupBQL";
import CreateGroupCuDan from "../containers/cudan/CreateGroupCuDan";
import ChatGroupBQL from "../containers/banquanli/ChatGroupBQL";
import ChatGroupCuDan from "../containers/cudan/ChatGroupCuDan";


const Stack = StackNavigator ({
    Launcher: {
        screen: Launcher,
        navigationOptions: {
            header: null,
        }
    },
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
    NhapThongTinChiTiet: {
        screen: NhapThongTinChiTiet,
        navigationOptions: {
            title: 'Nhập thông tin chi tiết'
        }
    },
    NhapThongTinChiTietCuDan: {
        screen: NhapThongTinChiTietCuDan,
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
    NhapThongTinNCC: {
        screen: NhapThongTinNCC,
        navigationOptions: {
            title: 'Nhập thông tin nhà cung cấp'
        },
    },
    LoadData: {
        screen: LoadData,
        navigationOptions: {
            header: null,
        }
    },
    // StackBQL: {
    //     screen: StackBQL,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // StackCuDan: {
    //     screen: StackCuDan,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
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
    },


    //Stack BQL
    Nha: {
        screen: Nha,
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
    },
    ChiTietThongTinKDT: {
        screen: ChiTietThongTinKDT,
        navigationOptions: {
            title: 'Chi tiết thông tin khu đô thị'
        }
    },
    ChiTietCanhBaoChay: {
        screen: ChiTietCanhBaoChay,
        navigationOptions: {
            title: 'Chi tiet canh bao chay'
        }
    },
    ThayDoiMatKhau: {
        screen: ThayDoiMatKhau,
        navigationOptions: {
            title: 'Thay đổi mật khẩu'
        }
    },
    TaiKhoanDanCu: {
        screen: TaiKhoanDanCu,
        navigationOptions: {
            title: 'Tài khoản dân cư'
        }
    },
    TinNhanBQL: {
        screen: TinNhan,
        navigationOptions: {
            title: 'Tin nhắn'
        }
    },
    TinNhanDetails: {
        screen: TinNhanDetails,
        navigationOptions: {
        }
    },
    BinhLuanBQL: {
        screen: BinhLuanBQL,
        navigationOptions: {
            header : null,
        }
    },
    ChiTietSuCo: {
        screen: ChiTietSuCo,
        navigationOptions: {
            title: 'Chi tiết sự cố'
        }
    },

    //Stack Cu Dan
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
        screen: ThanhToanHoaDonCuDan,
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
        screen: GioiThieuCuDan,
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
    },
    SoanTinMoi: {
        screen: SoanTinMoi,
        navigationOptions: {
            title: 'Soạn tin mới'
        }
    },
    Contact: {
        screen: Contact,
        navigationOptions: {
            title: 'Contact'
        }
    },
    TinNhanDetailsCuDan: {
        screen: TinNhanDetailsCuDan,
        navigationOptions: {
        }
    },
    SoanTinMoiCuDan: {
        screen: SoanTinMoiCuDan,
        navigationOptions: {
            title: 'Soạn tin mới'
        }
    },
    TaoGroup: {
        screen: TaoGroup,
        navigationOptions: {
            title: 'Tin nhắn mới'
        }
    },
    SoanTinCuDan: {
        screen: SoanTinCuDan,
        navigationOptions: {
            title: 'Tạo bài viết'
        }
    },
    BinhLuanCuDan: {
        screen: BinhLuanCuDan,
        navigationOptions: {
            header: null
        }
    },
    ChiTietThongTinKDTCuDan: {
        screen: ChiTietThongTinKDTCuDan,
        navigationOptions: {
            header: "Thông tin chi tiết"
        }
    },
    ChuyenDiaDiem: {
        screen: ChuyenDiaDiem,
        navigationOptions: {
            title: "Chuyển địa điểm"
        }
    },
    ChuyenCanHo: {
        screen:ChuyenCanHo,
        navigationOptions: {
            title: "Chuyển căn hộ"
        }
    },
    ChuyenKDT: {
        screen: ChuyenKDT,
        navigationOptions: {
            title: 'Chuyển khu đô thị'
        }
    },
    RoiKDT: {
        screen: RoiKDT,
        navigationOptions: {
            title: 'Hủy tài khoản'
        }
    },
    DuyetTaiKhoan: {
        screen: DuyetTaiKhoan,
        navigationOptions: {
            header: null
        }
    },
    DanhMuc: {
        screen: DanhMuc,
        navigationOptions: {
            title: 'Danh mục'
        }
    },
    BanDangTin: {
        screen: BanDangTin,
        navigationOptions: {
            title: 'Bạn đăng tin'
        }
    },
    GiaRaoVat: {
        screen: GiaRaoVat,
        navigationOptions: {
            title: 'Giá rao vặt'
        },
    },
    HinhAnhRaoVat: {
        screen: HinhAnhRaoVat,
        navigationOptions: {
            title: 'Hình ảnh rao vặt',
        }
    },
    QuanHuyenRaoVat: {
        screen: QuanHuyenRaoVat,
        navigationOptions: {
            title: 'Quận huyện rao vặt'
        }
    },
    KhuVucRaoVat: {
        screen: KhuVucRaoVat,
        navigationOptions: {
            title: 'Khu vực rao vặt'
        }
    },
    TieuDeRaoVat: {
        screen: TieuDeRaoVat,
        navigationOptions: {
            title: 'Tiêu đề rao vặt'
        }
    },
    MoTaRaoVat: {
        screen: MoTaRaoVat,
        navigationOptions: {
            title: 'Mô tả rao vặt'
        }
    },
    XemLaiTinDang: {
        screen: XemLaiTinDang,
        navigationOptions: {
            title: 'Xem lại tin đăng'
        }
    },
    BanLa: {
        screen: BanLa,
        navigationOptions: {
            title: 'Bạn là'
        }
    },
    PickToaNha: {
        screen: PickToaNha,
        navigationOptions: {
            header:  null
        }
    },
    ThanhVienCanHo: {
        screen: ThanhVienCanHo,
        navigationOptions: {
            title: 'Thành viên căn hộ'
        }
    },
    ChiTietThanhVien: {
        screen: ChiTietThanhVien,
        navigationOptions: {
            title: 'Chi tiết thành viên'
        }
    },
    CreateGroupBQL: {
        screen: CreateGroupBQL,
    },
    CreateGroupCuDan: {
        screen: CreateGroupCuDan
    },
    ChatGroupBQL: {
        screen: ChatGroupBQL
    },
    ChatGroupCuDan: {
        screen: ChatGroupCuDan
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

export default Stack;