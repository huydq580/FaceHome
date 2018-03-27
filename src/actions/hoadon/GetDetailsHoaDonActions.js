import {GetDetailHoaDon, URL} from "../../components/Api";

export const callApiGetDetailsHoaDon = (kdt_id, id, user_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetDetailHoaDon, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    id: id,
                    user_id: user_id,
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'DETAILS_HOADON',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}