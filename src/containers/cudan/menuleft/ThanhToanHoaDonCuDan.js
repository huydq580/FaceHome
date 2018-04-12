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
import stylesContainer from "../../../components/style";
import {callApiSearchHoadon} from "../../../actions/hoadon/SearchHoadonActions";
import {callApiGetKDT} from "../../../actions/KDTActions";

class ThanhToanHoaDonCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            ToaKDT: [],
            ToaNha: "",
            TongHoaDon : [],
        }
        this.dataSearchHoaDon = [];
    }
    componentWillMount () {
        const { callApiGetKDT, InfoUser } = this.props;
        if(InfoUser.length<=0){
            return null
        }
        callApiGetKDT(InfoUser[0].KDTID).then(dataRes => {
            // console.log('toa trong kdt', dataRes)

            dataKDT = JSON.parse(dataRes);
            dataKDT.Value ? dataKDT1 = dataKDT.Value : dataKDT1 =[] ;
            dataKDT1.unshift({PartID: "", Ten: 'Tòa Nhà'});
            // console.log('toa trong kdt', dataKDT1)
            this.setState({
                ToaKDT: dataKDT1,
                // ToaNha: dataKDT.Value[0].PartID
            })
        })
        this.SearchHoaDon()

    }
    SearchHoaDon = (block_id) => {
        console.log('block_id', block_id)
        const { callApiSearchHoadon, InfoUser } = this.props
        if (InfoUser.length <= 0){
            return null;
        }
        callApiSearchHoadon(InfoUser[0].KDTID, block_id).then(dataRes => {
            dataHoaDon = JSON.parse(dataRes);
            dataHoaDon = dataHoaDon.Value
            this.dataSearchHoaDon = dataHoaDon
            console.log('search hoa don', dataHoaDon)
            this.setState({
                TongHoaDon: dataHoaDon
            })
        })

    }

    search(text) {
        if (!this.oldText || this.oldText != text) {
            if (this.timeoutSearch) clearTimeout(this.timeoutSearch);
            this.oldText = text;
            this.timeoutSearch = setTimeout(() => {
                const data = this.dataSearchHoaDon // khai bao constructor, value = dataHoaDon
                const textData = text.toLowerCase()
                const inputSearch = data.filter(function (item) {
                    const itemData = item.CanHo.toLowerCase()
                    return itemData.indexOf(textData) > -1
                })
                this.setState({
                    TongHoaDon: inputSearch
                })
            }, 300);
        }
    }

    SearchCanHo(text) {
        this.setState({
            text: text
        }, () => {
            this.search(this.state.text)
        })
    }

    render() {
        console.log('dataHoaDon', this.state.TongHoaDon)
        // console.log('ToaNha', this.state.ToaNha)
        dataToaNha = this.state.dataToaNha
        let dataToa = this.state.ToaKDT
        return (
            <ScrollView style={stylesContainer.container}>
                <View style={styles.itemBoder}>
                    <TextInput placeholder='Tìm kiếm nhanh số căn hộ cư dân tại đây'
                               underlineColorAndroid="transparent"
                               onChangeText = {(text) => this.SearchCanHo(text)}
                    />
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.ToaNha}
                        onValueChange={(value) => {
                            this.setState({ToaNha: value})
                            this.SearchHoaDon(value)
                        }}>
                        {dataToa.map((value)=><Picker.Item key ={value} label={value.Ten} value={value.PartID}/>)}
                    </Picker>
                </View>
                <View style = {{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{marginLeft: 10, fontSize: 15, color:'black', flex: 1}}>Căn hộ</Text>
                    <Text style={{fontSize: 15, color:'black', flex: 3}}>Tên hóa đơn</Text>
                    <Text style={{fontSize: 15, color:'black', flex: 1}}>Tổng tiền</Text>
                </View>
                <FlatList
                    data={this.state.TongHoaDon}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            // onPress={() => {this.props.navigation.navigate("TaiKhoanDanCu", {dataCuDan: item})}}
                        >
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <Text style={{ marginLeft: 10, fontSize: 15, flex: 1}}>{item.CanHo}</Text>
                                <Text style={{fontSize: 15, flex: 3}}>{item.TieuDe}</Text>
                                <Text style={{fontSize: 15, flex: 1}}>{item.TongTien}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index}
                />

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetKDT: bindActionCreators(callApiGetKDT, dispatch),
        callApiSearchHoadon: bindActionCreators(callApiSearchHoadon, dispatch)
    }
};

ThanhToanHoaDonCuDan = connect(mapStateToProps, mapDispatchToProps)(ThanhToanHoaDonCuDan);
export default ThanhToanHoaDonCuDan;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth: 1,
        marginHorizontal: 30,
        marginTop: 20,

    },
    picker: {
        width: DEVICE_WIDTH / 2 - 40,
    },

})
