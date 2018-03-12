
import {ChuyenDiaDiem, URL} from "../../components/Api";

export const callApiChuyenDiaDiem = (profile_id , user_id, change_type, current_kdt_id, new_kdt_id, block_code, ma_tang,  ten_can_ho) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + ChuyenDiaDiem, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profile_id: profile_id,
                    user_id: user_id,
                    change_type: change_type,
                    current_kdt_id: current_kdt_id,
                    new_kdt_id: new_kdt_id,
                    block_code: block_code,
                    ma_tang: ma_tang,
                    ten_can_ho:  ten_can_ho,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // data1 = JSON.parse(data);
                // console.log('search su co action', data1.Value)
                dispatch({
                    type: 'CHUYEN_DIA_DIEM',
                    payload: data
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}