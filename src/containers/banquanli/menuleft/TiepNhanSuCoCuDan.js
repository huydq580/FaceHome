import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Picker,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {callApiSearchSuCo} from "../../../actions/SuCoActions";
import SuCoItemBQL from "../../../components/baocaosuco/SuCoItemBQL";

class TiepNhanSuCoCuDan extends Component {
    constructor(props){
        super(props)
        this.state  = {
            SuCo: '',
            dataSuCo: []
        }
    }
    componentWillMount(){
        const { callApiSearchSuCo, UserBQL  } = this.props;
        if (UserBQL.length<=0){
            return null;
        }
        callApiSearchSuCo(UserBQL.payload[0].KDTID , UserBQL.payload[0].UserID, this.state.SuCo).then(dataRes => {
            dataRes = JSON.parse(dataRes)
            dataRes = dataRes.Value
            this.setState({
                dataSuCo: dataRes,
            })
        })

    }
    render(){
        const {navigation} = this.props;
        return(
            <ScrollView style = {stylesContainer.container}>
                <TouchableOpacity onPress = { () => this.props.navigation.navigate('BaoSuCoMoi')}>
                    <Text style = {{color: 'black', textDecorationLine: "underline", marginTop:10, marginBottom:10, marginRight: 20}}>
                        Báo sự cố mới
                    </Text>
                </TouchableOpacity>
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
                            <SuCoItemBQL
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiSearchSuCo: bindActionCreators(callApiSearchSuCo, dispatch)
    }
};

TiepNhanSuCoCuDan = connect(mapStateToProps, mapDispatchToProps)(TiepNhanSuCoCuDan);
export default TiepNhanSuCoCuDan;