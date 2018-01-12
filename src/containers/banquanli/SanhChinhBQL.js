import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import stylesContainer from "../../components/style";
import images from "../../components/images"
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class SanhChinhBQL extends Component {
    render (){
        return (
            <ScrollView style = {stylesContainer.container}>
                {/*<View style={{alignItems:'center', justifyContent:'center'}}>*/}
                    {/*<Text style = {{fontSize:19, fontWeight:'bold', color: 'black'}}>*/}
                        {/*Thông Tin Từ Ban Quản Lý*/}
                    {/*</Text>*/}
                {/*</View>*/}
                {/*<View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>*/}
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15, justifyContent:'center'}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, justifyContent:'center', borderColor: '#cccccc', borderRadius:20}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('SoanTin')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                                style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black'}}>Nguyễn Văn A</Text>
                            <Text>1 giờ trước</Text>
                        </View>
                    </View>
                    <View style = {{marginHorizontal: 10, marginTop:10}}>
                        <Text>Chân anh lang thang kiếm em ở khắp chốn, nước mắt trào biết em giờ ở nơi đâu, đôi khi cô đơn giết anh từng cơn em hỡi</Text>
                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black'}}>Nguyễn Thị C</Text>
                            <Text>1 giờ trước</Text>
                        </View>
                    </View>
                    <View style = {{marginHorizontal: 10, marginTop:10}}>
                        <Text>Anh ước gì cánh tay mình đừng buông ra, chạy theo em ở nơi trời xa, chạy đi đâu để có niềm vui vùi chôn nỗi buồn</Text>
                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black'}}>Nguyễn Văn B</Text>
                            <Text>1 giờ trước</Text>
                        </View>
                    </View>
                    <View style = {{marginHorizontal: 10, marginTop:10}}>
                        <Text>Lá kia sao lòng em vậy thay, anh ở lại để ôm một mình nhớ thương, ngày không em lòng anh tựa đông, giá băng theo chiều tan màu mưa.</Text>
                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black'}}>Nguyễn Văn D</Text>
                            <Text>1 giờ trước</Text>
                        </View>
                    </View>
                    <View style = {{marginHorizontal: 10, marginTop:10}}>
                        <Text>Bà ơi bà cháu yêu bà lắm, tóc bà trắng, màu trắng như mây, cháu yêu bà cháu nắm bàn tay khi cháu vâng lời cháu biết bà vui</Text>
                    </View>
                </View>




                {/*<View style = {[styles.viewItem, {marginTop:20}]}>*/}
                    {/*<Text>Bản tin số 1</Text>*/}
                {/*</View>*/}
                {/*<View style = {styles.viewItem}>*/}
                    {/*<Text>Bản tin số 2</Text>*/}
                {/*</View>*/}
                {/*<View style = {styles.viewItem}>*/}
                    {/*<Text>Bản tin số 3</Text>*/}
                {/*</View>*/}
                {/*<View style = {styles.viewItem}>*/}
                    {/*<TextInput placeholder = 'Soạn bài đăng cho KĐT tại đây '*/}
                               {/*underlineColorAndroid="transparent"*/}
                               {/*style = {{flex:5}}*/}
                               {/*/>*/}
                    {/*<View style = {{flex:1,borderWidth:1, backgroundColor: '#42A5F5', width:100,height:40,*/}
                        {/*alignItems:'center', justifyContent:'center'}}>*/}
                        {/*<Text>Đăng</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}
                {/*<Text style = {{marginLeft:20}}>+Tạo sự kiện</Text>*/}

                {/*<View style = {[styles.viewItem, {marginTop:20}]}>*/}
                    {/*<Text>Bài đăng của cư dân trong KĐT</Text>*/}
                {/*</View>*/}
                {/*<View style = {styles.viewItem}>*/}
                    {/*<Text>Bài đăng của cư dân trong KĐT</Text>*/}
                {/*</View>*/}
                {/*<View style = {styles.viewItem}>*/}
                    {/*<Text>Bài đăng của cư dân trong KĐT</Text>*/}
                {/*</View>*/}
                {/*<View style = {styles.viewItem}>*/}
                    {/*<Text>Bài đăng của cư dân trong KĐT</Text>*/}
                {/*</View>*/}



            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 20,
        marginTop:7,
        minHeight:50,
    },

})