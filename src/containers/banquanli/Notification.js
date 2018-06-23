import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Button, Alert
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import ThongBaoItem from '../../components/thongbao/ThongBaoItem';
import {GetlAlNotifcation, SOCKET, URL_SOCKET} from "../../components/Api";
import {connect} from "react-redux";
import SocketIOClient from "socket.io-client";

class Notification extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Button onPress={() => {
                navigation.navigate('TinNhanBQL')
            }}
                                 title='Tin nhắn'
                                 style={{marginRight: 10}}/>
        }
    }


    constructor(props){
        super(props)

        this.state = {
            listNoti:[]
        }
        // this.socket = SocketIOClient(SOCKET, {
        //     pingTimeout: 30000,
        //     pingInterval: 30000,
        //     transports: ['websocket']
        // });
        // this.socket.on('notification', (dataReceive) => {
        //     console.log('notification', dataReceive)
        // })

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
                IntUserID: InfoUser[0].IntUserID,
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                // data = JSON.parse(dataRes);
                this.setState({
                    listNoti: dataRes.ObjectResult
                }, ()=> {
                    console.log('listnoti', this.state.listNoti)
                })
            }).catch((erro)=> {
            console.log('erro',erro);
        })
    }
    render (){
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
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