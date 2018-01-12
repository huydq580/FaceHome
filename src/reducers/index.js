import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers';
import NhaBQLReducers from './NhaBQLReducers';
import KDTInfoReducers from './KDTInfoReducers'

const appStore = combineReducers({
    LoginReducers,
    NhaBQLReducers,
    KDTInfoReducers,
})

export default appStore