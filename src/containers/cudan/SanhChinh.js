import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator,
    AsyncStorage, StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import stylesContainer from "../../components/style";

import ChuaDangNhap from "../ChuaDangNhap";
import DaCoCanHo from "./DaCoCanHo";
import ChuaCoCanHo from "./ChuaCoCanHo";

class SanhChinh extends Component {
    constructor (props){
        super(props)
        this.state = {
            value: '',
            LtProfile: "",
        }

    }
    _loadInitialState = async () => {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        try {

            let value = await AsyncStorage.getItem("UserID");
            if (value !== null){
                this.setState({
                    value: value,
                    LtProfile : InfoUser[0].LtProfile

                }, console.log('valueLoad', this.state.value))
            }
        } catch (error) {
            //
        }
    };
    componentWillMount () {
        this._loadInitialState().done();
    }
    renderGiaoDien = () => {
        console.log('this.state.value', this.state.value)
        // console.log('this.state.LtProfile', this.state.LtProfile)
        const { navigation } = this.props;
        if (this.state.value) {
            if (this.state.LtProfile){
                return (
                    <DaCoCanHo
                        navigation={navigation}/>
                )
            }
            else {
                return (
                    <ChuaCoCanHo
                        navigation={navigation}/>
                )
            }

        }
        else {
            return (
                <ChuaDangNhap
                    navigation={navigation}/>
            )
        }

    }
    render () {
        const { navigation } = this.props;
        return (
            <View style = {{flex:1}}>
                {this.renderGiaoDien()}
                
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
    }
};

SanhChinh = connect(mapStateToProps, mapDispatchToProps)(SanhChinh);
export default SanhChinh;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },

})