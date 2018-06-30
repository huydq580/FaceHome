import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView, TouchableOpacity, StyleSheet,
    Image, AsyncStorage

} from 'react-native';
import Dimensions from 'Dimensions';
// import Modal from "react-native-modal";
import Modal from 'react-native-modalbox';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemLeftMenu from "../../components/leftmenu/ItemLeftMenu";
import {connect} from "react-redux";
import {LINKIMG} from "../../components/Api";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";
import {bindActionCreators} from "redux";
import {callApiSubcribe} from "../../actions/SubcribeActions";
import {NavigationActions} from "react-navigation";
import {callApiCreateGrouptoManager} from "../../actions/messages/CreateGrouptoManagerActions";
import ShowModal from "../../components/modal/ShowModal";

class MenuLeftCuDan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: null,
            isShow: false,
            Profile: ""

        };
        this.handlerModal = this.handlerModal.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {

            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            title: 'Menu'

        }

    }


    componentDidMount() {
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        this.setState({
            Profile: dataProfile
        })
    }
    handlerModal() {
        this.refs.modal.close()

    }


    chatToAdmin = () => {
        const {callApiCreateGrouptoManager, InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        callApiCreateGrouptoManager(InfoUser[0].IntUserID, dataProfile[0].KDTID).then(dataRes => {
            // console.log('datachatoAdmin', dataRes)
            if (dataRes.Error == null) {
                this.props.navigation.navigate("TinNhanDetailsCuDan", {
                    MsgId: dataRes.ObjectResult.MsgGroupID,
                    title: dataRes.ObjectResult.GroupName,
                    Info: null
                })
            }
        })
    }
    UnSubcribe = () => {
        const {InfoUser, callApiSubcribe} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        callApiSubcribe(InfoUser[0].UserID, false).then(dataRes => {
            // console.log('dataUnSubcribe',dataRes )

        })
    }

    render() {
        const {navigation} = this.props
        return (
            <ScrollView style={{flexDirection: 'column', backgroundColor: 'white'}}>
                <ItemLeftMenu title="Tài khoản của bạn"
                              nameIcon="home"
                              onPress={() => this.props.navigation.navigate('TaiKhoanCuaBanCuDan')}
                />
                <ItemLeftMenu title="Hàng xóm của bạn"
                              nameIcon="home"
                              onPress={() => {
                                  this.state.Profile ? this.props.navigation.navigate('HangXom') : this.refs.modal.open()
                              }}
                />
                <ItemLeftMenu title="Thông tin cần biết quanh khu đô thị"
                              nameIcon="account-multiple"
                              onPress={() => this.props.navigation.navigate('ThongTinKDTCuDan')}
                />
                <ItemLeftMenu title="Liên hệ Ban Quản Lý"
                              nameIcon="contacts"
                              onPress={() => {
                                  // this.chatToAdmin()
                                  this.state.Profile ? this.chatToAdmin() : this.refs.modal.open()
                              }}

                />

                <ItemLeftMenu title="Phản ánh sự cố"
                              nameIcon="bell-ring"
                              onPress={() => {
                                  // this.props.navigation.navigate('BaoSuCoKDT')
                                  this.state.Profile ? this.props.navigation.navigate('BaoSuCoKDT') : this.refs.modal.open()
                              }}
                />
                <ItemLeftMenu title="Chợ FaceHome"
                              nameIcon="bell-ring"
                              onPress={() => this.props.navigation.navigate('ChoFaceHome')}
                />
                <ItemLeftMenu title="Bếp ăn gia đình"
                              nameIcon="bell-ring"
                              onPress={() => {
                                  // this.props.navigation.navigate('BepAnGiaDinh')
                                  this.state.Profile ? this.props.navigation.navigate('BepAnGiaDinh') : this.refs.modal.open()
                              }}
                />

                <ItemLeftMenu title="Hướng dẫn"
                              nameIcon="bell-ring"
                              onPress={() => this.props.navigation.navigate('HuongDan')}
                />
                <ItemLeftMenu title="Giới thiệu"
                              nameIcon="bell-ring"
                              onPress={() => this.props.navigation.navigate('GioiThieuCuDan')}
                />

                <ItemLeftMenu title="Đăng xuất"
                              nameIcon="web"
                              onPress={() => {
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
                                  this.props.navigation.dispatch(resetAction)
                              }}
                />

                <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <TouchableOpacity>
                        <View style={styles.canhbao}>
                            <Text style={{color: "black", fontWeight: 'bold'}}>CẢNH BÁO KHẨN CẤP</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <Modal style={{
                    height: DEVICE_WIDTH - 120,
                    width: DEVICE_WIDTH - 50,
                    borderRadius: 10,
                    backgroundColor: '#E1F5FE'


                }}
                       swipeArea={20}
                       position={"center"} ref={"modal"} isDisabled={false}
                >
                    <ShowModal
                        navigation={navigation}
                        handlerModal={this.handlerModal}/>
                </Modal>

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
        callApiCreateGrouptoManager: bindActionCreators(callApiCreateGrouptoManager, dispatch),


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
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#EF6C00',
        backgroundColor: '#F57C00'


    },
    modalContent: {
        flexDirection: 'column',
        backgroundColor: "white",
        padding: 22,
        // justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 10,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        height: DEVICE_HEIGHT/4,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
    }

})