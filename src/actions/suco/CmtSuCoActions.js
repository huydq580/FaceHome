import { SaveComment, URL} from "../../components/Api";

export const callApiPostCmtSuCo = (kdt_id, suco_id, user_id, full_name,avatar, content ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + SaveComment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kdt_id: kdt_id,
                    suco_id: suco_id,
                    user_id: user_id,
                    full_name: full_name,
                    avatar: avatar,
                    picture: "",
                    content:content ,
                    lang_name: "vi_VN"

                })
            }).then((response) => {
                return response.json();
            }).then(dataPost => {
                data1 = JSON.parse(dataPost);
                // console.log('post', data1)
                dispatch({
                    type: 'POST_CMT_SUCO',
                    payload: data1
                })
                resolve(dataPost);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}