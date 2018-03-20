import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,

} from 'react-native';
import Dimensions from 'Dimensions';
import stylesContainer from "../../components/style";

class XemLaiTinDang extends Component {
    DangBanTin =()=> {
        console.log('hihi')
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
                        <Text style={styles.textDuoi}>{params.tenVung}</Text>
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