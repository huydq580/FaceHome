import { combineReducers } from 'redux'
import LoginReducers from './reducersBQl/LoginReducers';
import GetProfileReducers from './GetProfileReducers';
import KDTInfoReducers from './reducersBQl/KDTInfoReducers'
import CanhBaoChayNhanhReducers from './reducersBQl/CanhBaoChayNhanhReducers'
import BQLReducers from './reducersBQl/BQLReducers'
import QLDanCuReducers from './reducersBQl/QLDanCuReducers'
import NhaCuDanReducers from './reducersCuDan/NhaCuDanReducers'
import SoanTinReducers from './SoanTinReducers'
import TinhThanhReducers from './TinhThanhReducers'
import QuanHuyenReducers from './QuanHuyenReducers'
import KDTReducers from './KDTReducers';
import UpdateProfileReducers from './reducersBQl/UpdateProfileReducers'
import SuCoReducers from './SuCoReducers'
import SocketReducers from './SocketReducers';
import MessagesReducers from './MessagesReducers';
import MessagesDetailsReducers from './MessagesDetailsReducers';
import MsgGroupIDReducers from './MsgGroupIDReducers'
import SearchPostReducers from './SearchPostReducers'
import PostCmtReducers from './PostCmtReducers'
import SearchCmtReducers from './SearchCmtReducers'
import CmtSuCoReducers from './CmtSuCoReducers'
import SearchCmtSuCoReducers from './SearchCmtSuCoReducers';
import UpdateStatusReducers from './UpdateStatusReducers';
import ChuyenDiaDiemReducers from './reducersCuDan/ChuyenDiaDiemReducers';
import GetCategoryReducers from './raovat/GetCategoryReducers';
import GetDetailRaoVatReducers from './raovat/GetDetailRaoVatReducers';
import PostRaoVatReducers from './raovat/PostRaoVatReducers';
import SearchRaoVatReducers from './raovat/SearchRaoVatReducers';
import SearchHoaDonReducers from './hoadon/SearchHoaDonReducers';
import GetDetailsHoaDonReducers from './hoadon/GetDetailsHoaDonReducers';
import SubcribeReducers from './SubcribeReducers';
import DangKyReducers from "./cudan/DangKyReducers";


const appStore = combineReducers({
    LoginReducers,
    GetProfileReducers,
    KDTInfoReducers,
    CanhBaoChayNhanhReducers,
    BQLReducers,
    QLDanCuReducers,
    NhaCuDanReducers,
    SoanTinReducers,
    TinhThanhReducers,
    QuanHuyenReducers,
    KDTReducers,
    UpdateProfileReducers,
    SuCoReducers,
    SocketReducers,
    MessagesReducers,
    MessagesDetailsReducers,
    MsgGroupIDReducers,
    SearchPostReducers,
    PostCmtReducers,
    SearchCmtReducers,
    CmtSuCoReducers,
    SearchCmtSuCoReducers,
    ChuyenDiaDiemReducers,
    UpdateStatusReducers,
    GetCategoryReducers,
    GetDetailRaoVatReducers,
    PostRaoVatReducers,
    SearchRaoVatReducers,
    SearchHoaDonReducers,
    GetDetailsHoaDonReducers,
    SubcribeReducers,

    //Moi
    DangKy : DangKyReducers

})

export default appStore