import { UpdateProfile, URL } from "../../components/Api";

export const callApiUpdateProfile = (profile_id,user_id, field, value ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + UpdateProfile, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profile_id: profile_id,
                    user_id: user_id,
                    field: field,
                    value: value,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('data', data)
                // data1 = JSON.parse(data);
                dispatch({
                    type: 'UPDATE_PROFILE',
                    payload: data
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}