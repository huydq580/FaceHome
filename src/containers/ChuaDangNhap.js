import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    FlatList, StyleSheet,
    TouchableOpacity
} from 'react-native'
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import SlideImage from "../components/SlideImage";
import stylesContainer from "../components/style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiSearchKDT} from "../actions/KDTActions";
import KDTItem from "../components/KDTItem";

class ChuaDangNhap extends Component {
    constructor(props){
        super(props)
        this.state = {
            TimKiem: "",
            imageSlider: [
                {
                    thumbnail: 'http://file4.batdongsan.com.vn/2015/12/03/hmcVYWuR/20151203133249-f154.jpg'
                },
                {
                    thumbnail: 'http://file4.batdongsan.com.vn/2015/12/03/hmcVYWuR/20151203133249-f154.jpg'
                },
                {
                    thumbnail: 'http://file4.batdongsan.com.vn/2015/12/03/hmcVYWuR/20151203133249-f154.jpg'
                }
            ],
            ArrKDT: [],
            ArrRaoVat: [
                {
                    avt: 'https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg',
                    username: 'Nguyễn Hiệu',
                    content: 'Cửa hàng bác tôm chuyên cung cấp rau sạch, thịt sạch'
                },
                {
                    avt: 'https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg',
                    username: 'Nguyễn Hiệu',
                    content: 'Cửa hàng bác tôm chuyên cung cấp rau sạch, thịt sạch'
                },
                {
                    avt: 'https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg',
                    username: 'Nguyễn Hiệu',
                    content: 'Cửa hàng bác tôm chuyên cung cấp rau sạch, thịt sạch'
                }
            ]
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
            // console.log('dataRes', data.Value)
        })
    }
    render () {
        const { navigation } = this.props;
        return (
            <ScrollView style = {stylesContainer.container}>
                <View style = {{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View  style = {{flexDirection: 'row', alignItems:'center'}}>
                        <Image
                            style = {{width:30, height:30, marginLeft:5}}
                            source={require('../images/logof.png')}
                        />
                    <Icon name="search" size={30} style={{ marginLeft: 7 }} color="black" />
                    <TextInput
                        style = {{marginLeft: 5, width:100}}
                        placeholder = 'Tìm kiếm'
                        returnKeyType = {"next"}
                        // underlineColorAndroid="transparent"
                        onChangeText = {(TimKiem) => this.setState({TimKiem})}/>
                    </View>
                    <View  style = {{flexDirection: 'row', alignItems:'center', marginRight:5}}>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('DangNhap')}>
                        <View style = {{height: 25, width: 80,
                            alignItems:'center',
                            justifyContent:'center',
                            borderWidth:1,
                            backgroundColor:'#90CAF9',
                            borderRadius: 3,
                            borderColor:'black'}}>
                            <Text>Đăng nhập</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('DangKyCuDan')}>
                            <View style = {{height: 25, width: 80,
                                alignItems:'center',
                                marginLeft:5,
                                justifyContent:'center',
                                borderWidth:1,
                                borderRadius: 3,
                                backgroundColor:'#90CAF9',
                                borderColor:'black'}}>
                                <Text>Đăng ký</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <SlideImage
                    imageSlider={this.state.imageSlider}

                />
                <Text style = {{fontSize:15, color: "#9CCC65", marginLeft:17, marginTop:10}}>CỘNG ĐỒNG FACEHOME</Text>
                <View style = {{backgroundColor:'black', marginHorizontal:15, height:1}}/>
                <FlatList
                    data={this.state.ArrKDT}
                    numColumns={3}
                    renderItem={(item) => {
                        return (
                            <KDTItem
                                dataItem={item}
                                navigation={navigation}
                                fromDangNhap={true}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}

                />
                <Text style = {{fontSize:15, color: "#9CCC65", marginLeft:17, marginTop:10}}>CHỢ FACEHOME</Text>
                <View style = {{backgroundColor:'black', marginHorizontal:15, height:1}}/>
                <FlatList
                    data={this.state.ArrRaoVat}
                    renderItem={({ item }) =>

                        <TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                                <Image style={[styles.image_circle, {flex:1}]}

                                       source={{
                                           // uri: item.Avartar
                                           uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                                       }}
                                       resizeMode="cover"
                                >
                                </Image>
                                <Text style = {{flex:3, marginLeft: 5, fontWeight:'bold', color: "#448AFF"}}>{item.username}</Text>
                                <Text style = {{flex:6, marginLeft:5}}>{item.content}</Text>
                            </View>
                        </TouchableOpacity>


                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
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

ChuaDangNhap = connect(mapStateToProps, mapDispatchToProps)(ChuaDangNhap);

export default ChuaDangNhap
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        marginTop: 10

    },
})