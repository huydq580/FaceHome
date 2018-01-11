import { GetProfileBQL, URL } from "../components/Api";

let nextTodoId = 0


export const callApiNha = (user_id, user_type) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+GetProfileBQL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    user_type: user_type,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: 'NHA_BQL',
                    id: nextTodoId++,
                    text: 'call api',
                    dataNha: data,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}