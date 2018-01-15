import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class LoadData extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentWillMount(){
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }
        // console.log('userblq', UserBQL.payload[0].Type)

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
        // infoBQL: state.NhaBQLReducers
    }
};
LoadData = connect(mapStateToProps)(LoadData);
export default LoadData