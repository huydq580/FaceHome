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
import Icon1 from 'react-native-vector-icons/EvilIcons';

class SuCoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

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

                <Image source={
                    item.Media == "" || item.Media == "http://192.168.0.200:9051/" ? null : {uri: item.Media}
                }
                       style={styles.imagePost}
                       resizeMode="cover">
                </Image>
                {
                    item.Media == "" || item.Media == "http://192.168.0.200:9051/" ?
                        <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 10}}/> : null

                }
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', marginLeft: 20}}>
                        <Icon1 name="like" size={25} color="#424242"/>
                        <TouchableOpacity>
                            <Text>Thích</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress = {()=> this.props.navigation.navigate("BinhLuanSuCo", {SuCoID: item.SuCoID, IntUserIDPost: item.IntUserID})}>
                        <View style={{flexDirection: 'row', marginRight: 20}}>
                            <Icon1 name="comment" size={25} color="#424242"/>

                            <Text style={{color: '#424242'}}>Bình luận</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 10}}/>
                <View style={{height: 7, backgroundColor: '#EEEEEE'}}></View>

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
