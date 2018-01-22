import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import stylesContainer from "../../components/style";

class DichVuGanKDT extends Component {
    render (){
        return(
            <View style = {stylesContainer.container}>
                <Text>
                    Tin khuyến mãi
                </Text>
                <View>
                    <Text>Tin khuyến mãi 1</Text>
                    <Text>Tin khuyến mãi 2</Text>
                    <Text>Tin khuyến mãi 3</Text>
                </View>
                <Text>Tên củă hàng, dịch vụ số 1 ...</Text>
                <View>
                    <Image></Image>
                    <View>
                        <Text>
                            
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default DichVuGanKDT
