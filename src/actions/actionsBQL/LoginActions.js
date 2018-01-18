import {Login, URL} from "../../components/Api";

// let nextTodoId = 0
// export const addTodo = text => {
//     return {
//         type: 'LOGIN',
//         id: nextTodoId++,
//         text
//     }
// }


export const callApiLogin = (sdt, mk) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+Login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    so_dien_thoai: sdt,
                    mat_khau: mk,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                // console.log('data response', data1);
                // console.log('data response', data.IsError);
                dispatch({
                    type: 'LOGIN',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}