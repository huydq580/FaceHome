import { SearchPost, URL } from "../components/Api";

export const callApiSearchPost = (page_index, kdt_id,user_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchPost, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_size: 20,
                    page_index: page_index,
                    keyword: "",
                    kdt_id: kdt_id,
                    from_date: "",
                    to_date: "",
                    user_id: user_id,
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
                    type: 'SEARCH_POST',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}