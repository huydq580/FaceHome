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
})

export default appStore