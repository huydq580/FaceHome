import {SearchRaoVat, URL} from "../../components/Api";

export const callApiSearchRaoVat = (keyword, userid, kdt_id, cat_id, ma_vung, post_type, user_type, status) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchRaoVat, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_size: 100,
                    page_index: 1,
                    keyword: keyword,
                    userid: userid,
                    kdt_id: kdt_id,
                    cat_id: cat_id,
                    ma_vung: ma_vung,
                    post_type: post_type,
                    user_type: user_type,
                    from_date: "",
                    to_date: "",
                    status: status,
                    option: 0,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'SEARCH_RAOVAT',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}