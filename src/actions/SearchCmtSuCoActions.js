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
                console.log('search su co action', data.Value)
                // data1 = JSON.parse(data);
                dispatch({
                    type: 'SEARCH_CMT_SUCO',
                    payload: data.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}