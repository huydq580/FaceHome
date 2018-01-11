import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers';
import NhaBQLReducers from './NhaBQLReducers';

const appStore = combineReducers({
    LoginReducers,
    NhaBQLReducers,
})

export default appStore