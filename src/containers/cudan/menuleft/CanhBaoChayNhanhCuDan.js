import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment';
import Communications from 'react-native-communications';
import {callApiCanhBaoChay, callApiSearchCanhBaoChay} from "../../../actions/actionsBQL/CanhBaoChayNhanhActions";

class CanhBaoChayNhanhCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            CanhBao: '',
            UserBQL1:'',
            placeholdeText: '',
            data: []

        }
    }
    componentWillMount(){
        const { UserBQL, callApiSearchCanhBaoChay } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        callApiSearchCanhBaoChay(UserBQL.payload[0].KDTID).then((dataSearch) => {
            dataSearch1 = JSON.parse(dataSearch);
            console.log('dataSearch', dataSearch1)
            this.setState({
                data: dataSearch1.Value
            })
        })
    }
    BaoChay () {
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        // console.log('userbbql1', UserBQL)
        const { callApiCanhBaoChay } = this.props;
        callApiCanhBaoChay(UserBQL.payload[0].KDTID, UserBQL.payload[0].UserID,  UserBQL.payload[0].FullName, this.state.CanhBao).then((dataCanhBaoChay) => {
            data = JSON.parse(dataCanhBaoChay);
            if(data.ErrorCode === "00"){
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
    render(){
        const {navigate} = this.props.navigation;
        // console.log('navigation', this.props.navigation)
        return(
            <ScrollView>
                <View style = {[styles.itemBoder, {minHeight:120}]}>
                    <TextInput placeholder = 'Ban quản lí nhập thông tin tại đây '
                               underlineColorAndroid="transparent"
                               onChangeText ={(CanhBao)=> this.setState({CanhBao})}/>
                </View>
                <TouchableOpacity onPress = {this.BaoChay.bind(this)}>
                    <View style = {{justifyContent:'center', marginTop:30, marginHorizontal:90, minHeight: 90, alignItems:'center',justifyContent: 'center'}}>
                        <Text style = {{borderWidth:1, backgroundColor:'red'}}>Báo Cháy</Text>
                    </View>
                </TouchableOpacity>

                <View style = {{flexDirection:'row', marginLeft:20, marginTop:20}}>
                    <Text>Hoặc gọi ngay cứu hỏa: </Text>
                    <TouchableOpacity onPress={() => Communications.phonecall('114', true)}>
                        <Text style = {{marginLeft:30, borderWidth:1, backgroundColor:'#0288D1'}}>114</Text>
                    </TouchableOpacity>
                </View>
                <Text style = {{marginTop:20}}>Lịch sử báo cháy</Text>
                <FlatList
                    data = {this.state.data}
                    renderItem = {({item}) =>
                        <TouchableOpacity onPress = {()=> navigate('ChiTietCanhBaoChayCuDan')}>
                            <View style = {{flexDirection:'row', marginTop:10}}>
                                <Text style = {{marginLeft:15}}>
                                    {item.RowNum}
                                </Text>
                                <Text style = {{marginLeft:15}}>Ngày </Text>
                                <Text>
                                    {/*{item.CreatedDate}*/}
                                    {moment(new Date(item.CreatedDate)).format("L")}
                                </Text>
                                <Text style = {{marginLeft:20, color:'red'}}>
                                    {item.FullName}
                                </Text>

                            </View>

                        </TouchableOpacity>

                    }
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent = {this.renderSeparator}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
        // infoBQL: state.NhaBQLReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiCanhBaoChay: bindActionCreators(callApiCanhBaoChay, dispatch),
        callApiSearchCanhBaoChay: bindActionCreators(callApiSearchCanhBaoChay, dispatch)
    }
};

CanhBaoChayNhanhCuDan = connect(mapStateToProps, mapDispatchToProps)(CanhBaoChayNhanhCuDan);
export default CanhBaoChayNhanhCuDan;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
        borderColor:'#9E9E9E',
        justifyContent:'center',
        // alignItems:'center'
    },
})