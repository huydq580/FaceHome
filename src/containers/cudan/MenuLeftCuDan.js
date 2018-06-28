import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView, TouchableOpacity, StyleSheet,
    Image, AsyncStorage

} from 'react-native';
import Dimensions from 'Dimensions';
import Modal from "react-native-modal";
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemLeftMenu from "../../components/leftmenu/ItemLeftMenu";
import {connect} from "react-redux";
import {LINKIMG} from "../../components/Api";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";
import {bindActionCreators} from "redux";
import {callApiSubcribe} from "../../actions/SubcribeActions";
import {NavigationActions} from "react-navigation";

class MenuLeftCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibleModal: null
        };
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {

            headerStyle: { backgroundColor: BACKGROUND_HEADER },
            headerTitleStyle: { color: TITLE_HEADER },
            title: 'Menu'

        }

    }
    UnSubcribe = () =>  {
        const {InfoUser, callApiSubcribe} = this.props;
        if (InfoUser.length <=0) {
            return null
        }
        callApiSubcribe(InfoUser[0].UserID, false).then(dataRes => {
            // console.log('dataUnSubcribe',dataRes )

        })
    }
    render (){

        return (
            <ScrollView style = {{flexDirection:'column', backgroundColor:'white'}}>
                <ItemLeftMenu title ="Tài khoản của bạn"
                              nameIcon = "home"
                              onPress = {()=> this.props.navigation.navigate('TaiKhoanCuaBanCuDan')}
                />
                <ItemLeftMenu title ="Hàng xóm của bạn"
                              nameIcon = "home"
                              onPress = {()=> this.props.navigation.navigate('HangXom')}
                />
                <ItemLeftMenu title ="Thông tin cần biết quanh khu đô thị"
                              nameIcon = "account-multiple"
                              onPress = {() => this.props.navigation.navigate('ThongTinKDTCuDan')}
                />
                <ItemLeftMenu title ="Liên hệ Ban Quản Lý"
                              nameIcon = "contacts"
                              onPress = {() => this.props.navigation.navigate('LienLacNhanhBQL')}
                />

                {/*<ItemLeftMenu title ="Đăng kí dịch vụ KĐT"*/}
                              {/*nameIcon = "lock-open"*/}
                              {/*onPress = {()=>this.props.navigation.navigate('DangKyDichVuKDT')}*/}
                {/*/>*/}

                <ItemLeftMenu title ="Phản ánh sự cố"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('BaoSuCoKDT')}
                />
                <ItemLeftMenu title ="Chợ FaceHome"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('ChoFaceHome')}
                />
                <ItemLeftMenu title ="Bếp ăn gia đình"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('BepAnGiaDinh')}
                />

                {/*<ItemLeftMenu title ="Cảnh báo cháy nhanh"*/}
                              {/*nameIcon = "phone-in-talk"*/}
                              {/*onPress = {()=> this.props.navigation.navigate('CanhBaoChayNhanhCuDan')}*/}
                {/*/>*/}
                <ItemLeftMenu title ="Hướng dẫn"
                              nameIcon = "bell-ring"
                              onPress = {()=> this.props.navigation.navigate('HuongDan')}
                />
                <ItemLeftMenu title ="Giới thiệu"
                              nameIcon = "bell-ring"
                              onPress = {()=> thirops.navigation.navigate('GioiThieuCuDan')}
                />

                <ItemLeftMenu title ="Đăng xuất"
                              nameIcon = "web"
                              onPress = {()=> this.setState({ visibleModal: 5 })}
                />
                <Modal
                    isVisible={this.state.visibleModal === 5}
                    style={styles.bottomModal}
                >
                    <View>
                        <TouchableOpacity onPress =  {()=> {
                            this.UnSubcribe()
                            AsyncStorage.removeItem('UserID')
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: 'DangNhap',
                                    }),
                                ]
                            });
                            this.props.navigation.dispatch(resetAction)}}>
                            <View style = {styles.modalContent}>
                                <Text style = {{fontSize:11}}>Bạn có muốn đăng xuất tài khoản này?</Text>
                                <View style = {{height:1, backgroundColor: 'red'}}/>
                                <Text style = {{color: 'red', fontSize:18, marginTop: 15}}>
                                    Đăng xuất
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = { ()=> this.setState({ visibleModal: null })}>
                            <View style = {[styles.modalContent, {marginTop: 10}]}>
                                <Text style = {{fontSize:18, color: '#2196F3'}}>
                                    Hủy
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style = {{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <TouchableOpacity>
                        <View style = {styles.canhbao}>
                            <Text style = {{color: "black", fontWeight:'bold'}}>CẢNH BÁO KHẨN CẤP</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }

};
const mapDispatchToProps = (dispatch) => {

    return {
        callApiSubcribe: bindActionCreators(callApiSubcribe, dispatch),


    }
};

MenuLeftCuDan = connect(mapStateToProps, mapDispatchToProps)(MenuLeftCuDan);
export default MenuLeftCuDan
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,
        borderRadius: DEVICE_WIDTH / 6,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 20

    },
    canhbao: {
        width: DEVICE_WIDTH / 2,
        height: 35,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor:'#EF6C00',
        backgroundColor: '#F57C00'


    },
    modalContent: {
        flexDirection:'column',
        backgroundColor: "white",
        padding: 22,
        // justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 10,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    }

})