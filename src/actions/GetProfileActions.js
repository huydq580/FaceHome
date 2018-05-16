import { GetProfileBQL, URL } from "../components/Api";



export const callApiGetProfile = (profile_id, user_id, user_type, option) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+GetProfileBQL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profile_id: profile_id,
                    user_id: user_id,
                    user_type: user_type,
                    option: option,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datanha1', data)
                data1 = JSON.parse(data);
                dispatch({
                    type: 'NHA_BQL',
                    payload: data1.Value,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}