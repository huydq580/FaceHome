import {Regrister, URL} from "../../components/Api";

export const CallApiRegCode = (Username, FullName, Password) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+Regrister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    KDTID: KDTID,
                    FullName: FullName,
                    PhoneNumber: PhoneNumber,
                    PartName: PartName,
                    UserID: UserID,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datanha1', data)
                // data1 = JSON.parse(data);
                dispatch({
                    type: 'REG_CODE',
                    payload: data.Value,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}