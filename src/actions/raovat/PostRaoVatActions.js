import {PostRaoVat, URL} from "../../components/Api";

export const callApiPostRaoVat = (
        user_id,
        user_name,
        full_name,
        dia_chi,
        avatar,
        cat_id,
        cat_name,
        tieu_de,
        images,
        gia,
        mo_ta,
        ma_vung,
        ten_vung,
        kdt_id,
        lien_he,
        rv_type,
        user_type



    ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(URL + PostRaoVat, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    user_name: user_name,
                    full_name: full_name,
                    dia_chi: dia_chi,
                    avatar: avatar,
                    cat_id: cat_id,
                    cat_name: cat_name,
                    tieu_de: tieu_de,
                    images: images,
                    gia: gia,
                    mo_ta: mo_ta,
                    ma_vung: ma_vung,
                    ten_vung: ten_vung,
                    kdt_id: kdt_id,
                    lien_he: lien_he,
                    rv_type: rv_type,
                    user_type: user_type,
                    lang_name: "vi_VN"
                })
            }).then((response) => {
                return response.json();
            }).then(data => {
                data1 = JSON.parse(data);
                dispatch({
                    type: 'POST_RAOVAT',
                    payload: data1.Value
                })
                resolve(data);
            }).catch(e => {
                console.log('exception')
            })
        })
    }
}