import {MsgGroupID, URL_SOCKET} from "../../components/Api";

export const callApiCreateMsgGroupID = (KDTID, IntUserID, GroupMembers, GroupName, FullName, Avatar ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL_SOCKET + MsgGroupID, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    MsgGroupID: "",
                    KDTID: KDTID,
                    IntUserID: IntUserID,
                    GroupMembers: GroupMembers,
                    GroupName: GroupName,
                    FullName: FullName,
                    Avatar: Avatar,
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('data_message', data)
                dispatch({
                    type: 'MSGGROUPID',
                    payload: data.ObjectResult
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}