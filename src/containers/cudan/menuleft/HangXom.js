import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import stylesContainer from "../../../components/style";
import HangXomItem from "../../../components/hangxom/HangXomItem";

export default class HangXom extends Component {
    constructor(props){
        super(props)
        this.state ={
            listDichVu: [
                {
                    id: 'abcd',
                    name: "Thuê căn hộ",
                    icon: "https://cdn1.iconfinder.com/data/icons/travel-40/256/Vacation_Rental-512.png",
                    type:'house',
                    // icon2:require('../images/thuenha.png')

                },
                {
                    id: 'abcd',
                    name: "Nước uống",
                    icon: "https://img00.deviantart.net/8bf6/i/2011/350/2/a/skylanders_water_icon_by_omniferious-d4j618s.png",
                    type:'common',
                    // icon2:require('../images/nuocuong.png'),
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'10.000 vnđ/bình',
                        description:'nuoc sach'
                    }
                }, {
                    // icon2:require('../images/giupviec.png'),
                    id: 'abcd',
                    name: "Giúp việc",
                    icon: "https://cdn1.iconfinder.com/data/icons/cleaning-services-glyph-black/2048/7849_-_Wipe_with_Hand-512.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'4.000.000đ/tháng',
                        description:'dịch vụ tốt nhất'
                    }
                }, {
                    // icon2:require('../images/goitaxi.png'),
                    id: 'abcd',
                    name: "Gọi taxi",
                    icon: "https://cdn.pixabay.com/photo/2015/01/17/11/37/taxi-icon-602136_640.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'10.000đ/km',
                        description:'taxi giá rẻ'
                    }
                }
                , {
                    // icon2:require('../images/giasu.png'),
                    id: 'abcd',
                    name: "Gia sư",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/62983-200.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'10.000đ/km',
                        description:'taxi giá rẻ'
                    }
                },
                {
                    // icon2:require('../images/bac_si.png'),
                    id: 'abcd',
                    name: "Bác sĩ",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/22779-200.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'80.000đ/lần khám',
                        description:'bác sỹ tận tâm'
                    }
                },
                {
                    // icon2:require('../images/giatla.png'),
                    id: 'abcd',
                    name: "Giặt là",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/28865-200.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'',
                        description:'bác sỹ tận tâm'
                    }
                },
                {
                    // icon2:require('../images/thucphamsach.png'),
                    id: 'abcd',
                    name: "Thực phẩm sạch",
                    icon: "https://png.icons8.com/metro/1600/vegetarian-food.png"
                },
                {
                    // icon2:require('../images/dotaphoa.png'),
                    id: 'abcd',
                    name: "Đồ tạp hóa",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/177723-200.png"
                },
                {
                    // icon2:require('../images/thayga.png'),
                    id: 'abcd',
                    name: "Thay ga",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/8486-200.png"
                },
                {
                    // icon2:require('../images/goiship.png'),
                    id: 'abcd',
                    name: "Gọi ship",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/26575-200.png"
                },
                {
                    // icon2:require('../images/suachua.png'),
                    id: 'abcd',
                    name: "Sửa chữa",
                    icon: "https://di-uploads-pod6.dealerinspire.com/mercedesbenzmanhattan/uploads/2017/04/wrenches12.png"
                },
                {
                    // icon2:require('../images/vanphong.png'),
                    id: 'abcd',
                    name: "Văn phòng",
                    icon: "http://www.free-icons-download.net/images/office-building-icon-28005.png"
                }

            ],

        }
    }
    render(){
        return(
            <View style = {stylesContainer.container}>
                < FlatList
                    showsHorizontalScrollIndicator={false}
                    showVerticalScrollIndicator={false}
                    data={this.state.listDichVu}
                    renderItem={(item) => {
                        return (
                            <HangXomItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                    style={{marginBottom: 100, marginLeft: 10, marginRight: 10, marginTop: 10}}
                />
            </View>
        )
    }
}