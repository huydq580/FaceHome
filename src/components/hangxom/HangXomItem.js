import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';


export default class HangXomItem extends Component {

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
                    // navigation.navigate('DichVuDetail', {dataItem: item});
                }}
            >
                <View>

                </View>

            </TouchableOpacity>)
    }
};
const DEVICE_WIDTH = Dimensions.get('window').width;