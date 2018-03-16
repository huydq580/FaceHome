import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {bindActionCreators} from "redux";
import {callApiGetProfile} from "../actions/GetProfileActions";

class LoadData extends Component {
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
        }
        this.GetProfile()
    }
    componentWillMount(){
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        console.log('userblq', UserBQL.payload[0])

        // const {params} = this.props.navigation.state;
        setTimeout(()=> {
            if (UserBQL.payload[0].Type ===1){
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
            else if(UserBQL.payload[0].Type ===2){
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
            else if (UserBQL.payload[0].Type ===3){
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
        },1500)
    }
    //lay thong tin nguoi dung (getprofile)
    GetProfile = ()=> {
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        console.log('userblq11', UserBQL.payload[0])

        // console.log('userbql', UserBQL.payload[0].UserID)
        const { callApiGetProfile } = this.props;
        callApiGetProfile(UserBQL.payload[0].ProfileID, UserBQL.payload[0].UserID, UserBQL.payload[0].Type, 100).then(dataRes => {
            dataProfile = JSON.parse(dataRes);
            console.log('data', dataProfile)
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
        UserBQL: state.LoginReducers,
    }
};
const mapDispatchToProps = (dispatch) => {

    return {
        callApiGetProfile: bindActionCreators(callApiGetProfile, dispatch),


    }
};

LoadData = connect(mapStateToProps, mapDispatchToProps)(LoadData);
export default LoadData