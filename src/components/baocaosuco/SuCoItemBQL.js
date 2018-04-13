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
import {LINKIMG} from "../Api";
class SuCoItemBQL extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    ClickItemSuCo = (SuCoID, itemsuco)=> {
        const { callApiSearchCmtSuco, InfoUser } = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        console.log('kdt id', InfoUser[0].KDTID)
        console.log('SuCoID', SuCoID)
        callApiSearchCmtSuco(InfoUser[0].KDTID, SuCoID).then(dataRes => {
            this.props.navigation.navigate('ChiTietSuCo', {SuCoId: SuCoID, ItemSuCo: itemsuco})
        })

    }
    render (){
        const {item} = this.props.dataItem;
        console.log('dataItem', this.props.dataItem)
        const {navigation} = this.props;
        return (
            <View style = {{flex:1, marginTop: 20}}>
                <TouchableOpacity onPress = {() => this.ClickItemSuCo(item.SuCoID, item)}>
                    <View style = {{flexDirection:'row', height:100, alignItems:'center'}}>
                        <Image style = {styles.Img}
                               source={{
                                   uri: item.Avatar == "http://image.facehome.vn/avatar/default.png" ? LINKIMG + "/Store/lib/noavatar.png" : item.Avatar
                               }}
                               resizeMode="cover"></Image>
                        <View style = {{flexDirection:'column', flex:1, marginLeft:20, justifyContent:'center'}}>
                            <Text>
                                {item.Content}
                            </Text>
                            <Text style = {{marginTop:5}}>
                                {item.FullName}
                            </Text>
                        </View>
                        <View style = {{flexDirection:'column', flex:1, marginLeft:20, justifyContent:'center'}}>
                            <Text>
                                {moment(new Date(item.CreatedDate)).format("LT")}
                            </Text>
                            <Text  style = {{marginTop:5}}>
                                {moment(new Date(item.CreatedDate)).format("L")}
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
        InfoUser: state.GetProfileReducers,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchCmtSuco: bindActionCreators(callApiSearchCmtSuco, dispatch),
    }
};

SuCoItemBQL = connect(mapStateToProps, mapDispatchToProps)(SuCoItemBQL);

export default SuCoItemBQL
const styles = StyleSheet.create({
    Img : {
        flex:1,
        height:100
    }
})
