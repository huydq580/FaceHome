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
            ArrButton: [
                {
                    key: 1,
                    value: 1,
                    option: "Nam"
                },
                {
                    key: 2,
                    value: 2,
                    option: "Nữ"
                },
            ],
            itemSelected: 1, //button radio
        }
    }
    componentDidMount() {
        this.GetUserInHouse()

    }

    GetUserInHouse = () => {
        // console.log('hih')
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
                <Header source={
                    // uri: InfoUser[0].Avatar
                    !InfoUser[0].Avatar ? images.noavatar : {uri: InfoUser[0].Avatar}
                }
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

                <View style={{flexDirection: 'column', marginTop: 10}}>
                    <FlatList
                        data={this.state.ArrButton}
                        horizontal={true}
                        // style = {{marginLeft: 0}}
                        renderItem={({item}) => {
                            return (
                                <View style = {{flexDirection:'row', alignItems:'center' , marginLeft: 20}}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({itemSelected: item.key}, () => {
                                            console.log('itemselected', this.state.itemSelected)
                                        })
                                    }}>
                                        <View style = {{borderWidth: 1, height: 18, width: 18, borderRadius:9, justifyContent: "center", alignItems:'center', borderColor: "#BDBDBD"}}>
                                            <View style = {{borderWidth: 1, borderRadius: 5, width: 10, height: 10, backgroundColor: this.state.itemSelected === item.key ? '#616161' : '#BDBDBD', borderColor:"#BDBDBD"}}>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style = {{marginLeft: 10, color: "black", }}>{item.option}</Text>
                                </View>
                            )
                        }}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}

                    />
                    <View style = {{flexDirection:'row', marginLeft: 20}}>
                        <Text>Giới tính</Text>
                    </View>

                </View>

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
                <FlatList
                    data={this.state.ArrToa}
                    renderItem={({item}) => {
                        ArrThanhVien = item.value ? item.value : []
                        // console.log('ArrThanhVien', ArrThanhVien)
                        ArrThanhVien = JSON.parse(ArrThanhVien)
                        // console.log('ArrThanhVien', ArrThanhVien)
                        return (
                            <View>
                                <Text style = {{fontSize: 16, color: '#039BE5',fontWeight:'bold', marginLeft: 15, marginTop: 10}}>{item.KDT} - {item.Block} - {item.Floor} - {item.PartRoom}</Text>
                            </View>

                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate("QuanLyCanHo", {InfoHouse: this.state.ArrToa})}>
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
                        ArrThanhVien = item.value ? item.value : []
                        ArrThanhVien = JSON.parse(ArrThanhVien)
                        // console.log('ArrThanhVien', ArrThanhVien)
                        return (
                            <View>
                            <Text style = {{fontSize: 16, color: '#039BE5',fontWeight:'bold', marginLeft: 15, marginTop: 10}}>{item.KDT} - {item.Block} - {item.Floor} - {ArrThanhVien[0].PartName}</Text>
                                <FlatList
                                    data={ArrThanhVien}
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
                <TouchableOpacity>
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
                </TouchableOpacity>
                <TouchableOpacity>
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
                </TouchableOpacity>
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
