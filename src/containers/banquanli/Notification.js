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
import {GetlAlNotifcation, URL_SOCKET} from "../../components/Api";
import {connect} from "react-redux";

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
            listNoti:[
                {
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:false,
                    time:'2017-03-01 8:00'
                },
                {
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:true,
                    time:'2017-03-01 8:00'
                },{
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:false,
                    time:'2017-03-01 8:00'
                }
            ]
        }

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
                UserID: InfoUser[0].UserID
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                // data = JSON.parse(dataRes);
                console.log('dataRes', dataRes.Error)
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