import {Get_Message, URL_SOCKET} from "../../components/Api";

export const callApiGetMessage = (IntUserID, MsgGroupID, Index) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL_SOCKET + Get_Message, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IntUserID: IntUserID,
                    MsgGroupID:MsgGroupID,
                    Index: Index,
                    Today: 1,
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('data_message', data)
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