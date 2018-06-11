import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    FlatList,
    TouchableOpacity, AsyncStorage, Alert
} from 'react-native'
import {CreateKDT, URL} from "../../components/Api";
import {NavigationActions} from "react-navigation";
export default class TaoThongTinKDT extends Component {
    constructor(props){
        super(props)
        TongToaNha =['Chọn số lượng tòa nhà trong KĐT','0','1','2','3','4','5','6','7','8','9','10']
        this.state = {
            ListToa: [],
            ToaNha:'',
            SoLuongNha: [],
        }
    }
    componentWillMount(){

    }
    CreateKDT = () => {
        console.log('da vao')
        dsToa = this.state.ListToa;
        soToa =[];
        for (let i = 0; i < dsToa.length; i++) {
            toa1 = dsToa[i].TenToa
            // console.log('toa1', toa[i])
        }
        // console.log('data', toa1)
        const {params } = this.props.navigation.state
        console.log('params', params)
        fetch( URL + CreateKDT,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                ten_kdt: params.tenKDT,
                ma_vung: params.maVung,
                ds_toa_nha: toa1,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                console.log('dataREs', dataRes)
                data = JSON.parse(dataRes);
                if(data.ErrorCode==="00") {
                    Alert.alert(
                        'Alert',
                        data.Message,
                        [
                            {text: 'OK', onPress: () => this.props.navigation.dispatch(NavigationActions.pop({
                                    n: 2,
                                }))},
                        ],
                        { cancelable: false }
                    )
                }
                else {
                    Alert.alert(
                        'Alert',
                        data.Message,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )
                }

            }).catch((erro)=> {
            console.log('erro',erro);
        })


    }
    change = (value) =>{
        console.log('this.state.ToaNha', value)
        let ListToa = this.state.ListToa;
        ListToa.splice(0,ListToa.length)
        for (let i = 1; i <= value; i++) {
            ListToa.push({TenToa: "Nhập tòa nhà " + i})
        }
        this.setState({
            ToaNha: value,
            ListToa
        })
    }

    render(){
        // console.log('data', this.state.TenToa)
        return(
            <View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={
                            this.state.ToaNha //cái này là gì thế, số lượng à? vâng. Đặt tên bêến ko ổn nhé
                        }
                        onValueChange={(value) => {
                            this.change(value)
                        }}>
                        {TongToaNha.map((value) => <Picker.Item key = {value} label={value} value={value}/>)}
                    </Picker>
                </View>
                {/*{addView}*/}

                <FlatList
                    data = {this.state.ListToa}
                    renderItem = {({item}) =>
                            <View style = {styles.itemBoder}>
                                <TextInput value = {item.TenToa}
                                           underlineColorAndroid="transparent"
                                           onChangeText = {(text)=>{
                                               const ListToa = this.state.ListToa.map(toa=>{
                                                   if(toa == item) {
                                                       toa.TenToa = text
                                                   }
                                                   return toa;
                                               })
                                               this.setState({ListToa}, ()=> console.log('listToa', ListToa))
                                           }}/>
                            </View>

                    }
                        keyExtractor={(item, index) => index}
                />
                <TouchableOpacity onPress = {this.CreateKDT}>
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