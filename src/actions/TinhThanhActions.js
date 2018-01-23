import {GetData, URL} from "../components/Api";

export const callApiTinh = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + GetData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ma_vung: "",
                    option: 0,
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'TINH_THANH',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}

