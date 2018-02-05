import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import TinNhanItem from "../../components/TinNhanItem";
import Dimensions from 'Dimensions';
import stylesContainer from "../../components/style";
import {callApiGetUser} from "../../actions/MessagesActions";
const DEVICE_WIDTH = Dimensions.get('window').width;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SocketIOClient from 'socket.io-client';


class TinNhan extends Component {
    constructor(props){
        // console.log('constructor')
        super(props)
        this.state = {
            dataUser: '',

        }


    }
    componentWillMount(){
        const { callApiGetUser } = this.props;
        callApiGetUser().then(dataRes => {
            dataUser = dataRes.ObjectResult
            this.setState({
                dataUser: dataUser,
            })
            // console.log('datauser', this.state.dataUser)
        })
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

    render() {
        const {navigation} = this.props;
        return (
            <View style = {stylesContainer.container}>
                <FlatList
                    data={this.state.dataUser}
                    renderItem={(item) => {
                        return (
                            <TinNhanItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        SocketRef: state.SocketReducers,
        dataUser: state.MessageReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetUser: bindActionCreators(callApiGetUser, dispatch),
        // connectToSocket: bindActionCreators(connectToSocket, dispatch),
        // joinToChat: bindActionCreators(joinToChat, dispatch),
        // disConnectToSocket: bindActionCreators(disConnectToSocket, dispatch)
    }
};

TinNhan = connect(mapStateToProps, mapDispatchToProps)(TinNhan);
export default TinNhan;
