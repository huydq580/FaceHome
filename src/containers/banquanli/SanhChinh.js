import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import stylesContainer from "../../components/style";
import images from "../../components/images"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/EvilIcons';


export default class SanhChinh extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataItem :
                [
                    {
                        "status": "Một con vit xòe ra 2 cái cánh",
                        "like": "11",
                        'comment': '30',
                    },
                    {
                        "status": "Bà ơi bà cháu yêu bà lắm, tóc bà trắng màu trắng màu trắng như mây, cháu yêu bà cháu nắm bàn tay.",
                        "like": "55",
                        'comment': '20',
                    },
                    {
                        "status": "wtf",
                        "like": "66",
                        'comment': '10',
                    },

                ],

        }
    }
    CommentItem = ({item}) => (
        <View>
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
                    <Text>{item.status}</Text>
                </View>
                <View style = {{flexDirection:'row', marginTop:20}}>
                    <View style = {{flex:1, flexDirection:'row'}}>
                        <Icon1 name="like" size={25} color="#424242" />
                        <Text>{item.like}</Text>
                    </View>
                    <View style = {{flex:1, flexDirection:'row'}}>
                        {/*<Icon1 name="comment" size={25} color="#424242" />*/}
                        <Text>bình luận</Text>
                    </View>

                </View>
                <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                <View style ={{flexDirection:'row', marginTop:5, justifyContent: 'flex-start'}}>
                    <View style = {{flex:1, flexDirection:'row', }}>
                        <Icon1 name="like" size={25} color="#424242" />
                        <Text>Thích</Text>
                    </View>
                    <View style = {{flex:1, flexDirection:'row'}}>
                        <Icon1 name="comment" size={25} color="#424242" />
                        <Text>Bình luận</Text>
                    </View>
                </View>
            </View>
            <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
        </View>
    )
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
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('SoanTin')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <FlatList
                    data = {this.state.dataItem}
                    renderItem={this.CommentItem}
                    keyExtractor={(item, index) => index}
                />




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