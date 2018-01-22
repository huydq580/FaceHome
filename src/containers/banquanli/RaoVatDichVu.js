import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import stylesContainer from "../../components/style";

class RaoVatDichVu extends Component {
    render () {
        return (
            <View style = {stylesContainer.container}>
                <View style = {{flex:1, marginTop:10, flexDirection:'row'}}>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Dịch vụ ăn uống</Text>
                    </View>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Thời trang(Quần áo - Giầy dép - Phụ kiện - Mỹ phẩm)</Text>
                    </View>
                </View>
                <View style = {{flex:1, marginTop:10, flexDirection:'row'}}>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Mẹ và bé </Text>
                    </View>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Việc làm </Text>
                    </View>
                </View>
                <View style = {{flex:1, marginTop:10, flexDirection:'row'}}>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Bất động sản </Text>
                    </View>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Oto-Xe máy</Text>
                    </View>
                </View>
                <View style = {{flex:1, marginTop:10, flexDirection:'row'}}>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Nội ngoại thất - Đồ gia dụng </Text>
                    </View>
                    <View style = {{flex:1, marginTop:10}}>
                        <Text>Điện tử </Text>
                    </View>
                </View>


            </View>
        );
    }
}
export default RaoVatDichVu