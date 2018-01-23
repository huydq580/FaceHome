import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import stylesContainer from "../../components/style";

class DichVuGanKDT extends Component {
    render (){
        return(
            <View style = {stylesContainer.container}>
                <Text style = {{fontSize:20,marginTop:20, marginLeft:20}}>
                    Tin khuyến mãi
                </Text>
                <View style = {styles.viewBoder}>
                    <Text style = {[styles.textItem, { marginTop:20}]}>- Tin khuyến mãi 1</Text>
                    <Text style = {styles.textItem}>- Tin khuyến mãi 2</Text>
                    <Text style = {[styles.textItem, { marginBottom:20}]}>- Tin khuyến mãi 3</Text>
                </View>
                <Text style = {{marginTop:30}}>Tên cửa hàng, dịch vụ số 1 ...</Text>
                {/*<View>*/}
                    {/*/!*<Image></Image>*!/*/}
                    {/*<View style = {{flex:1}}>*/}
                        {/*<Text>Ảnh cửa hàng</Text>*/}
                    {/*</View>*/}
                    {/*<View >*/}
                        {/*<Text>*/}
                            {/**/}
                        {/*</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}
            </View>
        );
    }
}
export default DichVuGanKDT

const styles = StyleSheet.create({
    viewBoder: {
        marginTop:20,
        borderWidth:1,
        marginHorizontal:10,
        borderColor:'#9E9E9E',
    },
    textItem: {
        marginLeft: 20,
    }
})

