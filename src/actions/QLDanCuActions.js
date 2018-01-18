import { SearchDanCu, URL} from "../components/Api";

export const callApiSearchDanCu = (kdt_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchDanCu, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: 50,
                    page_size: 100,
                    page_index: 1,
                    from_date: "",
                    to_date: "",
                    keyword: "",
                    block_id: "",
                    floor_id: "",
                    status: 255,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'BQL',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}