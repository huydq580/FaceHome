import * as ActionType from '../actions/ActionTypes';

const initState = {socket: null, isJoinChat: false, userSocket: null};
const SocketReducers = (state = initState, action) => {
        switch (action.type) {
            case ActionType.CONNECTED:
                return {
                    ...state, socket: action.socket
                }
                    ;

            case ActionType.DISCONECT:
                return {
                    ...state, socket: null,isJoinChat: false, userSocket: null
                };
            default:
                return state;
        }

    }
;

export default SocketReducers;