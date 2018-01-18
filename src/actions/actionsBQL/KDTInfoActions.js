import {AroundKdtInfo, URL} from "../../components/Api";



export const callApiInfoKDT = (page_size, page_index, kdt_id, type , option) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+ AroundKdtInfo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_size: page_size,
                    page_index: page_index,
                    kdt_id: kdt_id,
                    type: type,
                    option: option,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: 'KDT_INFO',
                    payload: data,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}