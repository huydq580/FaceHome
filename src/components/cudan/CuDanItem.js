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

export default class CuDanItem extends Component {

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
        console.log('itemcu dan', item)
        return (

            <TouchableOpacity
                onPress={() => {
                     navigation.navigate('TaiKhoanDanCu', {dataCuDan: item});
                }}
            >
                <View key={item.index}
                      style={{flex: 1, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                          // backgroundColor:item.isSeen?'white':'#b2ebf2'
                      }}>
                    <Image style={myStyle.image_circle}

                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10, justifyContent:'center'}}>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{item.FullName}</Text>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{item.PartName}</Text>
                    </View>
                </View>
                <View style = {{height:1 , backgroundColor: '#9E9E9E', marginTop: 5}}/>

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