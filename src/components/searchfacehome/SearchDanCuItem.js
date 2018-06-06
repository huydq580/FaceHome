import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet,
    Image
} from 'react-native'

class SearchDanCuItem extends Component {
    render() {
        const {item} = this.props.dataItem;
        return (
            <View  style = {{ marginTop: 10, marginLeft: 15}}>
                <View style = {{flexDirection:'row', alignItems: 'center'}}>
                    <Image
                        source={{
                            uri: 'http://media.we25.vn/images/NGUYEN_BA_NGOC2349_ZING.jpg'
                        }}
                        style={styles.circle}
                        resizeMode="cover">
                    </Image>
                    <View style = {{marginLeft: 10}}>
                        <Text style = {{color: 'black', fontSize: 17}}>{item.FullName}</Text>
                    </View>
                </View>
                <View style = {{height:1, backgroundColor:'#BDBDBD', marginTop: 10}}/>

            </View>

        )
    }
}
export default SearchDanCuItem
const styles = StyleSheet.create({
    circle: {
        width: 40,
        height: 40,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


