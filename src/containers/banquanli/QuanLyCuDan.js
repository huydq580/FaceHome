import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Picker,
    FlatList,
    TouchableOpacity,
    Button,
    ScrollView
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import stylesContainer from "../../components/style";
import {callApiSearchDanCu} from "../../actions/actionsBQL/QLDanCuActions";
import {callApiNhaCuDan} from "../../actions/actionsCuDan/NhaCuDanActions";
import {callApiGetKDT} from "../../actions/KDTActions";
import CuDanItem from "../../components/cudan/CuDanItem";

class QuanLyCuDan extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerRight: <Button onPress={() => {
                navigation.navigate('TinNhanBQL')
            }}
                                 title='Tin nhắn'
                                 style={{marginRight: 10}}/>
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            Toa: '',
            Tang: '',
            Status: '',
            dataCuDan: [],
            dataToaNha: [],
        }
        this.dataSearchDanCu = [];
    }

    componentWillMount() {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }



        const {callApiSearchDanCu, callApiGetKDT} = this.props;
        callApiSearchDanCu(InfoUser[0].KDTID).then(dataSearchDanCu => {
            dataSearchDanCu = JSON.parse(dataSearchDanCu)
            dataSearchDanCu = dataSearchDanCu.Value
            this.dataSearchDanCu = dataSearchDanCu
            this.setState({
                dataCuDan: dataSearchDanCu
            })
            console.log('data cu dan', this.state.dataCuDan)
        })
        callApiGetKDT(InfoUser[0].KDTID).then(dataRes => {
            dataToaNha = JSON.parse(dataRes)
            dataToaNha = dataToaNha.Value
            dataToaNha.unshift({PartID: "", Code: "", Ten: 'Tòa nhà'});
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
            this.timeoutSearch = setTimeout(() => {
                const data = this.dataSearchDanCu;
                const textData = text.toLowerCase()
                const inputSearch = data.filter(function (item) {
                    const itemData = item.FullName.toLowerCase()
                    return itemData.indexOf(textData) > -1
                })
                this.setState({
                    dataCuDan: inputSearch
                })
            }, 300);
        }
    }

    SearchUser(text) {
        this.setState({
            text: text
        }, () => {
            this.search(this.state.text)
        })
    }

    render() {
        const {navigation} = this.props;
        dataToaNha = this.state.dataToaNha
        return (
            <ScrollView style={stylesContainer.container}>
                <View style={styles.itemBoder}>
                    <TextInput placeholder='Tìm kiếm nhanh tên dân cư theo số căn hộ'
                               underlineColorAndroid="transparent"
                               onChangeText={(text) => this.SearchUser(text)}/>
                </View>
                <View style = {{flexDirection:'row', marginTop: 10, borderWidth:1, borderColor: '#9E9E9E', minHeight: 40, justifyContent: 'center', alignItems:'center'}}>
                        <View style =  {styles.viewItem}>
                            <Picker
                            style={styles.picker}
                            selectedValue={this.state.Toa}
                            onValueChange={(value) => {
                            this.setState({Toa: value});
                            // this.CallApiQuanHuyen(value);
                            }}>
                            {dataToaNha.map((value) => <Picker.Item key={value.Code} label={value.Ten}
                            value={value.Code}/>)}
                            </Picker>


                        </View>
                    <View style = {styles.viewItem}>
                        <View style = {{width:1, height:40, backgroundColor: '#9E9E9E'}}/>
                        <Picker
                        style={styles.picker}
                        selectedValue={this.state.Tang}
                        onValueChange={(itemValue, itemIndex) => this.setState({Tang: itemValue})}>
                        <Picker.Item label={'Tầng/lầu'} value=''/>
                        <Picker.Item label={'1'} value='key1'/>
                        <Picker.Item label={'2'} value={'key2'}/>
                        <Picker.Item label={'3'} value={'key3'}/>
                        <Picker.Item label={'4'} value={'key4'}/>
                        </Picker>

                    </View>
                    <View style = {styles.viewItem}>
                        <View style = {{width:1, height:40, backgroundColor: '#9E9E9E'}}/>
                            <Picker
                            style={styles.picker}
                            selectedValue={this.state.Status}
                            onValueChange={(itemValue, itemIndex) => this.setState({Status: itemValue})}>
                            <Picker.Item label={'Trạng thái'} value=''/>
                            <Picker.Item label={'Chờ duyệt'} value='key1'/>
                            <Picker.Item label={'Đã duyệt'} value={'key2'}/>
                            <Picker.Item label={'Đã rời KĐT'} value={'key3'}/>
                            </Picker>

                    </View>
                </View>
                <FlatList
                    data={this.state.dataCuDan}
                    renderItem={(item) => {
                        return (
                            <CuDanItem
                                dataItem={item}
                                navigation={navigation}/>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
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
        borderWidth: 1,
        marginHorizontal: 30,
        marginTop: 20,

    },
    picker: {
        width: DEVICE_WIDTH / 3,
    },
    viewItem: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal: 5,
        flex:1

    }
})
