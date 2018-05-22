import React, {Component} from 'react';
import {
    View,
    Text, StyleSheet,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;

class ThongTinItem extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 10}}>
                <Text style={{flex: 1, color: 'black'}}>{this.props.title}</Text>
                <View style={{flex: 3,}}>
                    <View style={styles.viewItem}>
                        <Text style={{marginLeft: 5}}>{this.props.value}</Text>
                    </View>

                </View>

            </View>
        )
    }
}

export default ThongTinItem
const styles = StyleSheet.create({


    viewItem: {
        borderWidth: 1,
        padding: 3, justifyContent: 'center',
        height: 28, width: 170
    }


})