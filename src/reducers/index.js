import { combineReducers } from 'redux';
import isLogin from './LoginReducers';

const appReducer = combineReducers({
    isLogin
})
export default rootReducer;