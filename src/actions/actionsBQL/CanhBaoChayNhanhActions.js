import {PostCanhBaoChay, SearchCanhBaoChay, URL} from "../../components/Api";



export const callApiCanhBaoChay = (kdt_id, user_id, name, mota) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+ PostCanhBaoChay, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    user_id: user_id,
                    full_name: name,
                    mo_ta: mota,
                    avatar: '',
                    image: '',
                    video: '',
                    source:1,
                    type: 0,
                    status: 0,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: 'CANH_BAO_CHAY',
                    payload1: data,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}

export const callApiSearchCanhBaoChay = (kdt_id, user_id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+ SearchCanhBaoChay, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    user_id: user_id,
                    page_index:1,
                    page_size:100,
                    keyword:'',
                    status:0,
                    type: 0,
                    source: 1,
                    option: 0,
                    from_date: "20170116",
                    to_date: "20190116",
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: 'CANH_BAO_CHAY',
                    payload2: data,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}
