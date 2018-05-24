import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import stylesContainer from "../../../components/style";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { callApiInfoKDT } from "../../../actions/actionsBQL/KDTInfoActions";
import {BACKGROUND_HEADER, TITLE_HEADER, TITLE_VIEW_GIOITHIEUKDT} from "../../../Constants";
import SlideImage from "../../../components/SlideImage";

class ThongTinKDTCuDan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: "Thông tin cần biết KĐT",
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
    GetInfoKDT (){
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        const { callApiInfoKDT } = this.props;
        callApiInfoKDT(100, 1, InfoUser[0].KDTID,InfoUser[0].Type, 0).then(dataKDTInfo => {
            console.log('dataInfo', dataKDTInfo)

        })
        this.props.navigation.navigate('ChiTietThongTinKDT')
    }
    render (){
        return (
            <View style = {stylesContainer.container}>
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
                    <Text style = {styles.titleText}>Các địa chỉ liên lạc cần biết</Text>

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
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        infonha: state.KDTInfoReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        callApiInfoKDT: bindActionCreators(callApiInfoKDT, dispatch)
    }
};

ThongTinKDTCuDan = connect(mapStateToProps, mapDispatchToProps)(ThongTinKDTCuDan);
export default ThongTinKDTCuDan;
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
