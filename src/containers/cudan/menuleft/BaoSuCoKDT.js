import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Picker,
    ScrollView,
    TouchableOpacity, StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {callApiSearchSuCo} from "../../../actions/SuCoActions";
import SuCoItem from "../../../components/baocaosuco/SuCoItem";
import images from "../../../components/images";
import moment from "moment/moment";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";

class BaoSuCoKDT extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Phản ánh sự cố',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
        super(props)
        this.state  = {
            SuCo: '',
            dataSuCo: [
                {
                    avt: "https://media.ngoisao.vn/resize_580/news/2018/04/13/phuong-ly-mua-xe-5-ngoisao.vn-w960-h719.jpg",
                    fullname: "Nguyễn Văn Hiệu",
                    time: "4h, 16/06/2018",
                    title: "Nứt đường ống cấp nước",
                    content: "Nhà vệ sinh P0908 đang bị rò nước thấm khắp tường rồi",
                    img: "http://media.thuonghieucongluan.vn/uploads/2018_03_26/chung-cu-carina-1522052532.jpg"
                },
                {
                    avt: "https://media.ngoisao.vn/resize_580/news/2018/04/13/phuong-ly-mua-xe-5-ngoisao.vn-w960-h719.jpg",
                    fullname: "Nguyễn Văn Hiệu",
                    time: "4h, 16/06/2018",
                    title: "Nứt đường ống cấp nước",
                    content: "Nhà vệ sinh P0908 đang bị rò nước thấm khắp tường rồi",
                    img: "http://media.thuonghieucongluan.vn/uploads/2018_03_26/chung-cu-carina-1522052532.jpg"
                }
            ]
        }
    }
    // componentWillMount(){
    //    this.SearchSuCoKDT()
    // }
    // SearchSuCoKDT = (type) => {
    //     const { callApiSearchSuCo,InfoUser  } = this.props;
    //     if (InfoUser.length<=0){
    //         return null;
    //     }
    //     callApiSearchSuCo(InfoUser[0].KDTID, type ).then(dataRes => {
    //         dataRes = JSON.parse(dataRes)
    //         dataRes = dataRes.Value,
    //             this.setState({
    //                 dataSuCo:dataRes,
    //             })
    //         console.log('datasuco', dataRes)
    //     })
    //
    // }
    render(){
        const {navigation} = this.props;
        return(
            <ScrollView style = {stylesContainer.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchFaceHome')}>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#FCE4EC'
                    }}>
                        <Icon name="search" size={30} style={{marginLeft: 7}} color="black"/>
                        <Text>Tìm kiếm</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{flexDirection:'row', marginTop: 10, marginHorizontal: 10, justifyContent: "space-between", alignItems:'flex-end'}}>
                    <Text style = {{color: "#EF5350"}}>
                        PHẢN ÁNH - GÓP Ý CỦA BẠN
                    </Text>
                    <TouchableOpacity>
                        <View style = {{
                            borderWidth: 1,
                            height: 25,
                            width: 90,
                            justifyContent:'center',
                            alignItems: 'center',
                            borderColor: "#E57373",
                            backgroundColor: '#FFCDD2'
                        }}>
                            <Text> Đăng mới </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{height:1 , backgroundColor: 'black', marginHorizontal: 10}}/>
                <FlatList
                    data={this.state.dataSuCo}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <View style={{flexDirection: 'row', marginTop: 15}}>
                                    <Image
                                        source={{
                                            uri: item.avt
                                        }}
                                        style={styles.image_circle}
                                        resizeMode="cover">
                                    </Image>
                                    <View style={{marginLeft: 10}}>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>{item.fullname}</Text>
                                        <Text>{item.time}</Text>
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 10, marginTop: 10}}>
                                    <Text style={{color: '#212121'}}>{item.content}</Text>
                                </View>
                                <Image source={{
                                    uri: item.img
                                }}
                                       style={styles.imagePost}
                                       resizeMode="cover">
                                </Image>
                            </View>
                        )
                    }}

                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}

                />

            </ScrollView>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         InfoUser: state.GetProfileReducers,
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // addTodo: bindActionCreators(addTodo, dispatch),
//         callApiSearchSuCo: bindActionCreators(callApiSearchSuCo, dispatch)
//     }
// };
//
// BaoSuCoKDT = connect(mapStateToProps, mapDispatchToProps)(BaoSuCoKDT);
export default BaoSuCoKDT;
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