import {Get_User, URL_SOCKET} from "../../components/Api";

export const callApiGetUserMsg = (IntUserID) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL_SOCKET + Get_User, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IntUserID: IntUserID,
                    Index:1
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('data_user',data)
                dispatch({
                    type: 'MESSAGE',
                    payload: data.ObjectResult
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}
