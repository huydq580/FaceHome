import {MsgGroup_Kdtpart, URL_SOCKET} from "../../components/Api";


export const callApiCreateGroupFloor = (IntUserID, KDTID) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL_SOCKET + MsgGroup_Kdtpart, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IntUserID:IntUserID,
                    KDTID:KDTID

                })
            }).then((response) => {
                return response.json();
            }).then(dataPost => {
                console.log('dataPost', dataPost)
                // data = JSON.parse(dataPost);
                dispatch({
                    type: 'CREATE_GROUP_FLOOR',
                    payload: dataPost
                })
                resolve(dataPost);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}