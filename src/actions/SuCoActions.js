
import {SearchSuCo, URL} from "../components/Api";

export const callApiSearchSuCo = (kdt_id,user_id,type) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchSuCo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    user_id: user_id,
                    type: type,
                    status: 0,
                    keyword: "",
                    page_index: 1,
                    page_size: 100,
                    option: 0,
                    from_date: "",
                    to_date: "",
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'SU_CO',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}