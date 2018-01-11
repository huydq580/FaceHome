import {Login, URL} from "../components/Api";

let nextTodoId = 0
export const addTodo = text => {
    return {
        type: 'LOGIN',
        id: nextTodoId++,
        text
    }
}


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
                // console.log('data response', data);
                dispatch({
                    type: 'LOGIN',
                    id: nextTodoId++,
                    text: 'call api',
                    dataLogin: data
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}