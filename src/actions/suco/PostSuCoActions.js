import {PostSuco , URL} from "../../components/Api";


export const callApiPostSuCo = (kdt_id, user_id,intUser , full_name, avatar,ten_can_ho, media,type, emergency, post_content, title ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + PostSuco, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    user_id: user_id,
                    intUser: intUser,
                    full_name: full_name,
                    avatar: avatar,
                    ten_can_ho: ten_can_ho,
                    media: media,
                    type: type,
                    emergency: emergency,
                    post_content: post_content,
                    title: title,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(dataPost => {
                data1 = JSON.parse(dataPost);
                // console.log('post', data1)
                dispatch({
                    type: 'POST_SUCO',
                    payload: data1
                })
                resolve(dataPost);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}