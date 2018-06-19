import {SearchSuCo, URL} from "../../components/Api";


export const callApiSearchSuCo = (kdt_id,type, emergency ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchSuCo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_index: 1,
                    page_size: 100,
                    kdt_id: kdt_id,
                    keyword: "",
                    user_id: "",
                    intUser: "",
                    status: 255,
                    type: type,
                    option: 0,
                    from_date: "",
                    to_date: "",
                    emergency: emergency,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(dataPost => {
                data1 = JSON.parse(dataPost);
                // console.log('post', data1)
                dispatch({
                    type: 'SEARCH_SUCO',
                    payload: data1
                })
                resolve(dataPost);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}