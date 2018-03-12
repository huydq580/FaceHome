import { combineReducers } from 'redux'
import LoginReducers from './reducersBQl/LoginReducers';
import NhaBQLReducers from './reducersBQl/NhaBQLReducers';
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
import ChuyenDiaDiemReducers from './reducersCuDan/ChuyenDiaDiemReducers';

const appStore = combineReducers({
    LoginReducers,
    NhaBQLReducers,
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
    ChuyenDiaDiemReducers
})

export default appStore