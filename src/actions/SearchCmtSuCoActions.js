import {GetComment, URL} from "../components/Api";

export const callApiSearchCmtSuco = (kdt_id , suco_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetComment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    suco_id: suco_id,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                // console.log('search su co action', data1.Value)
                dispatch({
                    type: 'SEARCH_CMT_SUCO',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}