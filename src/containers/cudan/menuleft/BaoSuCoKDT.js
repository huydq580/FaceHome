import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Picker,
    ScrollView,
    TouchableOpacity, StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";

import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import {callApiSearchSuCo} from "../../../actions/suco/SearchSuCoActions";
import images from "../../../components/images";
import moment from 'moment';
import SuCoItem from "../../../components/baocaosuco/SuCoItem";

class BaoSuCoKDT extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Phản ánh sự cố',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }
    constructor(props){
        super(props)
        this.state  = {
            SuCo: '',
            dataSuCo: []
        }
    }
    componentDidMount(){
       this.SearchSuCo()
    }
    SearchSuCo = () => {
        const { callApiSearchSuCo ,InfoUser  } = this.props;
        if (InfoUser.length<=0){
            return null;
        }
        let dataLtProfile = (InfoUser[0].LtProfile) ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        callApiSearchSuCo(dataProfile[0].KDTID, 1, "" ).then(dataRes => {
            dataRes = JSON.parse(dataRes)
            dataRes = dataRes.Value,
                this.setState({
                    dataSuCo: dataRes,
                })
            console.log('datasuco', dataRes)
        })

    }
    render(){
        const {navigation} = this.props;
        return(
            <ScrollView style = {stylesContainer.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchFaceHome')}>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#FCE4EC'
                    }}>
                        <Icon name="search" size={30} style={{marginLeft: 7}} color="black"/>
                        <Text>Tìm kiếm</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{flexDirection:'row', marginTop: 10, marginHorizontal: 10, justifyContent: "space-between", alignItems:'flex-end'}}>
                    <Text style = {{color: "#EF5350"}}>
                        PHẢN ÁNH - GÓP Ý CỦA BẠN
                    </Text>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate("SoanTinCuDan")}>
                        <View style = {{
                            borderWidth: 1,
                            height: 25,
                            width: 90,
                            justifyContent:'center',
                            alignItems: 'center',
                            borderColor: "#E57373",
                            backgroundColor: '#FFCDD2'
                        }}>
                            <Text> Đăng mới </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{height:1 , backgroundColor: 'black', marginHorizontal: 10}}/>
                <FlatList
                    data={this.state.dataSuCo}
                    renderItem={(item) => {
                        return (
                            <SuCoItem
                                dataItem={item}
                                navigation={navigation}
                                fromSuCo={false}/>
                        )
                    }}

                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}

                />

            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchSuCo: bindActionCreators(callApiSearchSuCo, dispatch)
    }
};

BaoSuCoKDT = connect(mapStateToProps, mapDispatchToProps)(BaoSuCoKDT);
export default BaoSuCoKDT;
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