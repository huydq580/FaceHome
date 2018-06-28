import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import Dimensions from 'Dimensions';
import moment from 'moment';
import images from "./images";



export default class TinNhanItemCuDan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (JSON.stringify(nextProps.dataItem) === JSON.stringify(this.props.dataItem)) {
    //         return false;
    //     }
    //
    //     else
    //         return true;
    // }
    render() {
        const {navigation} = this.props;
        const {item} = this.props.dataItem;
        // console.log('chatto',item.ChatTo)
        var chatTo = item.ChatTo ? item.ChatTo : null
        chatTo1 = JSON.parse(chatTo)
        // console.log('chatto1', chatTo1)

        return (

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('TinNhanDetailsCuDan', {MsgId: item.MsgGroupID, title: item.FullNameOrGroupName, Info: item.ChatTo })
                        // item.IsGroup == 1 ? navigation.navigate('ChatGroupCuDan', { title: item.FullNameOrGroupName, MsgGroupID: item.MsgGroupID}) : null
                }}

            >
                <View key={item.index}
                      style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={styles.image_circle}

                           source={
                               // !item.ChatTo && !item.ChatTo.Avatar ? images.noavatar : {uri: item.ChatTo.Avatar}
                               images.noavatar
                           }
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, justifyContent:'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: '#42A5F5', fontWeight: "bold"}} numberOfLines={1}
                                  ellipsizeMode={'tail'}>{item.FullNameOrGroupName}</Text>
                            <Text style = {{marginRight:5, color: 'black'}}>{moment(item.CreatedDate).format("DD/MM/YYYY")}</Text>
                        </View>
                        <Text numberOfLines={1} ellipsizeMode={'tail'}>{item.Content}</Text>
                    </View>

                </View>
                <View style = {{height: 1,marginLeft: DEVICE_WIDTH / 5, backgroundColor: "#CED0CE"}}/>

            </TouchableOpacity>)
    }
};
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 6,
        width: DEVICE_WIDTH / 6,
        borderRadius: DEVICE_WIDTH / 12,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})