import {Regrister, URL} from "../../components/Api";

export const CallApiDangKy = (Username, FullName, Password) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+Regrister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Username: Username,
                    FullName: FullName,
                    Password: Password,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datanha1', data)
                // data1 = JSON.parse(data);
                dispatch({
                    type: 'DANG_KY',
                    payload: data.Value,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}