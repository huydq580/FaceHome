import {CreatePost, UploadImage, URL} from "../components/Api";

export const callApiUploadImage = (user_id, base64Data, extension) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + UploadImage, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    base64Data: base64Data,
                    extension: "jpg",
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'SOAN_TIN',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}

export const callApiCreatePost = (kdt_id, user_id, user_type, full_name, post_content, images) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + CreatePost, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    user_id: user_id,
                    user_type: user_type,
                    full_name: full_name,
                    post_content: post_content,
                    images: "",
                    avatar: "",
                    videos: "",
                    pin: 1,
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(dataPost => {
                data1 = JSON.parse(dataPost);
                // console.log('post', data1)
                dispatch({
                    type: 'SOAN_TIN',
                    payload1: data1
                })
                resolve(dataPost);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}