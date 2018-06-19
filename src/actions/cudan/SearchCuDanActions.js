import { SearchDanCu, URL} from "../../components/Api";

export const callApiSearchCuDan = (keyword,kdt_id, block_id,floor_id, status) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchDanCu, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_size: 100,
                    page_index: 1,
                    from_date: "",
                    to_date: "",
                    keyword: keyword,
                    kdt_id: kdt_id,
                    block_id: block_id,
                    floor_id: floor_id,
                    status: status,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                // console.log('hhh', data1.Value)
                dispatch({
                    type: 'SEARCH_CUDAN',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}