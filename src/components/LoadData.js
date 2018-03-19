import React, { Component } from 'react';
import {
    View,
    ActivityIndicator, AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {bindActionCreators} from "redux";
import {callApiGetProfile} from "../actions/GetProfileActions";

class LoadData extends Component {
    constructor(props){
        // console.log('constructor')
        super(props)
        this.state = {
        }
        this.GetProfile()
    }
    componentWillMount(){
        AsyncStorage.getItem('Type').then((value)=> {
            setTimeout(() => {
                if (value = 1) {
                    // this.props.navigation.navigate('TabBQL')
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'TabBQL',
                            }),
                        ]
                    });
                    this.props.navigation.dispatch(resetAction)
                }
                else if (value = 2) {
                    // this.props.navigation.navigate('TabCuDan')
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'TabCuDan',
                            }),
                        ]
                    });
                    this.props.navigation.dispatch(resetAction)
                }
                else if (value = 3) {
                    // this.props.navigation.navigate(('TabNCC'))
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'TabNCC',
                            }),
                        ]
                    });
                    this.props.navigation.dispatch(resetAction)
                }
            }, 1500)
        })
    }
    //lay thong tin nguoi dung (getprofile)
    GetProfile = ()=> {

        AsyncStorage.getItem('UserID').then((value)=> {
            const {callApiGetProfile} = this.props;
            callApiGetProfile("", value, "", 100).then(dataRes => {
                dataProfile = JSON.parse(dataRes);
                console.log('data', dataProfile)
            })
        })
    }


    render (){
        return (
            <View style={{flex: 1,justifyContent:'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
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
        callApiGetProfile: bindActionCreators(callApiGetProfile, dispatch),


    }
};

LoadData = connect(mapStateToProps, mapDispatchToProps)(LoadData);
export default LoadData