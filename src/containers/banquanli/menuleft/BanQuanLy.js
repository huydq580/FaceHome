import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {callApiGetBQL} from "../../../actions/actionsBQL/BQLActions";
import {callApiGetProfile} from "../../../actions/GetProfileActions";
import {GetProfileBQL, URL} from "../../../components/Api";

class BanQuanLy extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],


        }
    }
    componentWillMount() {
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }

        // console.log('user',UserBQL)

        const { callApiGetBQL } = this.props;
        callApiGetBQL(InfoUser[0].KDTID).then(dataGetBQL => {
            dataGetBQL = JSON.parse(dataGetBQL)
            dataGetBQL = dataGetBQL.Value
            console.log('serach bql', dataGetBQL)
            this.setState({
                data: dataGetBQL
            })
            // console.log('datagetBQL', dataGetBQL)
        })
    }


    render(){
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style = {stylesContainer.container}>
                <View style = {{alignItems:'center', marginTop: 30}}>
                    <Text style = {{color:'red'}}>Danh sách ban quản lí KĐT[ABC]</Text>
                </View>
                <FlatList
                    style = {{marginTop:20}}
                    data = {this.state.data}
                    renderItem = {({item}) => (
                        <TouchableOpacity onPress = {() => {
                            const {chiTietBQL, callApiGetProfile} = this.props
                            if (chiTietBQL.length <= 0) {
                                return null;
                            }
                            //lay a  = item = stt - 1
                            a = item.RowNum-1;
                            const { InfoUser } = this.props;
                            if (InfoUser.length <= 0) {
                                return null;
                            }

                            fetch( URL + GetProfileBQL,  {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',

                                },
                                body: JSON.stringify({
                                    profile_id: chiTietBQL.payload[a].ProfileID,
                                    user_id: chiTietBQL.payload[a].UserID,
                                    // user_type: InfoUser[0].Type,
                                    option: 101,
                                    lang_name: "vi_VN"
                                })
                            })
                                .then((response) => response.json())
                                .then((dataChitietBQL)=> {
                                    dataChitietBQL = JSON.parse(dataChitietBQL)
                                        this.props.navigation.navigate("ChiTietThanhVienBQL", {dataBQL: dataChitietBQL.Value, ItemBQL: item})

                                }).catch((erro)=> {
                                console.log('erro',erro);
                            })

                        }}>
                            <View style = {{flexDirection:'row', marginTop: 20, alignItems:'center'}}>
                                <View style = {{flex:1, alignItems:'center'}}>
                                    <Text style = {styles.textItem}>{item.RowNum}</Text>
                                </View>
                                <View style = {{flex:4, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.FullName}</Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>
                                        {
                                            item.Position === 1 ? <Text>Trưởng BQL</Text> :
                                                item.Position === 2 ? <Text>Thành vien BQL</Text> :
                                                    null
                                        }
                                        </Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {[styles.textItem, {marginLeft:5}]}>
                                        {
                                            item.Status === 0 ? <Text>Đang chờ duyệt</Text> :
                                                item.Status === 1 ? <Text>Đang hoạt động</Text> :
                                                    item.Status === 2 ? <Text>Dừng hoạt động</Text> :
                                                        null
                                        }
                                    </Text>
                                </View>

                            </View>

                        </TouchableOpacity>
                    )

                    }
                    keyExtractor={(item, index) => index}
                />
                <View style = {{marginTop:20, marginLeft:150}}>
                    <TouchableOpacity onPress = {()=> navigate('TaoThanhVienBQL')}>
                        <Text style = {{color: 'red'}}>Tạo tài khoản thành viên BQL</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        chiTietBQL: state.BQLReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiGetBQL: bindActionCreators(callApiGetBQL, dispatch),
        // callApiGetProfile: bindActionCreators(callApiGetProfile, dispatch)
    }
};

BanQuanLy = connect(mapStateToProps, mapDispatchToProps)(BanQuanLy);
export default BanQuanLy;
const styles = StyleSheet.create({
    textItem: {
        color: 'black',
    }
})

