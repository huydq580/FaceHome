import {MsgGroupID, URL_SOCKET} from "../components/Api";

export const callApiMsgGroupID = (KDTID,UserID, FullName,IntUserID,UserID1,FullName1,IntUserID1, UserID2, FullName2, isCheck ) => {
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
                    PartID: "",
                    GroupMembers: JSON.stringify([
                        {
                            UserID: UserID,
                            FullName: FullName,
                            Avartar: "",
                            LinkProfile: "",
                            LinkMsg: "",
                            IntUserID: IntUserID,
                        },
                        {
                            UserID: UserID1,
                            FullName: FullName1,
                            Avartar: "",
                            LinkProfile: "",
                            LinkMsg: "",
                            IntUserID: IntUserID1,
                        }]
                    ),
                    GroupName: null, //chưa push
                    CreatedDate: "2017-11-10T00:00:00.000Z",
                    DayFlag: 20171110,
                    UserID: UserID2,
                    FullName: FullName2,
                    Avartar: null,
                    Status: 1,
                    LastMessage: null,
                    IsCreate: isCheck,
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
                console.log('exception')
            })
        })
    }
}