import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Platform,

} from 'react-native'
import TinNhanItem from "../../components/TinNhanItem";
import Icon from 'react-native-vector-icons/dist/Entypo'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Dimensions from 'Dimensions';
import stylesContainer from "../../components/style";
import {callApiGetUser} from "../../actions/MessagesActions";
import TinNhanItemCuDan from "../../components/TinNhanItemCuDan";

const DEVICE_WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modalbox';
import CreateGroupCuDan from "./CreateGroupCuDan";

class TinNhanCuDan extends Component {
    constructor(props) {
        // console.log('constructor')
        super(props)
        this.state = {
            dataUser: '',
            refresh: false,
            isLoading: true,

        }


    }

    componentWillMount() {
        this.getUser()
    }

    getUser = () => {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        const {callApiGetUser} = this.props;
        callApiGetUser(InfoUser[0].ProfileID, InfoUser[0].UserID).then(dataRes => {
            dataUser = dataRes.ObjectResult
            this.setState({
                dataUser: dataUser,
                isLoading: false,
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
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#718792'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        const {navigation} = this.props;
        return (
            <View style={stylesContainer.container}>
                {/*<TouchableOpacity onPress = {()=> this.props.navigation.navigate('SoanTinMoiCuDan')}>*/}
                {/*<Text style = {{textDecorationLine: "underline",*/}
                {/*marginTop:15,*/}
                {/*textDecorationColor:'#BDBDBD',*/}
                {/*marginLeft:250,*/}
                {/*marginBottom:10}}>Soạn tin mới</Text>*/}
                {/*</TouchableOpacity>*/}
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                        this.getUser()
                    }}
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
                    style={{marginTop: 8}}
                />
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: '#01a699',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height: 70,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                    }}

                    onPress={() => this.refs.modal.open()}

                >
                    <Icon name="plus" size={30} color="#01a699"/>
                </TouchableOpacity>


                <Modal style={{
                    height: 100,
                    width: DEVICE_WIDTH - 50,
                }}
                       swipeArea={20}
                       position={"center"} ref={"modal"} isDisabled={false}


                >
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}

                        onPress={() => {


                            this.refs.modal.close()
                            if (Platform.OS === "ios") {
                                setTimeout(() => {
                                    navigation.navigate("SoanTinMoiCuDan");
                                }, 500);
                            } else {
                                navigation.navigate("SoanTinMoiCuDan");
                            }


                        }}

                    >
                        <Text style={{color: 'black'}}>Tin nhắn mới</Text>
                    </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: 'gray'}}></View>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            this.refs.modal.close()
                            if (Platform.OS === "ios") {
                                setTimeout(() => {
                                    navigation.navigate("CreateGroupCuDan");
                                }, 500);
                            } else {
                                navigation.navigate("CreateGroupCuDan");
                            }
history
                        }}

                    >
                        <Text style={{color: 'black'}}>Nhóm mới</Text>
                    </TouchableOpacity>
                </Modal>
                {this.state.isLoading ?
                    <View style={{
                        top: -10,
                        bottom: -10,
                        left: -10,
                        right: -10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 1,
                        backgroundColor: 'rgba(52, 52, 52, 0.3)'
                    }}>
                        <ActivityIndicator size="large" color="green"/>
                    </View> : null
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
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
