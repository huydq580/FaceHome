import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet, Alert
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import stylesContainer from "../../../components/style";
import KDTItem from "../../../components/KDTItem";
import {callApiSearchKDT} from "../../../actions/KDTActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {CallApiThemCanHo} from "../../../actions/cudan/ThemCanHoActions";

class QuanLyCanHo extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Quản lý căn hộ',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    ThemCanHo = () => {
        const {InfoUser, CallApiThemCanHo} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        console.log("InfoUser", InfoUser)
        CallApiThemCanHo(InfoUser[0].IntUserID, InfoUser[0].UserID, InfoUser[0].Username, this.state.MaCanHo, InfoUser[0].Email).then(dataRes => {
            console.log('themcanho', dataRes)
            if (dataRes.ErrorCode == "00"){
                Alert.alert(
                    'Thông báo',
                    "Thêm căn hộ thành công",
                    [
                        {text: 'OK', onPress: () => {
                                this.props.navigation.navigate('LoadData')
                            }},
                    ],
                    {cancelable: false}
                )
            }
           else {
                Alert.alert(
                    'Thông báo',
                    "Mã căn hộ không hợp lệ",
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            }
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            ArrKDT: [],
            MaCanHo: "",

        }
    }

    componentDidMount() {
        this.getKDT()
    }

    getKDT = () => {
        const {callApiSearchKDT} = this.props
        callApiSearchKDT('', '').then(dataRes => {
            data = JSON.parse(dataRes)
            this.setState({
                ArrKDT: data.Value
            })
            console.log('dataRes', data.Value)
        })
    }

    render() {
        const {navigation} = this.props;
        const {params} = this.props.navigation.state
        // console.log('params.InfoHouse', params.InfoHouse)
        return (
            <View style={stylesContainer.container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={
                            require('../../../images/house-icon.png')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <View style={{marginLeft: 10, marginTop: 10}}>
                        <Text style={{color: 'black'}}>
                            Căn hộ của bạn
                        </Text>
                        <View style={{height: 1, backgroundColor: '#9E9E9E', width: DEVICE_WIDTH}}/>
                    </View>


                </View>
                {
                    !params.InfoHouse ? <View style = {{marginLeft: 20}}>
                        <Text style = {{color: 'black'}}>Bạn chưa sở hữu căn hộ nào. Để thêm căn hộ vui lòng nhập mã căn hộ</Text>
                    </View> :
                        <FlatList
                            data={params.InfoHouse ? params.InfoHouse : null }
                            renderItem={({item}) => {
                                return (
                                    <View>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#039BE5',
                                            fontWeight: 'bold',
                                            marginLeft: 15,
                                            marginTop: 10
                                        }}>{item.KDT} - {item.Block} - {item.Floor} - {item.PartRoom}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity>
                                                <View style={{
                                                    height: 30,
                                                    width: DEVICE_WIDTH / 3 - 10,
                                                    marginLeft: DEVICE_WIDTH / 3,
                                                    alignItems: 'center',
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    justifyContent: 'center',
                                                    marginTop: 10
                                                }}>
                                                    <Text>Rời khỏi</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View style={{
                                                    marginLeft: 10,
                                                    height: 30,
                                                    width: DEVICE_WIDTH / 3 - 10,
                                                    alignItems: 'center',
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    justifyContent: 'center',
                                                    marginTop: 10
                                                }}>
                                                    <Text>Căn hộ chính</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                }

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'center'}}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 5,
                        width: DEVICE_WIDTH / 2 - 10,
                        justifyContent: 'center',
                        height: 30
                    }}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Nhập mã căn hộ'
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(MaCanHo) => this.setState({MaCanHo})}/>
                    </View>
                    <TouchableOpacity onPress={this.ThemCanHo}>
                        <View style={{
                            marginLeft: 10,
                            height: 30,
                            width: DEVICE_WIDTH / 3 - 10,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 5,
                            justifyContent: 'center'
                        }}>
                            <Text>Thêm</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                    <Text style={{color: 'black'}}>
                        Trong trường hợp chưa có mã căn hộ bạn vui lòng liên hệ
                        trực tiếp BQL tòa nhà để được cấp mã hoặc tìm thông tin
                        khu đô thị của bạn phía dưới và yêu cầu cấp mã. BQL sẽ xác
                        minh và gửi mã căn hộ cho bạn trong mục tin nhắn
                    </Text>
                </View>
                <Text style={{fontSize: 15, color: "#9CCC65", marginLeft: 17, marginTop: 10}}>TÌM KHU ĐÔ THỊ</Text>
                <View style={{backgroundColor: 'black', marginHorizontal: 15, height: 1}}/>
                <FlatList
                    data={this.state.ArrKDT}
                    numColumns={3}
                    renderItem={(item) => {
                        return (
                            <KDTItem
                                dataItem={item}
                                navigation={navigation}
                                fromCapMa={true}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}

                />
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
        callApiSearchKDT: bindActionCreators(callApiSearchKDT, dispatch),
        CallApiThemCanHo: bindActionCreators(CallApiThemCanHo, dispatch),
    }
};

QuanLyCanHo = connect(mapStateToProps, mapDispatchToProps)(QuanLyCanHo);
export default QuanLyCanHo
const styles = StyleSheet.create({
    info: {
        marginTop: 10,
        marginLeft: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
})