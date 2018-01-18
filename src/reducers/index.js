import { combineReducers } from 'redux'
import LoginReducers from './reducersBQl/LoginReducers';
import NhaBQLReducers from './reducersBQl/NhaBQLReducers';
import KDTInfoReducers from './reducersBQl/KDTInfoReducers'
import CanhBaoChayNhanhReducers from './reducersBQl/CanhBaoChayNhanhReducers'
import BQLReducers from './reducersBQl/BQLReducers'
import QLDanCuReducers from './reducersBQl/QLDanCuReducers'

const appStore = combineReducers({
    LoginReducers,
    NhaBQLReducers,
    KDTInfoReducers,
    CanhBaoChayNhanhReducers,
    BQLReducers,
    QLDanCuReducers,

})

export default appStore