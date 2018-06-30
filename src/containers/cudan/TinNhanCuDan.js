import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    TextInput, AsyncStorage

} from 'react-native'
import TinNhanItem from "../../components/TinNhanItem";
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Dimensions from 'Dimensions';
import stylesContainer from "../../components/style";
import TinNhanItemCuDan from "../../components/TinNhanItemCuDan";

const DEVICE_WIDTH = Dimensions.get('window').width;

import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";
import {callApiGetUserMsg} from "../../actions/messages/GetUserMsgActions";
import ChuaCoCanHoItem from "../../components/chuadangnhap/ChuaCoCanHoItem";
import ChuaDangNhapItem from "../../components/chuadangnhap/ChuaDangNhapItem";

class TinNhanCuDan extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Tin nhắn',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props) {
        // console.log('constructor')
        super(props)
        this.state = {
            dataUser: '',
            refresh: false,
            isLoading: false,
            LtProfile : ""

        }
        this.dataSearchMsg = [];


    }

    componentWillMount() {
        console.log('componentwillmount')
        this.getUser()
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
                    <View style={stylesContainer.container}>
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#FCE4EC'
                        }}>
                            <Icon name="search" size={30} style={{marginLeft: 7}} color="black"/>
                            <TextInput placeholder='Tìm kiếm'
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text) => this.SearchUser(text)}
                                       placeholderTextSize="20"
                                       style = {{padding: 0, marginLeft: 10, flex:1}}
                                // returnKeyType={"search"}
                            />
                        </View>
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
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderSeparator}
                            style={{marginTop: 8}}
                        />
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
                                {/*backgroundColor: 'rgba(52, 52, 52, 0.3)'*/}
                            {/*}}>*/}
                                {/*<ActivityIndicator size="large" color="green"/>*/}
                            {/*</View> : null*/}
                        {/*}*/}
                    </View>
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

    getUser = () => {
        this.setState({isLoading: true,refresh:true})
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        console.log("InfoUser", InfoUser)
        const {callApiGetUserMsg} = this.props;
        callApiGetUserMsg(InfoUser[0].IntUserID).then(dataRes => {
            dataUser = dataRes.ObjectResult
            this.dataSearchMsg = dataUser
            this.setState({
                dataUser: dataUser,
                isLoading: false,
                refresh: false
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


    search(text) {
        if (!this.oldText || this.oldText != text) {
            if (this.timeoutSearch) clearTimeout(this.timeoutSearch);
            this.oldText = text;
            this.timeoutSearch = setTimeout(() => {
                const data = this.dataSearchMsg;
                const textData = text.toLowerCase()
                const inputSearch = data.filter(function (item) {
                    const itemData = item.FullNameOrGroupName.toLowerCase()
                    return itemData.indexOf(textData) > -1
                })
                this.setState({
                    dataUser: inputSearch
                })
            }, 300);
        }
    }
    SearchUser(text) {
        this.setState({
            text: text
        }, () => {
            this.search(this.state.text)
        })
    }
    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#718792'}}>
        //             <ActivityIndicator size="large" color="white"/>
        //         </View>
        //     );
        // }
        const {navigation} = this.props;
        return (
            <View style = {{flex:1}}>
                {this.renderGiaoDien()}
            </View>

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
        callApiGetUserMsg: bindActionCreators(callApiGetUserMsg, dispatch),
    }
};

TinNhanCuDan = connect(mapStateToProps, mapDispatchToProps)(TinNhanCuDan);
export default TinNhanCuDan;
