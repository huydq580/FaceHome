import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    FlatList,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native'
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import stylesContainer from "../../../components/style";

import images from "../../../components/images";
import Header from "../../../components/taikhoancuabancudan/Header";
import TitleView from "../../../components/taikhoancuabancudan/TitleView";
import ThongTinItem from "../../../components/cudankhac/ThongTinItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiCreateMsgGroupID} from "../../../actions/messages/CreateMsgGroupIDActions";
import {MsgGroupID} from "../../../components/Api";

class CuDanKhac extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: `${navigation.state.params.title}`,
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
        super(props)
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        this.state = {
            GroupMembers: [
                {
                    IntUserID: InfoUser[0].IntUserID,
                    FullName: InfoUser[0].FullName,
                    Avatar: InfoUser[0].Avatar ? InfoUser[0].Avatar : ""
                }]
        }
    }
    CreateMsgGroupID = () => {
        const { params } = this.props.navigation.state

        this.state.GroupMembers.push({
            IntUserID: params.Info.IntUserID,
            FullName:  params.Info.FullName,
            Avatar:  params.Info.Avatar
        })
        const { callApiCreateMsgGroupID, InfoUser } = this.props
        if (InfoUser.length <=0){
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        callApiCreateMsgGroupID(dataProfile[0].KDTID,InfoUser[0].IntUserID, this.state.GroupMembers,  params.Info.FullName, InfoUser[0].FullName, InfoUser[0].Avatar ).then(dataRes => {
            console.log('dataMsgGroupId', dataRes)
            MessagesGroupID  = dataRes.ObjectResult.MsgGroupID ? dataRes.ObjectResult.MsgGroupID : ""
            console.log('MessagesGroupID', MessagesGroupID)
            this.props.navigation.navigate("TinNhanDetailsCuDan", {title: params.Info.FullName, MsgId: MessagesGroupID, Info: params.Info})

        })
    }
    render() {
        const { params } = this.props.navigation.state
        console.log('params', params)
        return (
            <ScrollView style={stylesContainer.container}>
                <View style = {{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-end'}}>
                    <Header
                        source={
                            !params.Info.Avatar ? images.noavatar : params.Info.Avatar
                        }
                        textName= {params.Info.FullName}
                        Title=""/>
                    <TouchableOpacity onPress = {()=> {

                        this.CreateMsgGroupID()
                    }}>
                        <View style = {{marginRight: 15, borderRadius: 3, borderWidth: 1, height: 30, width: 90, alignItems: 'center', justifyContent: 'center', borderColor: "#616161", backgroundColor: "#EEEEEE" }}>
                            <Text>Nhắn tin</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TitleView titleText="Thông tin cơ bản"
                           source={images.thongtincoban}/>

                <ThongTinItem title='Họ tên'
                              value={params.Info.FullName}/>
                <ThongTinItem title='Ngày sinh'
                              value={params.Info.BirdDate ? params.Info.BirdDate : ""}/>
                <ThongTinItem title='Số điện thoại'
                              value={params.Info.UserName}/>
                <ThongTinItem title='Giới tính'
                              value=""/>
                <ThongTinItem title='Email'
                              value= {params.Info.Email? params.Info.Email: ""}/>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 10}}>
                    <Text style={{flex: 1, color: 'black'}}>Căn hộ</Text>
                    <View style={{flex: 3,}}>

                        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>{params.Info.TenKDT} – {params.Info.Floor} - {params.Info.PartName}</Text>


                    </View>

                </View>
                <TitleView titleText="Bài viết gần đây"
                           source={images.thongtincoban}/>
                <TitleView titleText="Tin rao vặt gần đây"
                           source={images.thongtincoban}/>
                <TitleView titleText="Thông tin nhà cung cấp"
                           source={images.thongtincoban}/>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ThongTinNhaCungCap')}>
                    <View style = {{justifyContent:'center',
                        alignItems:'center', borderWidth: 1,
                        borderRadius: 3, height: 30,marginLeft: DEVICE_WIDTH/2,
                        width: 90}}>
                        <Text>
                            Thông tin
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }Username
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        callApiCreateMsgGroupID: bindActionCreators(callApiCreateMsgGroupID, dispatch),
    }
};

CuDanKhac = connect(mapStateToProps, mapDispatchToProps)(CuDanKhac);

export default CuDanKhac
const styles = StyleSheet.create({
    circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        marginTop: 10,
        marginLeft: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    viewItem: {
        borderWidth: 1,
        padding: 3, justifyContent: 'center',
        height: 28, width: 170
    },
    image_circle: {
        marginTop: 10,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }


})