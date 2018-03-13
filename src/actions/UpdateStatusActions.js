
import {UpdateStatus, URL} from "../components/Api";

export const callApiUpdateStatus = (impacts_role_id, profile_id, user_id, new_status) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + UpdateStatus, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    impacts_role_id: impacts_role_id,
                    profile_id: profile_id,
                    user_id: user_id,
                    new_status: new_status,
                    value: "",
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // data1 = JSON.parse(data);
                dispatch({
                    type: 'UPDATE_STATUS',
                    payload: data.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}