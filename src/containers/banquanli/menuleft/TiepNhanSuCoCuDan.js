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
import SuCoItem from "../../../components/baocaosuco/SuCoItem";

class TiepNhanSuCoCuDan extends Component {
    constructor(props){
        super(props)
        this.state  = {
            SuCo: '',
            dataSuCo: []
        }
    }
    componentWillMount(){
        this.SearchSuCoKDT()

    }
    SearchSuCoKDT = (type) => {
        const { callApiSearchSuCo,InfoUser  } = this.props;
        if (InfoUser.length<=0){
            return null;
        }
        callApiSearchSuCo(InfoUser[0].KDTID, type ).then(dataRes => {
            dataRes = JSON.parse(dataRes)
            dataRes = dataRes.Value,
                this.setState({
                    dataSuCo:dataRes,
                })
            console.log('datasuco', dataRes)
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
                    onValueChange={(value) => {
                        this.setState({SuCo: value})
                        this.SearchSuCoKDT(value)
                    }}>
                    <Picker.Item label = {'Tất cả'} value = ''/>
                    <Picker.Item label = {'Nhà riêng'} value ={'1'}/>
                    <Picker.Item label = {'Công cộng'} value ={'2'}/>
                </Picker>
                <FlatList
                    data = {this.state.dataSuCo}
                    renderItem={(item) => {
                        return (
                            <SuCoItem
                                dataItem={item}
                                navigation={navigation}
                                fromBQL= {true}
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
        InfoUser: state.GetProfileReducers,
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