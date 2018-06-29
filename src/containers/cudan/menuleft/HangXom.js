import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity, StyleSheet,
    Image,
    TextInput
} from 'react-native'
import Dimensions from 'Dimensions';
import stylesContainer from "../../../components/style";
import HangXomItem from "../../../components/hangxom/HangXomItem";
import ThanhVienItem from "../../../components/ThanhVienItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {callApiSearchCuDan} from "../../../actions/cudan/SearchCuDanActions";
import images from "../../../components/images";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import {callApiCreateGroupFloor} from "../../../actions/messages/MsgGroupFloorActions";

class HangXom extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Hàng xóm',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }

    constructor(props) {
        super(props)
        this.state = {
            ArrThanhVienTang: []

        }
    }

    componentDidMount() {
        this.SearchCuDan()
    }
    ThaoLuanTang = () => {
        const { callApiCreateGroupFloor, InfoUser } = this.props
        if (InfoUser.length<=0){
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        callApiCreateGroupFloor(InfoUser[0].IntUserID,  dataProfile[0].KDTID).then(dataRes=> {
            console.log('datachatang', dataRes)
            if (dataRes.Error == null){
                this.props.navigation.navigate("TinNhanDetailsCuDan", {MsgId: dataRes.ObjectResult[0].MsgGroupID, title: dataRes.ObjectResult[0].GroupName, Info: null })
            }
        })
    }

    SearchCuDan = () => {
        const {callApiSearchCuDan, InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        callApiSearchCuDan("", dataProfile[0].KDTID, "", dataProfile[0].FloorID, 255).then(dataRes => {
            console.log('datacudan', dataRes)
            // dataRes = JSON.parse(dataRes)
            dataRes = dataRes.Value
            this.setState({
                ArrThanhVienTang: dataRes
            })
        })

    }


    render() {
        const {navigation, InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }

        return (
            <View style={stylesContainer.container}>
                <TouchableOpacity onPress = {()=> this.ThaoLuanTang()}>
                    <Text style={{
                        marginRight: 15,
                        color: '#0091EA',
                        marginTop: 5,
                        fontWeight: 'bold',
                        fontSize: 13,
                        textDecorationLine: 'underline',
                        textDecorationColor: "#0091EA",
                        textAlign: 'right'
                    }}>THẢO LUẬN GIAO LƯU TẦNG</Text>

                </TouchableOpacity>
                <View>
                    <Text style={{
                        marginLeft: 15,
                        color: '#0091EA',
                        marginTop: 15,
                        fontWeight: 'bold',
                        fontSize: 13
                    }}>
                        THÀNH VIÊN</Text>
                    <View style={{height: 1, backgroundColor: 'black', marginHorizontal: 10}}/>
                    <FlatList
                        style={{marginTop: 10}}
                        data={this.state.ArrThanhVienTang}
                        renderItem={(item) => {
                            return (
                                <ThanhVienItem
                                    dataItem={item}
                                    navigation={navigation}/>
                            )
                        }
                        }
                        keyExtractor={(item, index) => index}
                        numColumns={3}
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchCuDan: bindActionCreators(callApiSearchCuDan, dispatch),
        callApiCreateGroupFloor: bindActionCreators(callApiCreateGroupFloor, dispatch),
    }
};

HangXom = connect(mapStateToProps, mapDispatchToProps)(HangXom);
export default HangXom
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 200,
        marginTop: 10
    }
})
