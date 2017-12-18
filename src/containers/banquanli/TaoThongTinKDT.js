import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native'

export default class TaoThongTinKDT extends Component {
    constructor(props){
        super(props)
        TongToaNha =['Chọn số lượng tòa nhà trong KĐT','0','1','2','3','4','5','6','7','8','9','10']
        this.state = {
            ToaNha: '',
            dataSDT :
                [
                    {
                        "ten":"",

                    },
                    {
                        "ten":"",

                    },
                    {
                        "ten":"",

                    }
                ]
        }
    }
    render(){
        return(
            <View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.ToaNha}
                        onValueChange={(itemValue, itemIndex) => this.setState({ToaNha: itemValue})}>
                        {TongToaNha.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập tên tòa nhà 1'
                               underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập tên tòa nhà 2'
                               underlineColorAndroid="transparent"/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập tên tòa nhà 3'
                               underlineColorAndroid="transparent"/>
                </View>
                {/*<FlatList*/}
                    {/*data = {this.state.dataSDT}*/}
                    {/*renderItem = {({item}) =>*/}
                        {/*<View>*/}
                            {/*<Text>{item.ten}</Text>*/}
                            {/*<View style = {styles.itemBoder}>*/}
                                {/*<TextInput placeholder = 'Nhập tên tòa nhà'*/}
                                           {/*underlineColorAndroid="transparent"/>*/}
                            {/*</View>*/}

                        {/*</View>*/}
                    {/*}*/}
                    {/*keyExtractor={(item, index) => index}*/}
                    {/*ItemSeparatorComponent = {this.renderSeparator}*/}
                {/*/>*/}
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('NhapThongTinChiTiet')}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },


})