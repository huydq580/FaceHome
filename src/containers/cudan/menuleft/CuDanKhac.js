import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    FlatList,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native'
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import stylesContainer from "../../../components/style";

import images from "../../../components/images";
import Header from "../../../components/taikhoancuabancudan/Header";
import TitleView from "../../../components/taikhoancuabancudan/TitleView";
import ThongTinItem from "../../../components/cudankhac/ThongTinItem";

class CuDanKhac extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Tài khoản của bạn',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }

    render() {
        return (
            <ScrollView style={stylesContainer.container}>
                <View style = {{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-end'}}>
                    <Header
                        source={{uri: "https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg"}}
                        textName="Nguyễn Văn Hiệu"
                        Title=""/>
                    <TouchableOpacity onPress = {()=> {
                        this.props.navigation.navigate("TinNhanDetailsCuDan", {title: "Nguyen Van Hieu"})
                    }}>
                        <View style = {{marginRight: 15, borderRadius: 3, borderWidth: 1, height: 30, width: 90, alignItems: 'center', justifyContent: 'center', borderColor: "#616161", backgroundColor: "#EEEEEE" }}>
                            <Text>Nhắn tin</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TitleView titleText="Thông tin cơ bản"
                           source={images.thongtincoban}/>

                <ThongTinItem title='Họ tên'
                              value="Nguyễn Văn Hiệu"/>
                <ThongTinItem title='Ngày sinh'
                              value="16/01/1995"/>
                <ThongTinItem title='Số điện thoại'
                              value="0963250395"/>
                <ThongTinItem title='Giới tính'
                              value=""/>
                <ThongTinItem title='Email'
                              value="Anhhieuuet@gmail.com"/>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 10}}>
                    <Text style={{flex: 1, color: 'black'}}>Căn hộ</Text>
                    <View style={{flex: 3,}}>

                        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>TSQ EUROLAND – T2B - P0908</Text>


                    </View>

                </View>
                <TitleView titleText="Bài viết gần đây"
                           source={images.thongtincoban}/>
                <TitleView titleText="Tin rao vặt gần đây"
                           source={images.thongtincoban}/>
                <TitleView titleText="Thông tin nhà cung cấp"
                           source={images.thongtincoban}/>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ThongTinNhaCungCap')}>
                    <View style = {{justifyContent:'center',
                        alignItems:'center', borderWidth: 1,
                        borderRadius: 3, height: 30,marginLeft: DEVICE_WIDTH/2,
                        width: 90}}>
                        <Text>
                            Thông tin
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default CuDanKhac
const styles = StyleSheet.create({
    circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        marginTop: 10,
        marginLeft: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    viewItem: {
        borderWidth: 1,
        padding: 3, justifyContent: 'center',
        height: 28, width: 170
    },
    image_circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }


})