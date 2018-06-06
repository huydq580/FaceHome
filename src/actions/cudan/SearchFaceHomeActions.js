import { SearchFaceHome, URL} from "../../components/Api";

export const CallApiSearchFaceHome = (KeyWord, KDTID) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL+SearchFaceHome, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    KeyWord: KeyWord,
                    KDTID: KDTID,
                    TypeSearch: 0,
                    Page_Index: 1,
                    Page_Size: 100,
                    Option: 0,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('datanha1', data)
                // data1 = JSON.parse(data);
                dispatch({
                    type: 'SEARCH_FACEHOME',
                    payload: data.Value,
                })
                resolve(data);
            }).catch(e => {
                console.log('exception', e)
            })
        })
    }
}