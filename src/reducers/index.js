import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers';
import NhaBQLReducers from './NhaBQLReducers';
import KDTInfoReducers from './KDTInfoReducers'
import CanhBaoChayNhanhReducers from './CanhBaoChayNhanhReducers'

const appStore = combineReducers({
    LoginReducers,
    NhaBQLReducers,
    KDTInfoReducers,
    CanhBaoChayNhanhReducers
})

export default appStore