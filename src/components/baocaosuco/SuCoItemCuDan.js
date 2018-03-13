import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import moment from 'moment';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiSearchCmtSuco} from "../../actions/SearchCmtSuCoActions";
class SuCoItemCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    ClickItemSuCo = (SuCoID, itemsuco)=> {
        const { callApiSearchCmtSuco, UserCuDan } = this.props
        if (UserCuDan.length <= 0) {
            return null
        }
        console.log('kdt id', UserCuDan.payload[0].KDTID)
        console.log('SuCoID', UserCuDan)
        callApiSearchCmtSuco(UserCuDan.payload[0].KDTID, SuCoID).then(dataRes => {
            this.props.navigation.navigate('ChiTietSuCoCuDan', {SuCoId: SuCoID, ItemSuCo: itemsuco})
        })

    }
    render (){
        const {item} = this.props.dataItem;
        const {navigation} = this.props;
        return (
            <View style = {{flex:1, marginTop: 20}}>
                <TouchableOpacity onPress = {() => this.ClickItemSuCo(item.SuCoID, item)}>
                    <View style = {{flexDirection:'row', height:100, alignItems:'center'}}>
                        <Image style = {styles.Img}
                               source={{
                                   uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                               }}
                               resizeMode="cover"></Image>
                        <View style = {{flexDirection:'column', flex:2, marginLeft:20, justifyContent:'center'}}>
                            <Text>
                                {item.Content}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                {moment(new Date(item.CreatedDate)).format("LT")}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                {moment(new Date(item.CreatedDate)).format("L")}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                Đang xử lý
                            </Text>


                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

    }
}
const mapStateToProps = (state) => {
    return {
        UserCuDan: state.LoginReducers,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchCmtSuco: bindActionCreators(callApiSearchCmtSuco, dispatch),
    }
};

SuCoItemCuDan = connect(mapStateToProps, mapDispatchToProps)(SuCoItemCuDan);
export default SuCoItemCuDan;
const styles = StyleSheet.create({
    Img : {
        flex:1,
        height:100
    }
})