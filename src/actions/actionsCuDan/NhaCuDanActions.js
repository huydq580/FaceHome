

import {GetProfileCuDan, URL} from "../../components/Api";

export const callApiNhaCuDan = (profile_id, user_id, user_type) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+GetProfileCuDan, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profile_id: profile_id,
                    user_id: user_id,
                    user_type: user_type,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datanha1', data)
                data1 = JSON.parse(data);
                dispatch({
                    type: 'NHA_CUDAN',
                    payload: data1.Value,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}