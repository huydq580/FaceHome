import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
import {NavigationActions} from "react-navigation";

class Launcher extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isTime: false
        }
    }
    componentWillMount(){
        setTimeout(()=> {
            this.setState({
                isTime: true
            })
            this.pushScreen();
        },500)

    }
    pushScreen(){
        AsyncStorage.getItem('UserID').then((value)=>{
            console.log('value', value)
            if(value){
                this.props.navigation.navigate('LoadData')
            }
            else {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'DangNhap',
                        }),
                    ]
                });
                this.props.navigation.dispatch(resetAction)

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