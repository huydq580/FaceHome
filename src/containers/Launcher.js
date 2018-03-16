import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'

class Launcher extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isTime: false
        }
    }
    componentWillMount(){
        // const { UserBQL } = this.props;
        // if (UserBQL.length <= 0) {
        //     return null;
        // }
        // console.log('userblq', UserBQL)
        setTimeout(()=> {
            this.setState({
                isTime: true
            })
            this.pushScreen();
        },2000)

    }
    pushScreen(){
        AsyncStorage.getItem('UserID').then((value)=>{
            console.log('value', value)
            if(value){
                this.props.navigation.navigate('LoadData')
            }
            else {
                this.props.navigation.navigate(('DangNhap'))
            }
        })
    }
    render (){
        return (
            <View style = {{ flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Text>Logo</Text>
            </View>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
    }
};
Launcher = connect(mapStateToProps)(Launcher);
export default Launcher