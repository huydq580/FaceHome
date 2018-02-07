import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet


} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

class Contact extends Component {
    render () {
        return(
            <View>
                <View style = {{flexDirection:'row'}}>
                    <Image style={styles.image_circle}

                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 2, fontSize:20, fontWeight:'bold'}} numberOfLines={1}
                                  ellipsizeMode={'tail'}>Nguyen Van Hieu</Text>
                        </View>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>Online</Text>
                    </View>
                </View>
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <View style = {{flexDirection:'row', marginTop:10}}>
                    <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="edit-3" size={20} color="#616161"/>
                    </View>
                    <Text style={{flex:5, fontSize:17, color:'#616161'}}>Nicknames</Text>
                </View>
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <View style = {{flexDirection:'row', marginTop:10}}>
                    <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon2 name="user-circle" size={20} color="#616161"/>
                    </View>
                    <Text style={{flex:5, fontSize:17, color:'#616161'}}>Xem trang cá nhân</Text>
                </View>
                <View style = {{height:1, backgroundColor:'#cccccc', marginTop:8}}/>
                <View style = {{flexDirection:'row', marginTop:10}}>
                    <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 name="ios-add" size={25} color="#212121"/>
                    </View>
                    <Text style={{flex:5, fontSize:17, color:'#616161'}}>Tạo gruop</Text>
                </View>

            </View>
        );
    }
}
export default Contact;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 8,
        width: DEVICE_WIDTH / 8,
        borderRadius: DEVICE_WIDTH / 16,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})