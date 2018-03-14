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
import {callApiNha} from "../../../actions/actionsBQL/NhaActions";

class BanQuanLy extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],


        }
    }
    componentWillMount() {
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }

        // console.log('user',UserBQL)

        const { callApiGetBQL } = this.props;
        callApiGetBQL(UserBQL.payload[0].KDTID).then(dataGetBQL => {
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
                            const {chiTietBQL, callApiNha} = this.props
                            if (chiTietBQL.length <= 0) {
                                return null;
                            }
                            //lay a  = item = stt - 1
                            a = item.RowNum-1;
                            // console.log('a', a)
                            // console.log('wtf', chiTietBQL.payload[a])
                            callApiNha(chiTietBQL.payload[a].ProfileID,chiTietBQL.payload[a].UserID).then(dataChitietBQL => {
                                dataChitietBQL = JSON.parse(dataChitietBQL)
                                this.props.navigation.navigate("ChiTietThanhVienBQL", {dataBQL: dataChitietBQL.Value, ItemBQL: item})
                                // console.log('dataChitietBQL', dataChitietBQL)
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
        UserBQL: state.LoginReducers,
        chiTietBQL: state.BQLReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiGetBQL: bindActionCreators(callApiGetBQL, dispatch),
        callApiNha: bindActionCreators(callApiNha, dispatch)
    }
};

BanQuanLy = connect(mapStateToProps, mapDispatchToProps)(BanQuanLy);
export default BanQuanLy;
const styles = StyleSheet.create({
    textItem: {
        color: 'black',
    }
})

