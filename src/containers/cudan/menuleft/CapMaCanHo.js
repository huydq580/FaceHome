import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import stylesContainer from "../../../components/style";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

class CapMaCanHo extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: params.title,
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    render() {
        return (
            <View style = {stylesContainer.container}>
                <View style = {{marginHorizontal:20, marginTop:10}}>
                    <Text style = {{color: 'black'}}>
                        Chung cư cao cấp Euro Land được xây dựng trên diện tích
                        8.238 m2 tại Khu Đô thị Mỗ Lao, phường Mộ Lao, quận Hà
                        Đông, thành phố Hà Nội. Euro Land nằm giữa hai tuyến đường
                        chính là Quốc lộ 6 và đường Lê Văn Lương kéo dài, cách Trung
                        tâm Hội nghị Quốc gia khoảng 1,5 km. Đây là một trong những
                        dự án do Công ty TSQ Việt Nam làm Chủ Đầu tư.
                        Dự án do Công ty Bruce Henderson Architects Pty. Ltd
                        (Australia) tư vấn thiết kế kiến trúc nội ngoại thất công trình;
                        Tập đoàn IDT International Group (Australia) làm tư vấn thiết
                        kế kết cấu, hệ thống cơ điện kỹ thuật công trình và Tập đoàn
                        Gleeds (Anh) trực tiếp quản lý Dự án
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Nhập họ tên '
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Nhập số điện thoại'
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    {/*<Text>(*)</Text>*/}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 5, marginHorizontal: 50, flex: 1}}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Phòng'
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                </View>
                <TouchableOpacity>
                    <View style = {{justifyContent:'center', alignItems:'center', marginTop:10}}>
                        <View style = {{height: 30,backgroundColor:'#E0E0E0', width: DEVICE_WIDTH/3,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 10}}>
                            <Text>Yêu cầu cấp mã</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}
export default CapMaCanHo