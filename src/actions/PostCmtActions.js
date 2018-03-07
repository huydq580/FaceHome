import {CreateCmt, URL} from "../components/Api";

export const callApiPostCmt = (post_id, user_id, user_type, full_name,content ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + CreateCmt, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: post_id,
                    user_id: user_id,
                    user_type: user_type,
                    full_name: full_name,
                    avatar: "",
                    images: "",
                    videos: "",
                    content: content,
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(dataPost => {
                data1 = JSON.parse(dataPost);
                // console.log('post', data1)
                dispatch({
                    type: 'POST_CMT',
                    payload: data
                })
                resolve(dataPost);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}