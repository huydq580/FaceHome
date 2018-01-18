import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers';
import NhaBQLReducers from './NhaBQLReducers';
import KDTInfoReducers from './KDTInfoReducers'
import CanhBaoChayNhanhReducers from './CanhBaoChayNhanhReducers'
import BQLReducers from './BQLReducers'
import QLDanCuReducers from './QLDanCuReducers'

const appStore = combineReducers({
    LoginReducers,
    NhaBQLReducers,
    KDTInfoReducers,
    CanhBaoChayNhanhReducers,
    BQLReducers,
    QLDanCuReducers,

})

export default appStore