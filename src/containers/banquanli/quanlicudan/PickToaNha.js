import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import stylesContainer from "../../../components/style";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiGetKDT} from "../../../actions/KDTActions";
import {NavigationActions} from "react-navigation";


class PickToaNha extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataToaNha: [],

        }

    }
    componentWillMount(){
        const {InfoUser, callApiGetKDT} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        callApiGetKDT(InfoUser[0].KDTID).then(dataRes => {
            dataToaNha = JSON.parse(dataRes)
            dataToaNha = dataToaNha.Value
            this.setState({
                dataToaNha: dataToaNha
            })
        })
    }
    render (){
        console.log('this.state.dataoannha', this.state.dataToaNha)
        return (
            <View style = {stylesContainer.container}>
                <FlatList
                    data={this.state.dataToaNha}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress = {() => this.props.navigation.goBack({title:'hihi'})}>
                                <View style = {{flex:1, marginTop: 10}}>
                                    <Text style = {{fontSize: 18, marginLeft: 10}}>{item.Ten}</Text>
                                    <View style = {{marginTop: 10, height:1, backgroundColor: '#9E9E9E'}}/>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                />

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
        callApiGetKDT: bindActionCreators(callApiGetKDT, dispatch)
    }
};

PickToaNha = connect(mapStateToProps, mapDispatchToProps)(PickToaNha);
export default PickToaNha;