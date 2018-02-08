import {Get_Message, URL_SOCKET} from "../components/Api";

export const callApiGetMessage = (UserID, MsgGroupID) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL_SOCKET + Get_Message, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserID:UserID,
                    MsgGroupID:MsgGroupID,
                    Index:1
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('data_message', data)
                dispatch({
                    type: 'MESSAGE_DETAILS',
                    payload: data.ObjectResult
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}