import {GetData, URL} from "../components/Api";

export const callApiQuanHuyen = (mavung) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ma_vung: mavung,
                    option: 1,
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                console.log('data1', data1)
                dispatch({
                    type: 'QUAN_HUYEN',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}