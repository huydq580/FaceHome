import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Picker,
    FlatList,
    TouchableOpacity,
    Button,
    Keyboard
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../components/style";
import {callApiSearchDanCu} from "../../actions/actionsBQL/QLDanCuActions";
import {callApiNhaCuDan} from "../../actions/actionsCuDan/NhaCuDanActions";
import {callApiGetKDT} from "../../actions/KDTActions";

class QuanLyCuDan extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Button onPress={() => {navigation.navigate('TinNhanBQL')}}
                                 title = 'Tin nhắn'
                                 style = {{marginRight:10}}/>
        }
    }
    constructor(props){
        super(props)
        this.state = {
            Toa: '',
            Tang:'',
            Status: '',
            dataCuDan: [ ],
            dataToaNha: [],
        }
        this.dataSearchDanCu = [];
    }
    componentWillMount(){
        const { UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null;
        }

        // console.log('user',UserBQL)

        const { callApiSearchDanCu, callApiGetKDT } = this.props;
        callApiSearchDanCu(UserBQL.payload[0].KDTID).then(dataSearchDanCu => {
            dataSearchDanCu = JSON.parse(dataSearchDanCu)
            dataSearchDanCu = dataSearchDanCu.Value
            this.dataSearchDanCu = dataSearchDanCu
            this.setState({
                dataCuDan: dataSearchDanCu
            })
            console.log('data cu dan', this.state.dataCuDan)
        })
        callApiGetKDT(UserBQL.payload[0].KDTID).then(dataRes => {
            dataToaNha = JSON.parse(dataRes)
            dataToaNha = dataToaNha.Value
            dataToaNha.unshift({PartID: "", Code: "",Ten: 'Chọn tòa nhà'});
            // console.log('dataKDT', dataToaNha)
            this.setState({
                dataToaNha: dataToaNha
            })
        })
    }

    search(text) {
        if (!this.oldText || this.oldText != text) {
            if (this.timeoutSearch) clearTimeout(this.timeoutSearch);
            this.oldText = text;
            this.timeoutSearch = setTimeout(()=>{
                const data = this.dataSearchDanCu;
                const textData = text.toLowerCase()
                const inputSearch = data.filter(function(item){
                    const itemData = item.FullName.toLowerCase()
                    return itemData.indexOf(textData) > -1
                })
                this.setState({
                    dataCuDan: inputSearch
                })
            }, 300);
        }
    }

    SearchUser(text){
        this.setState({
            text: text
        }, ()=> {
            this.search(this.state.text)
        })
    }
    render() {
        dataToaNha = this.state.dataToaNha
        return (
            <View style = {stylesContainer.container}>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Tìm kiếm nhanh tên dân cư theo số căn hộ'
                                underlineColorAndroid="transparent"
                               onChangeText = {(text) => this.SearchUser(text)}/>
                </View>
                <View style = {{ width: 200,marginTop: 10, maxHeight: 40,alignItems:'center',flex:1, flexDirection:'row', alignItems:'center' , borderWidth:1, borderColor:'#9E9E9E'}}>
                    <Text>Tòa: </Text>
                    <Picker
                        style = {styles.picker}
                        selectedValue={this.state.Toa}
                        onValueChange={(value) => {
                            this.setState({Toa: value});
                            // this.CallApiQuanHuyen(value);
                        }}>
                        {dataToaNha.map((value) => <Picker.Item key = {value.Code} label={value.Ten} value={value.Code}/>)}
                    </Picker>
                </View>
                <View style = {{ width: 200,maxHeight: 40,alignItems:'center', marginTop:10, flexDirection:'row',  alignItems:'center', borderWidth:1, borderColor:'#9E9E9E'}}>
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
                <View style = {{ width: 200,marginTop: 10,maxHeight: 40,alignItems:'center', flexDirection:'row',  alignItems:'center', borderWidth:1, borderColor:'#9E9E9E'}}>
                    <Text>Tầng/Lầu: </Text>
                    <Picker
                        style = {styles.picker}
                        selectedValue={this.state.Status}
                        onValueChange={(itemValue, itemIndex) => this.setState({Status: itemValue})}>
                        <Picker.Item label = {'Tất cả'} value = ''/>
                        <Picker.Item label = {'Chờ duyệt'} value = 'key1'/>
                        <Picker.Item label = {'Đã duyệt'} value ={'key2'}/>
                        <Picker.Item label = {'Đã rời KĐT'} value ={'key3'}/>
                    </Picker>
                </View>
                <FlatList
                    data = {this.state.dataCuDan}
                    renderItem = {({item}) =>
                        <TouchableOpacity onPress = {()=> {
                            // const { infoCuDan, callApiNhaCuDan } = this.props;
                            // if (infoCuDan.leng<=0){
                            //     return null
                            // }
                            // a = item.RowNum-1;
                            // // console.log('infoCuDan', infoCuDan)
                            // callApiNhaCuDan(infoCuDan.payload[a].ProfileID,infoCuDan.payload[a].UserID).then(dataChitietCuDan => {
                            //     dataChitietCuDan = JSON.parse(dataChitietCuDan)
                            //     this.props.navigation.navigate("TaiKhoanDanCu", {dataCuDan: dataChitietCuDan.Value})
                            //     console.log('dataChitietCuDan', dataChitietCuDan)
                            // })
                            this.props.navigation.navigate("TaiKhoanDanCu", {dataCuDan: item})

                        }}>
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
        infoCuDan: state.QLDanCuReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchDanCu: bindActionCreators(callApiSearchDanCu, dispatch),
        callApiNhaCuDan: bindActionCreators(callApiNhaCuDan, dispatch),
        callApiGetKDT: bindActionCreators(callApiGetKDT, dispatch)
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
        width: 200,
    }
})
