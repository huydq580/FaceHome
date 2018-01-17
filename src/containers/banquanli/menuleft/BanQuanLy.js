import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {callApiGetBQL} from "../../../actions/BQLActions";

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
        const { callApiGetBQL } = this.props;
        callApiGetBQL(UserBQL.payload[0].KDTID).then(dataGetBQL => {
            dataGetBQL = JSON.parse(dataGetBQL)
            dataGetBQL = dataGetBQL.Value
            this.setState({
                data: dataGetBQL
            })
            console.log('datagetBQL', dataGetBQL)
        })
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style = {stylesContainer.container}>
                <View style = {{alignItems:'center', marginTop: 30}}>
                    <Text style = {{color:'red'}}>Danh sách ban quản lí KĐT[ABC]</Text>
                </View>
                <FlatList
                    style = {{marginTop:20}}
                    data = {this.state.data}
                    renderItem = {({item}) =>
                        <TouchableOpacity onPress = {()=> navigate('ChiTietThanhVienBQL')}>
                            <View style = {{flexDirection:'row', marginTop: 30,}}>
                                <View style = {{flex:1, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.RowNum}</Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.FullName}</Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.Position}</Text>
                                </View>
                                <View style = {{flex:3, justifyContent:'center'}}>
                                    <Text style = {styles.textItem}>{item.RowNum}</Text>
                                </View>

                            </View>

                        </TouchableOpacity>

                    }
                    keyExtractor={(item, index) => index}
                />
                <View style = {{marginBottom:200, marginLeft:150}}>
                    <TouchableOpacity onPress = {()=> navigate('TaoThanhVienBQL')}>
                        <Text style = {{color: 'red'}}>Tạo tài khoản thành viên BQL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiGetBQL: bindActionCreators(callApiGetBQL, dispatch)
    }
};

BanQuanLy = connect(mapStateToProps, mapDispatchToProps)(BanQuanLy);
export default BanQuanLy;
const styles = StyleSheet.create({
    textItem: {
        color: 'black',
    }
})

