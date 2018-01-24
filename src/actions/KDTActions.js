import { GetKDTParts, Search, URL } from "../components/Api";

export const callApiSearchKDT = (keyword,ma_vung ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + Search, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sf: {
                        keyword: keyword,
                        ma_vung: ma_vung,
                        search_in: 64,
                        page_size: 100,
                        page_number: 1,
                        option: 0
                    },
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                console.log('data1', data1)
                dispatch({
                    type: 'GET_KDT',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}
export const callApiGetKDT = (kdt_id, option, parent_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetKDTParts, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    option: 2,
                    parent_id:  '',
                    field: "",
                    value: "",
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                // console.log('data1', data1)
                dispatch({
                    type: 'GET_KDT',
                    payload1: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}