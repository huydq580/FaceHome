import { combineReducers } from 'redux'
import LoginReducers from './reducersBQl/LoginReducers';
import GetProfileReducers from './GetProfileReducers';
import KDTInfoReducers from './reducersBQl/KDTInfoReducers'
import CanhBaoChayNhanhReducers from './reducersBQl/CanhBaoChayNhanhReducers'
import BQLReducers from './reducersBQl/BQLReducers'
import QLDanCuReducers from './reducersBQl/QLDanCuReducers'
import NhaCuDanReducers from './reducersCuDan/NhaCuDanReducers'
import TinhThanhReducers from './TinhThanhReducers'
import QuanHuyenReducers from './QuanHuyenReducers'
import KDTReducers from './KDTReducers';
import UpdateProfileReducers from './reducersBQl/UpdateProfileReducers'
import SocketReducers from './SocketReducers';
import MessagesReducers from './MessagesReducers';
import MessagesDetailsReducers from './messages/MessagesDetailsReducers';
import SearchPostReducers from './SearchPostReducers'
import PostCmtReducers from './cudan/PostCmtReducers'
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
import ThemCanHoReducers from "./cudan/ThemCanHoReducers";
import ThanhVienCanHoReducers from "./cudan/ThanhVienCanHoReducers";
import RequestRegCodeReducers from "./cudan/RequestRegCodeReducers";
import SearchFaceHomeReducers from "./cudan/SearchFaceHomeReducers";
import UploadImageReducers from "./cudan/UploadImageReducers";
import CreatePostReducers from "./cudan/CreatePostReducers";
import PostSuCoReducers from "./suco/PostSuCoReducers";
import SearchSuCoReducers from "./suco/SearchSuCoReducers";
import SearchCuDanReducers from "./cudan/SearchCuDanReducers"
import CreateMsgGroupIDReducers from "./messages/CreateMsgGroupIDReducers";
import GetUserMsgReducers from "./messages/GetUserMsgReducers";


const appStore = combineReducers({
    LoginReducers,
    GetProfileReducers,
    KDTInfoReducers,
    CanhBaoChayNhanhReducers,
    BQLReducers,
    QLDanCuReducers,
    NhaCuDanReducers,
    TinhThanhReducers,
    QuanHuyenReducers,
    KDTReducers,
    UpdateProfileReducers,
    SocketReducers,
    MessagesReducers,
    MessagesDetailsReducers,
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
    DangKy : DangKyReducers,
    ThemCanHoReducers,
    ThanhVienCanHoReducers,
    RequestRegCodeReducers,
    SearchFaceHomeReducers,
    CreatePostReducers,
    UploadImageReducers,
    PostSuCoReducers,
    SearchSuCoReducers,
    SearchCuDanReducers,
    CreateMsgGroupIDReducers,
    GetUserMsgReducers




})

export default appStore