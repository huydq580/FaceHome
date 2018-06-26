import {LoginLogoutSubcribe, URL_SOCKET} from "../components/Api";

export const callApiSubcribe = (IntUserID,  IsSubscribe) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL_SOCKET + LoginLogoutSubcribe, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IntUserID: IntUserID,
                    IsSubscribe: IsSubscribe


                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: 'SUBCRIBE',
                    payload: data.Error
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}
