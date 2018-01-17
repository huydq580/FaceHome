import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers';
import NhaBQLReducers from './NhaBQLReducers';
import KDTInfoReducers from './KDTInfoReducers'
import CanhBaoChayNhanhReducers from './CanhBaoChayNhanhReducers'
import BQLReducers from './BQLReducers'

const appStore = combineReducers({
    LoginReducers,
    NhaBQLReducers,
    KDTInfoReducers,
    CanhBaoChayNhanhReducers,
    BQLReducers,

})

export default appStore