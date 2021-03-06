import { SearchDanCu, URL} from "../../components/Api";

export const callApiSearchDanCu = (kdt_id,keyword, block_id,floor_id, status) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SearchDanCu, {
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
                    keyword: keyword,
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
                    type: 'INFO_CUDAN',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}