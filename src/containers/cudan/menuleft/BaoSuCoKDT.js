import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Picker
} from 'react-native'
import SuCoItemCuDan from "../../../components/baocaosuco/SuCoItemCuDan";

export default class BaoSuCoKDT extends Component {
    constructor(props){
        super(props)
        this.state  = {
            SuCo: '',
            dataSuCo: [
                {
                    noidung: '1002 Chay',
                    gio: '10h:20',
                    ngay: '20-10-2017',
                    status: 'Đang xử lý',
                },
                {
                    noidung: '1022 Chay',
                    gio: '10h:20',
                    ngay: '20-10-2017',
                    status: 'Đã xử lý',
                },
                {
                    noidung: '1002 Chay',
                    gio: '10h:20',
                    ngay: '20-10-2017',
                    status: 'Đang xử lý',
                }
            ]
        }
    }
    render(){
        const {navigation} = this.props;
        return(
            <View>
                <Picker
                    selectedValue={this.state.SuCo}
                    onValueChange={(itemValue, itemIndex) => this.setState({SuCo: itemValue})}>
                    <Picker.Item label = {'Tất cả'} value = ''/>
                    <Picker.Item label = {'Ban quản lý'} value ={'key1'}/>
                    <Picker.Item label = {'Dân Cư'} value ={'key2'}/>
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