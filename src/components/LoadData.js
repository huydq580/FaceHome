import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class LoadData extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentWillMount(){
        const {params} = this.props.navigation.state;
        setTimeout(()=> {
            if (params.data.Value[0].Type ===1){
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
            else if(params.data.Value[0].Type ===2){
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
            else if (params.data.Value[0].Type ===3){
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