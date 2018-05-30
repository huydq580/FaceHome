import {InsertProfile, URL} from "../../components/Api";


export const CallApiThemCanHo = (IntUserID, UserID, UserName, Regcode, Email) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+InsertProfile, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IntUserID: IntUserID,
                    UserID: UserID,
                    UserName: UserName,
                    Regcode: Regcode,
                    Email: Email,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datanha1', data)
                // data1 = JSON.parse(data);
                dispatch({
                    type: 'THEM_CAN_HO',
                    payload: data.Value,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}