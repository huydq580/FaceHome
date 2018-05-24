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

export default class ChoFaceHomeItem extends Component {

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
            <View style = {{marginTop: 15}}>
                <View style = {{flexDirection:'row'}}>
                    <View style = {{ alignItems: 'center', flexDirection:'row'}}>
                        <Image
                            source={{
                                uri: item.avt
                            }}
                            style={styles.circle}
                            resizeMode="cover">
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black', fontWeight: 'bold'}}>{item.name}</Text>
                            <Text>{item.time}</Text>
                        </View>
                    </View>
                    <View style = {{marginLeft: 15, marginRight: 5, flex:1}}>
                        <Text style = {{flexWrap:'wrap'}}>{item.content}</Text>
                    </View>

                </View>
                <View style = {{flexDirection:'row', justifyContent: 'space-between', alignItems:'center', marginTop: 5, marginLeft: 15}}>
                    <View style = {{flexDirection:'row'}}>
                    </View>
                    <TouchableOpacity onPress = {()=> this.props.navigation.navigate('DangKyNhaCungCap')}>
                        <View style = {{justifyContent:'center',
                            alignItems:'center', borderWidth: 1,
                            borderRadius: 3, height: 30, marginRight: 10,
                            width: 90}}>
                            <Text>
                                Nhắn tin
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }
};
const styles = StyleSheet.create({
    circle: {
        marginLeft: 10,
        width: 35,
        height: 35,
        borderRadius: 35/2,
        alignItems: 'center',
        justifyContent:'center'
    },
})