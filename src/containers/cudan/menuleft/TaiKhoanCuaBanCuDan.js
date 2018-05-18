import React, { Component } from 'react'
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
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {callApiNhaCuDan} from "../../../actions/actionsCuDan/NhaCuDanActions";
import StatusItemCuDan from "../../../components/status/StatusItemCuDan";
import SocketIOClient from "socket.io-client";
import {callApiSearchPost} from "../../../actions/SearchPostActions";
import {LINKIMG, SOCKET} from "../../../components/Api";
import ThanhVienItem from "../../../components/ThanhVienItem";



class TaiKhoanCuaBanCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            ArrThanhVien: [
                {
                    avt: 'https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg',
                    username: 'Thủy Top'
                },
                {
                    avt: 'https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg',
                    username: 'Thủy Top'
                },
                {
                    avt: 'https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg',
                    username: 'Thủy Top'
                }
            ]
        }
    }
    render () {
        const { navigation } = this.props;
        return (
            <ScrollView>
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
                        <View style = {styles.viewItem}>
                            <Text style = {{marginLeft: 5}}>Nguyễn Văn Hiệu</Text>
                        </View>

                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>Ngày sinh</Text>
                    <View style = {{flex:3,}}>
                        <View style = {styles.viewItem}>
                            <Text style = {{marginLeft: 5}}>16/01/1995</Text>
                        </View>

                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>SĐT</Text>
                    <View style = {{flex:3,}}>
                        <View style = {styles.viewItem}>
                            <Text style = {{marginLeft: 5}}>0963250395</Text>
                        </View>

                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>Giới tính</Text>
                    <View style = {{flex:3,}}>
                        <View style = {styles.viewItem}>
                            <Text style = {{marginLeft: 5}}></Text>
                        </View>

                    </View>

                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{flex:1, color: 'black'}}>Email</Text>
                    <View style = {{flex:3,}}>
                        <View style = {styles.viewItem}>
                            <Text style = {{marginLeft: 5}}>anhhieuuet@gmail.com</Text>
                        </View>

                    </View>

                </View>
                <View style = {{flexDirection: 'row', marginLeft: 20,marginTop: 5}}>
                    <Text style = {{ color: 'black'}}>Avatar</Text>
                    <Image
                        source={{
                            // uri: item.Avatar
                            uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                        }}
                        style={styles.image_circle}
                        resizeMode="cover">
                    </Image>
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={
                            require('../../../images/house-icon.png')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10, marginTop: 10}}>
                        <Text style = {{color: 'black'}}>
                            Căn hộ của bạn
                        </Text>
                        <View style = {{height:1, backgroundColor:'#9E9E9E', width: DEVICE_WIDTH}}/>
                    </View>


                </View>
                <View style = {{flexDirection: 'row', marginTop: 10, marginLeft: 15}}>
                    <Text style = {{color: '#039BE5', flex:2}}>
                        TSQ EUROLAND – T2B - P0908
                    </Text>
                    <Text  style = {{flex:1}}>Mã: ABCDEF</Text>
                </View>
                <View style = {{flexDirection: 'row', marginTop: 10, marginLeft: 15}}>
                    <Text style = {{color: '#039BE5', flex:2}}>
                        TSQ EUROLAND – T2B - P0908
                    </Text>
                    <Text  style = {{flex:1}}>Mã: ABCDEF</Text>
                </View>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate("ThemCanHoMoi")}>
                    <View>
                        <View style = {{height: 30, width: 150, marginLeft: DEVICE_WIDTH/2,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 10}}>
                            <Text>Thêm căn hộ mới</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={
                            require('../../../images/Thanhvien.png')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10, marginTop: 10}}>
                        <Text style = {{color: 'black'}}>
                            Thành viên căn hộ
                        </Text>
                        <View style = {{height:1, backgroundColor:'#9E9E9E', width: DEVICE_WIDTH}}/>
                    </View>

                </View>
                <Text style = {{color: '#039BE5', flex:2, marginLeft: 15, marginTop: 10}}>
                    TSQ EUROLAND – T2B - P0908
                </Text>
                <FlatList
                    data={this.state.ArrThanhVien}
                    numColumns={3}
                    renderItem={(item) => {
                        return (
                            <ThanhVienItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style = {{color: '#039BE5', flex:2, marginLeft: 15, marginTop: 10}}>
                    TSQ EUROLAND – T2B - P0908
                </Text>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={
                            require('../../../images/mua-hang.png')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10, marginTop: 10,}}>
                        <Text style = {{color: 'black'}}>
                            Nhà cung cấp dịch vụ
                        </Text>
                        <View style = {{height:1, backgroundColor:'#9E9E9E', width: DEVICE_WIDTH}}/>
                    </View>

                </View>
                <View style = {{marginHorizontal: 20, marginTop: 10,  marginBottom:10}}>
                    <Text style = {{color: "black"}}>Trở thành nhà cung cấp dịch vụ để khách hàng xung
                        quanh bạn có thể nhìn thấy và sử dụng dịch vụ của bạn</Text>
                </View>




            </ScrollView>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        infoCuDan: state.NhaCuDanReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiNhaCuDan: bindActionCreators(callApiNhaCuDan, dispatch),
        callApiSearchPost: bindActionCreators(callApiSearchPost, dispatch),
    }
};

TaiKhoanCuaBanCuDan = connect(mapStateToProps, mapDispatchToProps)(TaiKhoanCuaBanCuDan);
export default TaiKhoanCuaBanCuDan;
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
