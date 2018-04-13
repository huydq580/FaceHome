import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import moment from 'moment';
import {LINKIMG} from "../Api";

export default class CanhBaoChayItemCuDan extends Component {

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
                onPress = {()=> this.props.navigation.navigate('ChiTietCanhBaoChayCuDan')}
            >
                <View key={item.index}
                      style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={myStyle.image_circle}

                           source={{
                               uri: item.Avatar == "/Store/lib/noavatar.png" ? LINKIMG + "/Store/lib/noavatar.png" : item.Avatar
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{item.FullName}</Text>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{moment(new Date(item.CreatedDate)).format("L")}</Text>
                    </View>
                </View>

            </TouchableOpacity>)
    }
};
const myStyle = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 6,
        width: DEVICE_WIDTH / 6,
        borderRadius: 0,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})