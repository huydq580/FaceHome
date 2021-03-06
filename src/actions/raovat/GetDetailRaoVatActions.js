import {GetDetailRaovat, URL} from "../../components/Api";

export const callApiGetDetailRaoVat = (post_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetDetailRaovat, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_size: 100,
                    page_index: 1,
                    keyword: "",
                    post_id: post_id,
                    from_date: "",
                    to_date: "",
                    user_id: "",
                    user_type: 255,
                    option: 0,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'GET_DETAIL_RAOVAT',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}