import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Picker,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../components/style";
import {callApiSearchDanCu} from "../../actions/actionsBQL/QLDanCuActions";

class QuanLyCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            Toa: '',
            Tang:'',
            dataCuDan: [ ],
        }
    }
    componentWillMount(){
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }

        // console.log('user',UserBQL)

        const { callApiSearchDanCu } = this.props;
        callApiSearchDanCu(UserBQL.payload[0].KDTID).then(dataSearchDanCu => {
            dataSearchDanCu = JSON.parse(dataSearchDanCu)
            dataSearchDanCu = dataSearchDanCu.Value
            this.setState({
                dataCuDan: dataSearchDanCu
            })
            // console.log('datagetBQL', dataGetBQL)
        })
    }
    render() {
        return (
            <View style = {stylesContainer.container}>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Tìm kiếm nhanh tên dân cư theo số căn hộ'
                                underlineColorAndroid="transparent"
                                onChangeText ={(ten)=> this.setState({ten})}/>
                </View>
                <View style = {{flexDirection:'row', marginTop:30}}>
                    <View style = {{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <Text>Tòa: </Text>
                        <Picker
                            style = {styles.picker}
                            selectedValue={this.state.Toa}
                            onValueChange={(itemValue, itemIndex) => this.setState({Toa: itemValue})}>
                            <Picker.Item label = {'Tất cả'} value = ''/>
                            <Picker.Item label = {'HH1A'} value = 'key1'/>
                            <Picker.Item label = {'HH1B'} value ={'key2'}/>
                            <Picker.Item label = {'HH1C'} value ={'key3'}/>
                            <Picker.Item label = {'HH1D'} value ={'key4'}/>
                        </Picker>
                    </View>
                    <View style = {{flex:1, flexDirection:'row',  alignItems:'center'}}>
                        <Text>Tầng/Lầu: </Text>
                        <Picker
                            style = {styles.picker}
                            selectedValue={this.state.Tang}
                            onValueChange={(itemValue, itemIndex) => this.setState({Tang: itemValue})}>
                            <Picker.Item label = {'Tất cả'} value = ''/>
                            <Picker.Item label = {'1'} value = 'key1'/>
                            <Picker.Item label = {'2'} value ={'key2'}/>
                            <Picker.Item label = {'3'} value ={'key3'}/>
                            <Picker.Item label = {'4'} value ={'key4'}/>
                        </Picker>
                    </View>
                </View>
                <FlatList
                    data = {this.state.dataCuDan}
                    renderItem = {({item}) =>
                        <TouchableOpacity>
                            <View style = {{flexDirection:'row', marginTop:10}}>
                                <Text style = {{flex:1}}>{item.RowNum}</Text>
                                <Text style = {{flex:3}}>{item.FullName}</Text>
                                <Text style = {{flex:1}}>{item.PartName}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index}
                    />

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
        callApiSearchDanCu: bindActionCreators(callApiSearchDanCu, dispatch)
    }
};

QuanLyCuDan = connect(mapStateToProps, mapDispatchToProps)(QuanLyCuDan);
export default QuanLyCuDan;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },
    picker: {
        width: 120,
    }
})
