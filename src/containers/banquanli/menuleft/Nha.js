import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {callApiNha} from "../../../actions/actionsBQL/NhaActions";
import stylesContainer from "../../../components/style";



class Nha extends Component {
    componentWillMount() {
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }

        // console.log('userbql', UserBQL.payload[0].UserID)
        const {callApiNha} = this.props;
        callApiNha(UserBQL.payload[0].ProfileID, UserBQL.payload[0].UserID, UserBQL.payload[0].Type).then(dataNha => {
            // dataNhaBQL = JSON.parse(dataNha);
            // console.log('data', dataNhaBQL)
        })
    }
    render (){
        // console.log('render')
        const { infoBQL } = this.props;
        if (infoBQL.length <= 0) {
            return null;
        }
        // console.log('infoBQL', infoBQL[0].FullName)
        return (
            <View style = {stylesContainer.container}>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                    <View style = {styles.circle}>
                        <Text>Avatar</Text>
                    </View>
                    <Text style = {{color:'red', fontSize: 20}}>{infoBQL[0].FullName}</Text>
                </View>
                <TouchableOpacity style = {styles.Touch}
                                    onPress = {()=>this.props.navigation.navigate('ThongTinCaNhanBQL')}>
                    <Text style = {{color: 'white'}}>
                        Nhật ký
                    </Text>
                </TouchableOpacity>
                <View style = {{flexDirection: 'column', marginLeft: 40,
                    backgroundColor:"#42A5F5",width:200,height:100, borderWidth:1,marginTop:8,
                    justifyContent:'center'
                }}>
                    <Text style ={{marginLeft:10, color:'white'}}>Thông tin cá nhân</Text>
                    <View style = {{flexDirection:'row', marginLeft:10,}}>
                        <Text style = {{color: 'white', fontSize:15}}>Tên:</Text>
                        <Text>{infoBQL[0].FullName}</Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft:10, }}>
                        <Text style = {{color: 'white',fontSize:15}}>Số điện thoại:</Text>
                        <Text>{infoBQL[0].Phone}</Text>
                    </View>
                </View>
                <View style = {styles.viewItem}>
                    <Text style = {{flex:5}}>Bạn có muốn đăng bài lên bản tin không?</Text>
                    <View style = {{flex:1,borderWidth:1, backgroundColor: '#42A5F5', width:100,height:40,
                        alignItems:'center', justifyContent:'center'}}>
                        <Text>Đăng</Text>
                    </View>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng 1</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng 2</Text>
                </View>
                <View style = {styles.viewItem}>
                    <Text>Bài đăng 3</Text>
                </View>



            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
        infoBQL: state.NhaBQLReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiNha: bindActionCreators(callApiNha, dispatch)
    }
};

Nha = connect(mapStateToProps, mapDispatchToProps)(Nha);
export default Nha;
const styles = StyleSheet.create({
    circle: {
        marginTop: 15,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#42A5F5',
        alignItems: 'center',
        justifyContent:'center'
    },
    Touch: {
        marginTop: 8,marginLeft: 40,
        borderWidth:1, backgroundColor: '#FB8C00', width:100,height:40,
        alignItems:'center', justifyContent:'center'
    },
    viewItem: {
        flexDirection: 'row',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 30,
        marginTop:20,
        minHeight:50,
    }
})
