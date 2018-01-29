import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    Image,
    StyleSheet
} from 'react-native'
import stylesContainer from "../../../components/style";

export default class TiepNhanSuCoCuDan extends Component{
    constructor(props){
        super(props)
        this.state = {
            SuCo: '',

        }
    }
    render (){
        return(
            <View style = {stylesContainer.container}>
                <Picker
                    selectedValue={this.state.SuCo}
                    onValueChange={(itemValue, itemIndex) => this.setState({SuCo: itemValue})}>
                    <Picker.Item label = {'Tất cả'} value = ''/>
                    <Picker.Item label = {'Ban quản lý'} value ={'key1'}/>
                    <Picker.Item label = {'Dân Cư'} value ={'key2'}/>
                </Picker>
                <View style ={{flexDirection:'row', alignItems:'center'}}>
                    <Image style = {styles.Img}
                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"></Image>
                    <View style = {{flexDirection:'column'}}>
                        <Text>
                            Nội dung sự cố
                        </Text>
                        <View style = {{flexDirection:'row'}}>
                            <Text>Nguyễn Trọng Đại</Text>
                            <Text>1002</Text>
                        </View>

                    </View>
                    <View>
                        <Text>Ngày tháng năm</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    Img : {
        width:70,
        height:70,
    }
})