import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList, StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import KDTItem from "../../components/KDTItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiSearchKDT} from "../../actions/KDTActions";

class ChuaCoCanHo extends Component {
    constructor(props){
        super(props)
        this.state = {
            TimKiem: "",

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
            console.log('dataRes', data.Value)
        })
    }
    render () {
        const { navigation } = this.props
        return (
            <View>
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
                                fromDangNhap={false}
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

ChuaCoCanHo = connect(mapStateToProps, mapDispatchToProps)(ChuaCoCanHo);
export default ChuaCoCanHo
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        marginTop: 10

    },
})