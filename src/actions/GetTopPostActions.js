import {GetTopPost, URL} from "../components/Api";

export const callApiGetTopPost = (user_id, kdt_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetTopPost, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    top: 15,
                    user_id: user_id,
                    kdt_id: kdt_id,
                    user_type: 255,
                    pin: 255,
                    option: 0,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'GET_TOP_POST',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}