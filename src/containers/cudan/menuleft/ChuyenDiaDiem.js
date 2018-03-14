import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity, StyleSheet
} from 'react-native';
import stylesContainer from "../../../components/style";

class ChuyenDiaDiem extends Component {
    render () {
        return (
            <View style = {[stylesContainer.container,{justifyContent:'center'}]}>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('ChuyenCanHo')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Chuyển căn hộ
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Chuyển sang Căn hộ khác cùng KĐT
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('ChuyenKDT')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Chuyển KĐT
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Chuyển sang KĐT khác có trong hệ thống
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress  = {()=> this.props.navigation.navigate('RoiKDT')}>
                    <View style = {styles.viewitem}>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, color:'black', marginLeft:10}}>
                            Hủy tài khoản
                        </Text>
                        <Text style = {{textDecorationLine: "underline", marginTop:10, textDecorationColor:'#BDBDBD', marginLeft:10, marginBottom:10}}>
                            Rời KĐT, hủy tài khoản
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default ChuyenDiaDiem
const styles = StyleSheet.create({
    viewitem : {
        borderWidth: 1,
        marginHorizontal:20,
        borderColor:'#BDBDBD'

    }
})