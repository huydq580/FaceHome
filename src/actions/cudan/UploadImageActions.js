import {UploadImage, URL} from "../../components/Api";


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
                    type: 'UPLOAD_IMAGE',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}

