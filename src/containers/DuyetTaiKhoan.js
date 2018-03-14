import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

class DuyetTaiKhoan extends Component {
    render (){
        return(
            <View style = {{flex:1, backgroundColor: 'white'}}>
                <View style = {{justifyContent:'center', alignItems: 'center', flex:1,marginHorizontal:15}}>
                    <Text style = {{color: 'red', fontSize:16}}>
                        Tài khoản của bạn đang được chờ Facehome xác minh, phê duyệt (thông thường trong 24h),nên các chức năng tạm thời bị khóa. Vui lòng liên hệ tới số hotline 0123456 hoặc gửi tới email: hotrobql@facehome.vn để được hỗ trợ kịp thời. Xin cảm ơn!
                    </Text>
                </View>
            </View>
        );
    }
}
export default DuyetTaiKhoan