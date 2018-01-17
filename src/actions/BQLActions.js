import {SearchBql, URL} from "../components/Api";

export const callApiGetBQL = (kdt_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchBql, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    page_size: 100,
                    page_index: 1,
                    from_date: "",
                    to_date: "",
                    keyword: "",
                    status: 255,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: 'BQL',
                    payload: data.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}