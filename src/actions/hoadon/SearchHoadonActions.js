
import {SearchHoadon, URL} from "../../components/Api";

export const callApiSearchHoadon = (kdt_id, block_id, can_ho) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchHoadon, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_index: 1,
                    page_size: 100,
                    kdt_id: kdt_id,
                    block_id: block_id,
                    can_ho: can_ho,
                    status: 255,
                    pay_status: 255,
                    option: 0,
                    month: 0,
                    year: 0,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'SEARCH_HOADON',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}