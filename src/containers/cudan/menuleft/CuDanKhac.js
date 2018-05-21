import React, { Component } from 'react';
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

class CuDanKhac extends  Component{
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Tài khoản của bạn',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    render (){
        return (
            <ScrollView style = {stylesContainer.container}>
                <View style = {{flexDirection:'row', alignItems: 'center'}}>
                    <Image
                        source={{
                            // uri: item.Avatar
                            uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                        }}
                        style={styles.circle}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10}}>
                        <Text style = {{color: 'black', fontWeight: 'bold'}}>Nguyễn Văn Hiệu</Text>
                        <Text>Xem trang nhà của bạn</Text>
                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={
                            require('../../../images/info.png')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10, marginTop: 10}}>
                        <Text style = {{color: 'black'}}>
                            Thông tin cơ bản
                        </Text>
                        <View style = {{height:1, backgroundColor:'#9E9E9E', width: DEVICE_WIDTH}}/>
                    </View>


                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 10}}>
                    <Text style = {{flex:1, color: 'black'}}>Họ tên</Text>
                    <View style = {{flex:3,}}>

                            <Text style = {{marginLeft: 5}}>Nguyễn Văn Hiệu</Text>

                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>Ngày sinh</Text>
                    <View style = {{flex:3,}}>
                            <Text style = {{marginLeft: 5}}>16/01/1995</Text>

                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>SĐT</Text>
                    <View style = {{flex:3,}}>

                            <Text style = {{marginLeft: 5}}>0963250395</Text>


                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>Giới tính</Text>

                    <View style = {{flex:3,}}>
                            <Text style = {{marginLeft: 5}}></Text>


                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>Email</Text>
                    <View style = {{flex:3,}}>

                            <Text style = {{marginLeft: 5}}>anhhieuuet@gmail.com</Text>


                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>Căn hộ</Text>
                    <View style = {{flex:3,}}>

                        <Text style = {{marginLeft: 5, fontWeight:'bold'}}>TSQ EUROLAND – T2B - P0908</Text>


                    </View>

                </View>
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
        borderRadius: 50/2,
        alignItems: 'center',
        justifyContent:'center'
    },
    info: {
        marginTop: 10,
        marginLeft: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent:'center'
    },

    viewItem: {
        borderWidth: 1,
        padding: 3, justifyContent:'center',
        height: 28, width: 170
    },
    image_circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        alignItems: 'center',
        justifyContent:'center'
    }


})