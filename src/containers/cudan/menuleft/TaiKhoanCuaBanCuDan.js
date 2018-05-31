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
import {callApiSearchPost} from "../../../actions/SearchPostActions";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import Header from "../../../components/taikhoancuabancudan/Header";
import images from "../../../components/images";
import TitleView from "../../../components/taikhoancuabancudan/TitleView";
import ThongTinItem from "../../../components/taikhoancuabancudan/ThongTinItem";
import ThanhVienItem from "../../../components/ThanhVienItem";
import {CallApiThanhVienCanHo} from "../../../actions/cudan/ThanhVienCanHoActions";



class TaiKhoanCuaBanCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Tài khoản của bạn',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
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
            ],
            ArrToa: [],
        }
    }
    componentDidMount() {
        this.GetUserInHouse()

    }

    GetUserInHouse = () => {
        console.log('hih')
        const { InfoUser, CallApiThanhVienCanHo } = this.props
        if (InfoUser.length <= 0 ) {
            return null
        }
        CallApiThanhVienCanHo(InfoUser[0].UserID, 0).then(dataRes => {
            this.setState({
                ArrToa: dataRes.Value ? dataRes.Value : null
            })

        })
    }
    render () {

        const { InfoUser } = this.props
        if (InfoUser.length <= 0 ) {
            return null
        }
        const { navigation } = this.props;
        return (
            <ScrollView style = {stylesContainer.container}>
                <Header source = {{uri: "https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg"}}
                        textName = {InfoUser[0].FullName}
                        Title = "Xem trang cá nhân của bạn"/>
                <TitleView titleText = "Thông tin cơ bản"
                           source = {images.thongtincoban}/>
                <ThongTinItem
                              value = {InfoUser[0].FullName}
                              title = 'Họ tên'/>
                <ThongTinItem title = 'Ngày sinh'
                              value = "16/01/1995"/>
                <ThongTinItem title = 'Số điện thoại'
                              value = "0963250395"/>
                <ThongTinItem title = 'Giới tính'
                              value = ""/>
                <ThongTinItem title = 'Email'
                              value = "anhhieuuet@gmail.com"/>

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
                <TitleView titleText = "Căn hộ của bạn"
                           source = {images.thongtincoban}/>
                <View style = {{flexDirection: 'row', marginTop: 10, marginLeft: 15}}>
                    <Text style = {{color: '#039BE5', flex:2, fontWeight:'bold'}}>
                        TSQ EUROLAND – T2B - P0908
                    </Text>
                    <Text  style = {{flex:1}}>Mã: ABCDEF</Text>
                </View>
                <View style = {{flexDirection: 'row', marginTop: 10, marginLeft: 15}}>
                    <Text style = {{color: '#039BE5', flex:2, fontWeight:'bold'}}>
                        TSQ EUROLAND – T2B - P0908
                    </Text>
                    <Text  style = {{flex:1}}>Mã: ABCDEF</Text>
                </View>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate("QuanLyCanHo")}>
                    <View>
                        <View style = {{height: 30, width: 150, marginLeft: DEVICE_WIDTH/2,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 10}}>
                            <Text>Quản lý căn hộ</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TitleView titleText = "Thành viên căn hộ"
                           source = {images.thongtincoban}/>
                <FlatList
                    data={this.state.ArrToa}
                    renderItem={({item}) => {
                        return (
                            <View>
                            <Text style = {{fontSize: 16, color: '#039BE5',fontWeight:'bold', marginLeft: 15, marginTop: 10}}>{item.KDT} - {item.Block} - {item.Floor}</Text>
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
                            </View>

                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/*<Text style = {{color: '#039BE5', flex:2, marginLeft: 15, marginTop: 10}}>*/}
                    {/*TSQ EUROLAND – T2B - P0908*/}
                {/*</Text>*/}

                {/*<Text style = {{color: '#039BE5', flex:2, marginLeft: 15, marginTop: 10}}>*/}
                    {/*TSQ EUROLAND – T2B - P0908*/}
                {/*</Text>*/}
                <TitleView titleText = "Nhà cung cấp dịch vụ"
                           source = {images.thongtincoban}/>
                <View style = {{marginHorizontal: 20, marginTop: 10,  marginBottom:10}}>
                    <Text style = {{color: "black"}}>Trở thành nhà cung cấp dịch vụ để khách hàng xung
                        quanh bạn có thể nhìn thấy và sử dụng dịch vụ của bạn</Text>
                </View>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('DangKyNhaCungCap')}>
                    <View style = {{justifyContent:'center',
                        alignItems:'center', borderWidth: 1,
                        borderRadius: 3, height: 30,marginLeft: DEVICE_WIDTH/2,
                    width: 90}}>
                        <Text>
                            Đăng kí
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style = {{flexDirection: 'row',marginTop: 10, alignItems:'center'}}>
                    <Image
                        source={
                            require('../../../images/changephone.png')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <Text style ={{marginLeft: 10,marginTop: 10, color: 'black'}}>Đổi số điện thoại</Text>
                </View>
                <View style = {{flexDirection: 'row',marginTop: 5, alignItems:'center', marginBottom: 10}}>
                    <Image
                        source={
                            require('../../../images/changepass.jpeg')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <Text style ={{marginLeft: 10,marginTop: 10, color: 'black'}}>Đổi mật khẩu</Text>
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
        CallApiThanhVienCanHo: bindActionCreators(CallApiThanhVienCanHo, dispatch),
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
