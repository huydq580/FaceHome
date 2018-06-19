import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import moment from 'moment';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiSearchCmtSuco} from "../../actions/SearchCmtSuCoActions";
import images from "../images";

class SuCoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // ClickItemSuCo = (SuCoID, itemsuco)=> {
    //     const {fromBQL} = this.props
    //     const { callApiSearchCmtSuco, InfoUser } = this.props
    //     if (InfoUser.length <= 0) {
    //         return null
    //     }
    //     console.log('kdt id', InfoUser[0].KDTID)
    //     console.log('SuCoID', SuCoID)
    //     callApiSearchCmtSuco(InfoUser[0].KDTID, SuCoID).then(dataRes => {
    //         if (fromBQL) {
    //             this.props.navigation.navigate('ChiTietSuCo', {SuCoId: SuCoID, ItemSuCo: itemsuco})
    //         }
    //         else {
    //             this.props.navigation.navigate('ChiTietSuCoCuDan', {SuCoId: SuCoID, ItemSuCo: itemsuco})
    //         }
    //     })
    //
    // }
    render() {
        const {item} = this.props.dataItem;
        return (
            <View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Image
                        source={
                            item.Avartar == "http://image.facehome.vn/avatar/default.png" ? images.noavatar : {uri: item.Avartar}
                        }
                        style={styles.image_circle}
                        resizeMode="cover">
                    </Image>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>{item.FullName}</Text>
                        <Text>{moment(item.CreatedDate).format("HH:mm, DD-MM-YYYY")}</Text>
                    </View>
                </View>
                <View style={{marginHorizontal: 10, marginTop: 10}}>
                    <Text style={{color: '#212121'}}>{item.Content}</Text>
                </View>
                <View style={{marginHorizontal: 10}}>
                    <Image source={
                        item.Media == "" ? null : {uri: item.Media}
                    }
                           style={styles.imagePost}
                           resizeMode="cover">
                    </Image>
                </View>
                <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 15, marginHorizontal: 10}}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchCmtSuco: bindActionCreators(callApiSearchCmtSuco, dispatch),
    }
};

SuCoItem = connect(mapStateToProps, mapDispatchToProps)(SuCoItem);

export default SuCoItem
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 200,
        marginTop: 10
    }
})
