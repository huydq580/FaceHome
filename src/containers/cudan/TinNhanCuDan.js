import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import TinNhanItem from "../../components/TinNhanItem";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dimensions from 'Dimensions';
import stylesContainer from "../../components/style";
import {callApiGetUser} from "../../actions/MessagesActions";
import TinNhanItemCuDan from "../../components/TinNhanItemCuDan";
const DEVICE_WIDTH = Dimensions.get('window').width;

class TinNhanCuDan extends Component {
    constructor(props){
        // console.log('constructor')
        super(props)
        this.state = {
            dataUser: '',

        }


    }
    componentWillMount(){
        const { UserCuDan } = this.props;
        if (UserCuDan.length <= 0) {
            return null;
        }
        console.log('usercuDan', UserCuDan)
        const { callApiGetUser } = this.props;
        callApiGetUser(UserCuDan.payload[0].UserID).then(dataRes => {
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
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('SoanTinMoiCuDan')}>
                    <Text style = {{textDecorationLine: "underline",
                        marginTop:15,
                        textDecorationColor:'#BDBDBD',
                        marginLeft:250,
                        marginBottom:10}}>Soạn tin mới</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.dataUser}
                    renderItem={(item) => {
                        return (
                            <TinNhanItemCuDan
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                    style = {{marginTop:8}}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserCuDan: state.LoginReducers,
        SocketRef: state.SocketReducers,
        dataUser: state.MessageReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetUser: bindActionCreators(callApiGetUser, dispatch),
    }
};

TinNhanCuDan = connect(mapStateToProps, mapDispatchToProps)(TinNhanCuDan);
export default TinNhanCuDan;
