import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native'
import {BACKGROUND_HEADER, TITLE_HEADER, TITLE_VIEW_GIOITHIEUKDT} from "../../Constants";
import SlideImage from "../../components/SlideImage";

class GioiThieuKDT extends Component{
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: params.title,
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
    render () {
        return (
            <ScrollView>
                <View style = {styles.titleView}>
                    <Text style = {styles.titleText}>Giới thiệu</Text>

                </View>
                <View style = {styles.contentView}>
                    <Text style = {styles.contentText}>
                        Chung cư cao cấp Euro Land được xây dựng trên diện tích
                        8.238 m2 tại Khu Đô thị Mỗ Lao, phường Mộ Lao, quận Hà
                        Đông, thành phố Hà Nội. Euro Land nằm giữa hai tuyến đường
                        chính là Quốc lộ 6 và đường Lê Văn Lương kéo dài, cách Trung
                        tâm Hội nghị Quốc gia khoảng 1,5 km. Đây là một trong những
                        dự án do Công ty TSQ Việt Nam làm Chủ Đầu tư .
                    </Text>
                </View>
                <View style = {[styles.titleView, {marginTop: 10}]}>
                    <Text style = {styles.titleText}>Quy định, nội quy khu đô thị TSQ EUROLAND</Text>

                </View>
                <View style = {[styles.contentView, {marginTop: 5}]}>
                    <Text style = {styles.contentText}>
                        Điều 1: Giữ gìn vệ sinh trong khu đô thị không vứt rác bừa bãi
                    </Text>
                    <Text style = {styles.contentText}>
                        Điều 1: Giữ gìn vệ sinh trong khu đô thị không vứt rác bừa bãi
                    </Text>
                    <Text style = {styles.contentText}>
                        Điều 1: Giữ gìn vệ sinh trong khu đô thị không vứt rác bừa bãi
                    </Text>
                    <Text style = {styles.contentText}>
                        Điều 1: Giữ gìn vệ sinh trong khu đô thị không vứt rác bừa bãi
                    </Text>
                </View>
                <View style = {[styles.titleView, {marginTop: 10}]}>
                    <Text style = {styles.titleText}>Quy định, nội quy khu đô thị TSQ EUROLAND</Text>

                </View>
                <View style = {[styles.contentView, {marginTop: 5}]}>
                    <Text style = {styles.contentText}>
                        1. Bệnh viện quân đội 103 địa chỉ xx-xx-xx
                    </Text>
                    <Text style = {styles.contentText}>
                        1. Bệnh viện quân đội 103 địa chỉ xx-xx-xx
                    </Text>
                    <Text style = {styles.contentText}>
                        1. Bệnh viện quân đội 103 địa chỉ xx-xx-xx
                    </Text>
                    <Text style = {styles.contentText}>
                        1. Bệnh viện quân đội 103 địa chỉ xx-xx-xx
                    </Text>
                </View>
                <View style = {{marginTop: 10}}>
                    <SlideImage
                        imageSlider={this.state.imageSlider}

                    />
                </View>
            </ScrollView>
        )
    }
}
export default GioiThieuKDT
const styles = StyleSheet.create({
    titleView: {
        justifyContent:'center',
        alignItems:'center',
        height: 30,
        backgroundColor: TITLE_VIEW_GIOITHIEUKDT,
        borderWidth:1,
        borderColor:'#9CCC65'
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold'
    },
    contentView: {
        marginHorizontal: 20,
        marginTop:5,
    },
    contentText: {
        color: "black"
    }
})