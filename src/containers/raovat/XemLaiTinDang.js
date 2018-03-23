import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView, Alert,

} from 'react-native';
import Dimensions from 'Dimensions';
import stylesContainer from "../../components/style";
import {connect} from "react-redux";
import { NavigationActions } from 'react-navigation'
import {bindActionCreators} from "redux";
import {callApiPostRaoVat} from "../../actions/raovat/PostRaoVatActions";

class XemLaiTinDang extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentWillMount (){
        const { InfoUser } = this.props;


    }
    DangBanTin =()=> {
        // this.props.navigation.goBack('DanhMuc')

        const { params } = this.props.navigation.state
        const { callApiPostRaoVat, InfoUser } = this.props;
        if (InfoUser.length<=0){
            return null
        }
        callApiPostRaoVat(
            InfoUser[0].UserID,
            InfoUser[0].FullName,
            InfoUser[0].FullName,
            "",
            "",
            params.danhMuc,
            params.name,
            params.TieuDe,
            params.linkImg,
            params.Gia,
            params.MoTa,
            params.maVung,
            params.tenVung,
            InfoUser[0].KDTID,
            "0963250395",
            params.BanDangTin,
            params.BanLa,



            ).then(dataRes => {
            // console.log('data rao vat', dataRes)
            data = JSON.parse(dataRes);
            if(data.ErrorCode==="00") {
                this.props.navigation.dispatch(NavigationActions.pop({
                    n: 10,
                }))
            }
            else {
                Alert.alert(
                    'Alert',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }


        })
    }
    render() {
        const { params } = this.props.navigation.state
        console.log('params', params)
        return (
            <View style={stylesContainer.container}>
                <ScrollView>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textTren}>Danh mục</Text>
                        <Text style={styles.textDuoi}>{params.name}</Text>
                        <View style={{height: 1, backgroundColor: '#BDBDBD', marginTop: 5}}/>

                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textTren}>Bạn đăng tin</Text>
                        <Text style={styles.textDuoi}>Cần bán</Text>
                        <View style={{height: 1, backgroundColor: '#BDBDBD', marginTop: 5}}/>

                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textTren}>Tỉnh, thành phố</Text>
                        <Text style={styles.textDuoi}>{params.Tinh}</Text>
                        <View style={{height: 1, backgroundColor: '#BDBDBD', marginTop: 5}}/>

                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textTren}>Quận, huyện</Text>
                        <Text style={styles.textDuoi}>{params.tenVung}</Text>
                        <View style={{height: 1, backgroundColor: '#BDBDBD', marginTop: 5}}/>

                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textTren}>Giá</Text>
                        <Text style={styles.textDuoi}>{params.Gia}</Text>
                        <View style={{height: 1, backgroundColor: '#BDBDBD', marginTop: 5}}/>

                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textTren}>Tiêu đề</Text>
                        <Text style={styles.textDuoi}>{params.TieuDe}</Text>
                        <View style={{height: 1, backgroundColor: '#BDBDBD', marginTop: 5}}/>

                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textTren}>Mô tả chi tiết</Text>
                        <Text style={styles.textDuoi}>{params.MoTa}</Text>
                        <View style={{height: 1, backgroundColor: '#BDBDBD', marginTop: 5}}/>

                    </View>
                </ScrollView>
                <View style={styles.TiepTucView}>
                    <TouchableOpacity onPress={this.DangBanTin}>
                        <Text style={styles.TiepTucText}>Đăng bản tin</Text>
                    </TouchableOpacity>
                </View>


            </View>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiPostRaoVat: bindActionCreators(callApiPostRaoVat, dispatch),
    }
};

XemLaiTinDang = connect(mapStateToProps, mapDispatchToProps)(XemLaiTinDang);


export default XemLaiTinDang
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    TiepTucView: {
        height: DEVICE_HEIGHT/11,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF9800'

    },
    TiepTucText: {
        fontWeight:'bold',
        color: 'white'
    },
    viewContainer: {
        flexDirection: 'column',
        marginLeft: 8
    },
    textTren: {
        marginTop: 5

    },
    textDuoi: {
        marginTop: 10,
        fontSize: 16,
        color: 'black'
    }
})