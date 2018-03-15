import {GetCategory, URL} from "../../components/Api";

export const callApiGetCategory = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetCategory, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datacategory', data)
                data1 = JSON.parse(data);
                dispatch({
                    type: 'GET_CATEGORY_RAOVAT',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}