import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import stylesContainer from "../../../components/style";

class ChiTietThongTinKDTCuDan extends Component {
    render (){
        return(
            <View style = {[stylesContainer.container, {justifyContent:'center', alignItems:'center'}]}>
                <Text>
                    Hiện tại chưa có thông tin trạm y tế , trường mầm non tiểu học , THCS, THPT trong khu vực. Đề nghị BQL cập nhập sớm để cư dân trong KĐT thuận tiện sử dụng. Xin cảm ơn
                </Text>
            </View>
        );
    }
}
export default ChiTietThongTinKDTCuDan;