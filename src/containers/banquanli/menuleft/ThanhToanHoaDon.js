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
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import stylesContainer from "../../../components/style";

class ThanhToanHoaDon extends Component {
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
            dataItem : [
                {
                    STT: "1",
                    TenHoaDon: 'Hóa đơn tháng 1',
                    TongTien: '400.000'
                },
                {
                    STT: "2",
                    TenHoaDon: 'Hóa đơn tháng 2',
                    TongTien: '400.000'
                },
                {
                    STT: "3",
                    TenHoaDon: 'Hóa đơn tháng 3',
                    TongTien: '400.000'
                },
                {
                    STT: "4",
                    TenHoaDon: 'Hóa đơn tháng 4',
                    TongTien: '400.000'
                }
            ],

        }

    }

    // search(text) {
    //     if (!this.oldText || this.oldText != text) {
    //         if (this.timeoutSearch) clearTimeout(this.timeoutSearch);
    //         this.oldText = text;
    //         this.timeoutSearch = setTimeout(() => {
    //             const data = this.dataSearchDanCu;
    //             const textData = text.toLowerCase()
    //             const inputSearch = data.filter(function (item) {
    //                 const itemData = item.FullName.toLowerCase()
    //                 return itemData.indexOf(textData) > -1
    //             })
    //             this.setState({
    //                 dataCuDan: inputSearch
    //             })
    //         }, 300);
    //     }
    // }
    //
    // SearchUser(text) {
    //     this.setState({
    //         text: text
    //     }, () => {
    //         this.search(this.state.text)
    //     })
    // }

    render() {
        dataToaNha = this.state.dataToaNha
        return (
            <View style={stylesContainer.container}>
                <View style={styles.itemBoder}>
                    <TextInput placeholder='Tìm kiếm nhanh số căn hộ cư dân tại đây'
                               underlineColorAndroid="transparent"
                    // onChangeText={(text) => this.SearchUser(text)}
                    />
                </View>
                <View style = {{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{marginLeft: 10, fontSize: 15, color:'black', flex: 1}}>STT</Text>
                    <Text style={{fontSize: 15, color:'black', flex: 3}}>Tên hóa đơn</Text>
                    <Text style={{fontSize: 15, color:'black', flex: 1}}>Tổng tiền</Text>
                </View>
                <FlatList
                    data={this.state.dataItem}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            // onPress={() => {this.props.navigation.navigate("TaiKhoanDanCu", {dataCuDan: item})}}
                        >
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <Text style={{ marginLeft: 10, fontSize: 15, flex: 1}}>{item.STT}</Text>
                                <Text style={{fontSize: 15, flex: 3}}>{item.TenHoaDon}</Text>
                                <Text style={{fontSize: 15, flex: 1}}>{item.TongTien}</Text>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

ThanhToanHoaDon = connect(mapStateToProps, mapDispatchToProps)(ThanhToanHoaDon);
export default ThanhToanHoaDon;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth: 1,
        marginHorizontal: 30,
        marginTop: 20,

    },
    picker: {
        width: DEVICE_WIDTH / 2 - 40,
    }
})
