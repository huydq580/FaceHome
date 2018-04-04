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

export default class AddMemberItem extends Component {

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
        const {item,index} = this.props.dataItem;
        // console.log("item",item)

        const {fromSearch} = this.props;
        const{fromDachSach} = this.props;

        return (

            <TouchableOpacity
                onPress={() => {
                    if(fromDachSach)
                        return;
                    if(fromSearch){

                        this.props.sendDataClick(item,index);
                    }else
                        navigation.navigate('Chat', {dataUser: item});
                }}
            >
                <View key={index}
                      style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={myStyle.image_circle}

                           source={{
                               // uri: item.Avatar
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}


                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 2}} numberOfLines={1}
                                  ellipsizeMode={'tail'}>{item.FullName}</Text>
                            {/*<Text style={{flex: 1}}>{item.lastTime}</Text>*/}
                        </View>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{item.PartName}</Text>
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