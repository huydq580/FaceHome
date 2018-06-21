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

class HangXom extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Hàng xóm',
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
                <View style={{ flex: 1}}>
                    <Text style={{marginLeft: 15, color: '#0091EA', marginTop: 5, fontWeight:'bold', fontSize: 13}}>GÓC THẢO LUẬN GIAO LƯU TẦNG</Text>

                    <View style={{height: 1, backgroundColor: 'black', marginHorizontal: 10}}/>
                    <View style = {{flex:1, borderWidth:1, borderColor: '#BDBDBD',marginTop: 5, marginHorizontal: 5}}>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5, marginRight: 15, alignItems: 'center'}}>
                        <Image
                            source={
                                // uri: InfoUser[0].Avatar
                                !InfoUser[0].Avatar ? images.noavatar : {uri: InfoUser[0].Avatar}
                            }
                            style={styles.image_circle}
                            resizeMode="cover">
                        </Image>
                        <TouchableOpacity style={{
                            marginLeft: 10, flex: 1,
                            backgroundColor: '#F5F5F5', borderRadius: 50,
                            borderWidth: 1,
                            borderColor: '#9E9E9E',
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                        }}>
                            <View>
                                <Text>Nhập tin nhắn ...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{marginLeft: 15, color: '#0091EA', marginTop: 15, fontWeight:'bold', fontSize: 13}}>THÀNH VIÊN</Text>
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
