    import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Button
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/Entypo'
import ThongBaoItem from '../../components/thongbao/ThongBaoItem';
import {GetlAlNotifcation, URL_SOCKET} from "../../components/Api";
import {connect} from "react-redux";

class Notification extends Component {
    constructor(props){
        super(props)

        this.state = {
            listNoti:[],
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