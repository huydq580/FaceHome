    import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Button, AsyncStorage, StyleSheet,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/Entypo'
import ThongBaoItem from '../../components/thongbao/ThongBaoItem';
import {GetlAlNotifcation, SOCKET, URL_SOCKET} from "../../components/Api";
import {connect} from "react-redux";
import SocketIOClient from "socket.io-client";
    import images from "../../components/images";

class Notification extends Component {
    constructor(props){
        super(props)

        this.state = {
            listNoti:[],
            value:""
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
        const { InfoUser } = this.props
        if (InfoUser.length <=0 ){
            return null
        }
        fetch( URL_SOCKET + GetlAlNotifcation,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                UserID: InfoUser[0].UserID,
                ProfileID: InfoUser[0].ProfileID,
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                console.log('data12', dataRes)
                this.setState({
                    listNoti: dataRes.ObjectResult
                }, ()=> {
                    console.log('listnoti', this.state.listNoti)
                })
            }).catch((erro)=> {
            console.log('erro',erro);
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('UserID').then((value) => {
            this.setState({
                value: value
            })
        })
    }

    render (){
        const {navigation} = this.props;
        return (
           <View style = {{flex:1}}>
               {
                   !this.state.value ? <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-between'}}>
                       <View style = {{justifyContent:'center', flex:4, alignItems:'center'}}>
                           <Image
                               source={images.khongcothongbao}
                               style={styles.notification}
                               resizeMode="cover"
                           >

                           </Image>
                           <Text style = {{fontSize: 16}}>Không có thông báo nào</Text>

                       </View>
                       <View style={{justifyContent: 'center', flex:1}}>
                           <TouchableOpacity onPress = {() => this.props.navigation.navigate('DangNhap')}>
                               <View style={styles.viewDangNhap}>
                                   <Text style={styles.textDangNhap}>Đăng nhập</Text>
                               </View>
                           </TouchableOpacity>
                           <View style = {{alignItems:'center'}}>

                               <Text style = {{fontSize: 18, marginTop: 5}}>Hãy đăng nhập vào chung cư của bạn</Text>
                           </View>
                       </View>


                   </View> :  <View style={{flex:1}}>
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
                           ItemSeparatorComponent={this.renderSeparator}
                       />
                   </View>
               }

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
    return {
    }
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
            justifyContent:'center',
            alignItems:'center',
            borderColor:'#01579B'
        },
        textDangNhap: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15
        }


    })