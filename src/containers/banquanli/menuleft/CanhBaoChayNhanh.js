import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Communications from 'react-native-communications';
import {callApiCanhBaoChay} from "../../../actions/CanhBaoChayNhanhActions";

class CanhBaoChayNhanh extends Component {
    constructor(props){
        super(props)
        this.state = {
            CanhBao: '',
            UserBQL1:'',
            placeholdeText: '',
            data: [
                {
                    stt: '1',
                    ngay: '16/01/2018',
                    hoten: 'Nguyen Van A'
                },
                {
                    stt: '2',
                    ngay: '19/01/2018',
                    hoten: 'Nguyen Van B'
                },
                {
                    stt: '3',
                    ngay: '26/01/1995',
                    hoten: 'Nguyen Van C'
                },


            ]

        }
    }
    componentWillMount(){
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        // this.setState({
        //     UserBQL1: UserBQL.payload[0]
        // })
        // console.log('userbbql', UserBQL)
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


            console.log('dataCanhBaoChay', data)
        })
    }
    render(){
        return(
            <View>
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
                        <TouchableOpacity onPress = {()=> navigate('ThongTinBaoChay')}>
                            <View style = {{flexDirection:'row', marginTop:10}}>
                                <Text style = {{marginLeft:15}}>
                                    {item.stt}
                                </Text>
                                <Text style = {{marginLeft:15}}>Ngày </Text>
                                <Text>
                                    {item.ngay}
                                </Text>
                                <Text style = {{marginLeft:20, color:'red'}}>
                                    {item.hoten}
                                </Text>

                            </View>

                        </TouchableOpacity>

                    }
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent = {this.renderSeparator}
                />
            </View>
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
        callApiCanhBaoChay: bindActionCreators(callApiCanhBaoChay, dispatch)
    }
};

CanhBaoChayNhanh = connect(mapStateToProps, mapDispatchToProps)(CanhBaoChayNhanh);
export default CanhBaoChayNhanh;
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