import {LoadUserProfile, URL} from "../components/Api";



export const callApiGetProfile = (user_id, option) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+LoadUserProfile, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    option: option,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datanha1', data)
                // data1 = JSON.parse(data);
                // console.log('dataProfile', data1)
                dispatch({
                    type: 'GET_PROFILE',
                    payload: data.Value,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}