import {CreatePost, URL} from "../../components/Api";


export const callApiCreatePost = (kdt_id, user_id, profile_id, user_type, full_name, post_content, images, avatar) => {
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
                    profile_id: profile_id,
                    user_type: user_type,
                    full_name: full_name,
                    post_content: post_content,
                    images: images  ,
                    avatar: avatar,
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
                    type: 'CREATE_POST',
                    payload: data1
                })
                resolve(dataPost);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}