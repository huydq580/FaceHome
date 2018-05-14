import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
class ShowModal extends Component {
    render () {
        return (
            <View style = {{flex:1, marginHorizontal: 10, borderRadius:5}}>
                <Text style = {{marginTop: 20, color: "black"}}>Chào mừng bạn đến với Cộng đồng chung cư Facehome.</Text>
                <Text style = {{marginTop: 5, color: 'black'}}>Bạn chưa sở hữu căn hộ nào, để sử dụng đầy đủ các tính năng của sản phẩm và kết nối với cộng đồng khu đô thị bạn đang sống vui lòng thêm căn hộ của bạn. Hoặc bạn có thể thêm căn hộ sau bằng cách vào mục tài khoản cá nhân và thêm căn hộ. </Text>
                <View style = {{flexDirection:'row', marginTop: 15, justifyContent: 'center'}}>
                    <TouchableOpacity>
                        <View style = {{backgroundColor:'#FFA726', borderWidth:1, height: 30, width: 90, borderRadius: 4, justifyContent:'center', alignItems:'center'}}>
                            <Text>Thêm ngay</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {{backgroundColor:'#FFA726', marginLeft: 20, borderWidth:1, height: 30, width: 90, borderRadius: 4, justifyContent:'center', alignItems:'center'}}>
                            <Text>Để sau</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default ShowModal