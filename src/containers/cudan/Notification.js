import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Button, AsyncStorage, StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/Entypo'
import ThongBaoItem from '../../components/thongbao/ThongBaoItem';
import {GetlAlNotifcation, SOCKET, URL_SOCKET} from "../../components/Api";
import {connect} from "react-redux";
import SocketIOClient from "socket.io-client";
import images from "../../components/images";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";
import ChuaDangNhapItem from "../../components/chuadangnhap/ChuaDangNhapItem";
import Modal from 'react-native-modalbox';
import ShowModal from "../../components/modal/ShowModal";
import ChuaCoCanHoItem from "../../components/chuadangnhap/ChuaCoCanHoItem";

class Notification extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Thông báo',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }

    constructor(props) {
        super(props)

        this.state = {
            listNoti: [],
            value: "",
            isLoading: false,
            LtProfile :  ""
        }
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.on('notification', (dataReceive) => {
            console.log('notification', dataReceive)
        })


    }

    componentWillMount() {
        // console.log('componentwillmount')
        this.getNotifi()
    }

    getNotifi = () => {
        // console.log('getnotifi')
        this.setState({isLoading: true})
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        fetch(URL_SOCKET + GetlAlNotifcation, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                IntUserID: InfoUser[0].IntUserID,
            })
        })
            .then((response) => response.json())
            .then((dataRes) => {
                console.log('data12', dataRes)
                this.setState({
                    listNoti: dataRes.ObjectResult,
                    isLoading: false
                }, () => {
                    // console.log('listnoti', this.state.listNoti)
                })
            }).catch((erro) => {
            console.log('erro', erro);
        })
    }

    componentDidMount() {

        AsyncStorage.getItem('UserID').then((value) => {
            this.setState({
                value: value
            })
        })
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        // let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        // dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        this.setState({
            LtProfile : InfoUser[0].LtProfile
        })
    }
    renderGiaoDien = () => {
        console.log('this.state.value', this.state.value)
        // console.log('this.state.LtProfile', this.state.LtProfile)
        const { navigation } = this.props;
        if (this.state.value) {
            if (this.state.LtProfile){
                return (
                    <FlatList
                        data={this.state.listNoti}
                        renderItem={(item) => {
                            return (
                                <ThongBaoItem
                                    dataItem={item}
                                    navigation={navigation}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            }
            else {
                return (
                    <ChuaCoCanHoItem
                        navigation={navigation}/>
                )
            }

        }
        else {
            return (
                <ChuaDangNhapItem
                    navigation={navigation}/>
            )
        }

    }


    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                {
                    this.renderGiaoDien()
                }
                {/*{this.state.isLoading ?*/}
                    {/*<View style={{*/}
                        {/*top: -10,*/}
                        {/*bottom: -10,*/}
                        {/*left: -10,*/}
                        {/*right: -10,*/}
                        {/*justifyContent: 'center',*/}
                        {/*alignItems: 'center',*/}
                        {/*position: 'absolute',*/}
                        {/*zIndex: 1,*/}
                        {/*backgroundColor: "white"*/}
                    {/*}}>*/}
                        {/*<ActivityIndicator size="large" color="green"/>*/}
                    {/*</View> : null*/}
                {/*}*/}

            </View>
        );
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: DEVICE_WIDTH / 5
                }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

Notification = connect(mapStateToProps, mapDispatchToProps)(Notification);
export default Notification
const styles = StyleSheet.create({
    icondichvu: {
        marginLeft: 10,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notification: {
        width: 100,
        height: 100,
    },
    viewDangNhap: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#01579B',
        marginHorizontal: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#01579B'
    },
    textDangNhap: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }


})