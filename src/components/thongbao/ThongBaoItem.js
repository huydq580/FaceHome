import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import images from "../images";
import moment from "moment/moment";
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class ThongBaoItem extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.dataItem) === JSON.stringify(this.props.dataItem)) {
            return false;
        }

        else
            return true;
    }



    render() {
        const {navigation} = this.props;
        const {item} = this.props.dataItem;
        return (

            <TouchableOpacity
                onPress={() => {
                    //  navigation.navigate('Chat', {dataUser: item});
                }}
            >
                <View key={item.index}
                      style={{marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',backgroundColor:"white"}}>
                    <Image style={myStyle.image_circle}

                           source={
                               !item.Avatar ? images.noavatar : {uri: item.Avatar}
                           }
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <Text style={{flex: 2}}>{item.Content}</Text>
                        <Text style={{flex: 1}} ellipsizeMode={'tail'}>{moment(item.TimeCreate).format("HH:mm, DD-MM-YYYY")}</Text>
                    </View>
                </View>

            </TouchableOpacity>)
    }
};
const myStyle = StyleSheet.create({
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