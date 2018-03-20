import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import stylesContainer from "../../components/style";
import Dimensions from 'Dimensions';
import {connect} from "react-redux";
import {callApiTinh} from "../../actions/TinhThanhActions";
import {bindActionCreators} from "redux";
import {callApiQuanHuyen} from "../../actions/QuanHuyenActions";

class KhuVucRaoVat extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataItemTinh: [],
            dataItemHuyen: [],

        }


    }
    componentWillMount() {
        const { callApiTinh } = this.props;
        callApiTinh().then(dataTinh => {
            dataTinh = JSON.parse(dataTinh);
            dataTinh = dataTinh.Value;
            this.setState({
                dataItemTinh: dataTinh
            })
        })
    }
    CallApiQuanHuyen=(maVung)=>{
        const { params } = this.props.navigation.state
        const { callApiQuanHuyen } = this.props;
        callApiQuanHuyen(maVung).then(dataQuanHuyen => {
            dataQuanHuyen = JSON.parse(dataQuanHuyen);
            dataQuanHuyen = dataQuanHuyen.Value;
            // console.log('dataQuan', dataQuanHuyen)
            this.setState({
                dataItemHuyen: dataQuanHuyen
            })
            this.props.navigation.navigate('QuanHuyenRaoVat',
                {
                    dataQuan: dataQuanHuyen,
                    danhMuc:params.danhMuc,
                    name: params.name
                })
        })
    }
    // TiepTucRaoVat =()=> {
    //     this.props.navigation.navigate('QuanHuyenRaoVat')
    // }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <FlatList
                    style = {{marginTop:10}}
                    data = {this.state.dataItemTinh}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress = {()=> this.CallApiQuanHuyen(item.MaVung)}>
                                <View style = {{flexDirection:'column', marginTop: 12, flex:1, marginLeft: 5}}>
                                    <Text style = {{ fontSize:16}}>{item.TenVung}</Text>
                                    <View style = {{height:1, backgroundColor:"#BDBDBD", marginTop:12}}/>
                                </View>
                            </TouchableOpacity>

                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                />

                {/*<View style = {styles.TiepTucView}>*/}
                    {/*<TouchableOpacity onPress = {this.TiepTucRaoVat}>*/}
                        {/*<Text style = {styles.TiepTucText}>TIẾP TỤC</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiTinh: bindActionCreators(callApiTinh, dispatch),
        callApiQuanHuyen: bindActionCreators(callApiQuanHuyen, dispatch),

    }
};
KhuVucRaoVat = connect(mapStateToProps, mapDispatchToProps)(KhuVucRaoVat);
export default KhuVucRaoVat
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
    }
})