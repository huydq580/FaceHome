import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Button,
    ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../components/style";
import images from "../../components/images"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import StatusItems from "../../components/status/StatusItems";
import SocketIOClient from 'socket.io-client';
import {connectToSocket, disConnectToSocket, joinToChat} from "../../actions/SocketActions";
import {callApiGetTopPost} from "../../actions/GetTopPostActions";


class SanhChinh extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Button onPress={() => {navigation.navigate('TinNhanBQL')}}
                title = 'Tin nhắn'
                style = {{marginRight:10}}/>
        }
    }
    constructor(props){
        super(props)
        this.state = {
            dataItem :[],
            refresh : false,
            isLoading: true,
        }



    }
    componentWillMount(){


        this.fetchData()
    }
    fetchData = () => {
        const { UserBQL, callApiGetTopPost } = this.props
        if (UserBQL.length <= 0) {
            return null;
        }
        callApiGetTopPost(UserBQL.payload[0].UserID, UserBQL.payload[0].KDTID).then(dataRes => {
            dataBaiViet = JSON.parse(dataRes);
            dataBaiViet = dataBaiViet.Value
            console.log('bai viet sanh chinh', dataBaiViet)
            this.setState({
                isLoading: false,
                dataItem: dataBaiViet,
            })
        })
    }

    render (){
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1,justifyContent:'center', alignItems: 'center', backgroundColor: '#718792'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        const {navigation} = this.props;
        return (
            <View style = {stylesContainer.container}>
                {/*<View style={{alignItems:'center', justifyContent:'center'}}>*/}
                    {/*<Text style = {{fontSize:19, fontWeight:'bold', color: 'black'}}>*/}
                        {/*Thông Tin Từ Ban Quản Lý*/}
                    {/*</Text>*/}
                {/*</View>*/}
                {/*<View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>*/}
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('SoanTin')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {()=>  {this.fetchData()}}
                    data = {this.state.dataItem}
                    renderItem={(item) => {
                        return (
                            <StatusItems
                                dataItem={item}
                                navigation={navigation}/>

                            )
                        }
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        SocketRef: state.SocketReducers,
        TopPost: state.GetTopPostReducers,
        UserBQL: state.LoginReducers
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        connectToSocket: bindActionCreators(connectToSocket, dispatch),
        joinToChat: bindActionCreators(joinToChat, dispatch),
        disConnectToSocket: bindActionCreators(disConnectToSocket, dispatch),
        callApiGetTopPost: bindActionCreators(callApiGetTopPost, dispatch),


    }
};

SanhChinh = connect(mapStateToProps, mapDispatchToProps)(SanhChinh);

export default SanhChinh
const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 20,
        marginTop:7,
        minHeight:50,
    },

})