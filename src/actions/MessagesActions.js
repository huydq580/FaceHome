
import {Get_Message, Get_User, URL_SOCKET} from "../components/Api";

export const callApiGetUser = (UserID) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL_SOCKET + Get_User, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserID:UserID,
                    MsgGroupID:"",
                    Index:1
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('data_user',data)
                dispatch({
                    type: 'MESSAGE',
                    payload: data.ObjectResult
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}
