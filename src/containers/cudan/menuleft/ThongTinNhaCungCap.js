import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import stylesContainer from "../../../components/style";
import Header from "../../../components/taikhoancuabancudan/Header";
import images from "../../../components/images";
import TitleView from "../../../components/taikhoancuabancudan/TitleView";
import SlideImage from "../../../components/SlideImage";

class ThongTinNhaCungCap extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Thông tin nhà cung cấp',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
        super(props)
        this.state = {
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
        }
    }
    render (){
        return (
            <ScrollView style = {stylesContainer.container}>
                <Header
                    source={{uri: "https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg"}}
                    textName="Nguyễn Văn Hiệu"
                    Title=""/>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ThongTinNhaCungCap')}>
                    <View style = {{justifyContent:'center',
                        alignItems:'center', borderWidth: 1,
                        borderRadius: 3, height: 30,marginLeft: DEVICE_WIDTH/2+ 50,
                        width: 90}}>
                        <Text>
                            Nhắn tin
                        </Text>
                    </View>


                </TouchableOpacity>
                <TitleView titleText="Thông tin nhà cung cấp"
                           source={images.thongtincoban}/>
                <View style = {{marginTop:10}}>
                    <Text style = {{marginLeft: 20, color: 'black'}}>Tên: Cửa hàng thực phẩm sạch Bác tôm</Text>
                    <Text style = {{marginLeft: 20, color: 'black'}}>Địa chỉ: Mỗ Lao, Hà Đông</Text>
                </View>
                <View style = {{marginTop: 10, marginHorizontal: 20}}>
                    <SlideImage
                        imageSlider={this.state.imageSlider}

                    />
                </View>
                <TitleView titleText="Bài đăng gần đây"
                           source={images.thongtincoban}/>
            </ScrollView>
        )
    }
}
export default ThongTinNhaCungCap