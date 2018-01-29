import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Picker,
    TouchableOpacity
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SuCoItemCuDan from "../../../components/baocaosuco/SuCoItemCuDan";
import stylesContainer from "../../../components/style";
import {callApiSearchSuCo} from "../../../actions/SuCoActions";

class BaoSuCoKDT extends Component {
    constructor(props){
        super(props)
        this.state  = {
            SuCo: '',
            dataSuCo: []
        }
    }
    componentWillMount(){
        const { callApiSearchSuCo,UserCuDan  } = this.props;
        if (UserCuDan.length<=0){
            return null;
        }
        callApiSearchSuCo(UserCuDan.payload[0].KDTID , UserCuDan.payload[0].UserID, this.state.SuCo).then(dataRes => {
            dataRes = JSON.parse(dataRes)
            dataRes = dataRes.Value,
                this.setState({
                    dataSuCo:dataRes,
                })
            console.log('datasuco', dataRes.Value)
        })

    }
    render(){
        const {navigation} = this.props;
        return(
            <View style = {stylesContainer.container}>
                <Picker
                    selectedValue={this.state.SuCo}
                    onValueChange={(itemValue, itemIndex) => this.setState({SuCo: itemValue})}>
                    <Picker.Item label = {'Tất cả'} value = ''/>
                    <Picker.Item label = {'Nhà riêng'} value ={'key1'}/>
                    <Picker.Item label = {'Công cộng'} value ={'key2'}/>
                </Picker>
                <FlatList
                    data = {this.state.dataSuCo}
                    renderItem={(item) => {
                        return (
                            <SuCoItemCuDan
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        UserCuDan: state.LoginReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiSearchSuCo: bindActionCreators(callApiSearchSuCo, dispatch)
    }
};

BaoSuCoKDT = connect(mapStateToProps, mapDispatchToProps)(BaoSuCoKDT);
export default BaoSuCoKDT;