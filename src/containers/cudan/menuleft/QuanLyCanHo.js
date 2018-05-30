import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import stylesContainer from "../../../components/style";
import KDTItem from "../../../components/KDTItem";
import {callApiSearchKDT} from "../../../actions/KDTActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class QuanLyCanHo extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Quản lý căn hộ',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
        super(props)
        this.state = {
            ArrKDT: [],

        }
    }
    componentDidMount () {
        this.getKDT()
    }
    getKDT = () => {
        const { callApiSearchKDT} = this.props
        callApiSearchKDT('', '').then(dataRes => {
            data = JSON.parse(dataRes)
            this.setState({
                ArrKDT: data.Value
            })
            console.log('dataRes', data.Value)
        })
    }
    render () {
        const { navigation } = this.props;
        return (
            <View style = {stylesContainer.container}>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={
                            require('../../../images/house-icon.png')
                        }
                        style={styles.info}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10, marginTop: 10}}>
                        <Text style = {{color: 'black'}}>
                            Căn hộ của bạn
                        </Text>
                        <View style = {{height:1, backgroundColor:'#9E9E9E', width: DEVICE_WIDTH}}/>
                    </View>


                </View>
                <View style = {{flexDirection: 'row', marginTop: 10, marginLeft: 15}}>
                    <Text style = {{color: '#039BE5', flex:2, fontWeight:'bold'}}>
                        TSQ EUROLAND – T2B - P0908
                    </Text>
                    <Text  style = {{flex:1}}>Mã: ABCDEF</Text>
                </View>

                    <View style = {{flexDirection:'row'}}>
                        <TouchableOpacity>
                        <View style = {{height: 30, width: DEVICE_WIDTH/3-10, marginLeft: DEVICE_WIDTH/3,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 10}}>
                            <Text>Rời khỏi</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View style = {{marginLeft: 10, height: 30, width: DEVICE_WIDTH/3-10,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 10}}>
                            <Text>Căn hộ chính</Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                <View style = {{flexDirection: 'row', marginTop: 10, marginLeft: 15}}>
                    <Text style = {{color: '#039BE5', flex:2, fontWeight:'bold'}}>
                        TSQ EUROLAND – T2B - P0908
                    </Text>
                    <Text  style = {{flex:1}}>Mã: ABCDEF</Text>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <TouchableOpacity>
                        <View style = {{height: 30, width: DEVICE_WIDTH/3-10, marginLeft: DEVICE_WIDTH/3,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 10}}>
                            <Text>Rời khỏi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {{marginLeft: 10, height: 30, width: DEVICE_WIDTH/3-10,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 10}}>
                            <Text>Căn hộ chính</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', alignItems:'center', marginTop: 30, justifyContent:'center'}}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius:5,
                        width: DEVICE_WIDTH/2-10,
                        justifyContent:'center',
                        height: 30
                    }}>
                        <TextInput
                            style={{marginLeft: 10, padding: 0}}
                            placeholder='Nhập mã căn hộ'
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            onChangeText={(Ho) => this.setState({Ho})}/>
                    </View>
                    <View style = {{marginLeft: 10, height: 30, width: DEVICE_WIDTH/3-10,alignItems:'center',  borderWidth: 1, borderRadius: 5, justifyContent: 'center'}}>
                        <Text>Thêm</Text>
                    </View>
                </View>
                <View style = {{marginHorizontal: 20, marginTop: 10}}>
                    <Text style = {{color: 'black'}}>
                        Trong trường hợp chưa có mã căn hộ bạn vui lòng liên hệ
                        trực tiếp BQL tòa nhà để được cấp m ã hoặc tìm thông tin
                        khu đô thị của bạn phía dưới và yêu cầu cấp mã. BQL sẽ xác
                        minh và gửi mã căn hộ cho bạn trong mục tin nhắn
                    </Text>
                </View>
                <Text style = {{fontSize:15, color: "#9CCC65", marginLeft:17, marginTop:10}}>TÌM KHU ĐÔ THỊ</Text>
                <View style = {{backgroundColor:'black', marginHorizontal:15, height:1}}/>
                <FlatList
                    data={this.state.ArrKDT}
                    numColumns={3}
                    renderItem={(item) => {
                        return (
                            <KDTItem
                                dataItem={item}
                                navigation={navigation}
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchKDT: bindActionCreators(callApiSearchKDT, dispatch),
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
        justifyContent:'center'
    },
})