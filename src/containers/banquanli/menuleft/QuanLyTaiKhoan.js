import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import stylesContainer from "../../../components/style";
import Modal from "react-native-modal";
import {bindActionCreators} from "redux";
import {callApiSubcribe} from "../../../actions/SubcribeActions";
import {connect} from "react-redux";

class QuanLyTaiKhoan extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibleModal: null
        };
    }


    UnSubcribe = () =>  {
        const {InfoUser, callApiSubcribe} = this.props;
        if (InfoUser.length <=0) {
            return null
        }
        callApiSubcribe(InfoUser[0].UserID, false).then(dataRes => {
            // console.log('dataUnSubcribe',dataRes )

        })
    }
    render (){
        return (
            <View style = {[stylesContainer.container,{justifyContent:'center'}]}>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('ThayDoiMatKhau')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Thay đổi mật khẩu
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Thay đổi mật khẩu đăng nhập
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=> this.setState({ visibleModal: 5 })}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10, }}>
                            Đăng xuất
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10,textDecorationColor:'#BDBDBD', marginBottom:10, marginLeft:10}}>
                            Thoát và đăng nhập với tài khoản khác
                        </Text>
                    </View>
                </TouchableOpacity>
                {/*{this._renderButton("Bottom half modal", () =>*/}
                    {/*this.setState({ visibleModal: 5 })*/}
                {/*)}*/}
                <Modal
                    isVisible={this.state.visibleModal === 5}
                    style={styles.bottomModal}
                >
                   <View>
                       <TouchableOpacity onPress =  {()=> {
                           this.UnSubcribe()
                           AsyncStorage.removeItem('UserID')
                           const resetAction = NavigationActions.reset({
                               index: 0,
                               actions: [
                                   NavigationActions.navigate({
                                       routeName: 'DangNhap',
                                   }),
                               ]
                           });
                           this.props.navigation.dispatch(resetAction)}}>
                           <View style = {styles.modalContent}>
                               <Text style = {{fontSize:11}}>Bạn có muốn đăng xuất tài khoản này?</Text>
                               <View style = {{height:1, backgroundColor: 'red'}}/>
                               <Text style = {{color: 'red', fontSize:18, marginTop: 15}}>
                                   Đăng xuất
                               </Text>
                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress = { ()=> this.setState({ visibleModal: null })}>
                           <View style = {[styles.modalContent, {marginTop: 10}]}>
                               <Text style = {{fontSize:18, color: '#2196F3'}}>
                                   Hủy
                               </Text>
                           </View>
                       </TouchableOpacity>
                   </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        callApiSubcribe: bindActionCreators(callApiSubcribe, dispatch),


    }
};

QuanLyTaiKhoan = connect(mapStateToProps, mapDispatchToProps)(QuanLyTaiKhoan);

export default QuanLyTaiKhoan
const styles = StyleSheet.create({
    viewitem : {
        borderWidth: 1,
        marginHorizontal:20,
        borderColor:'#BDBDBD'

    },
    modalContent: {
        flexDirection:'column',
        backgroundColor: "white",
        padding: 22,
        // justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 10,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    }
})