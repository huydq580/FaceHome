import {PostCanhBaoChay, URL} from "../components/Api";



export const callApiCanhBaoChay = (kdt_id, user_id, name, mota) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+ PostCanhBaoChay, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    user_id: user_id,
                    full_name: name,
                    mo_ta: mota,
                    avatar: '',
                    image: '',
                    video: '',
                    source:1,
                    type: 0,
                    status: 0,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: 'CANH_BAO_CHAY',
                    payload: data,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}