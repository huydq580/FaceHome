import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Button,
    TextInput,
    FlatList,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/EvilIcons'
import stylesContainer from "../../components/style";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {callApiSearchDanCu} from "../../actions/actionsBQL/QLDanCuActions";
import {callApiGetBQL} from "../../actions/actionsBQL/BQLActions";
import {callApiMsgGroupID} from "../../actions/MsgGroupIDActions";
class SoanTinMoiCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: true,
            SearchItem:'',
            dataBQL:'',
        }
    }
    componentWillMount(){
        const { UserCuDan } = this.props;
        if (UserCuDan.length <= 0) {
            return null;
        }

        // console.log('user',UserCuDan)

        const { callApiGetBQL } = this.props;
        callApiGetBQL(UserCuDan.payload[0].KDTID).then(dataGetBQL => {
            dataGetBQL = JSON.parse(dataGetBQL)
            dataGetBQL = dataGetBQL.Value
            this.setState({
                dataBQL: dataGetBQL
            })
        })

    }
    Search = ()=> {
        this.setState({
            search: false
        })
    }
    Cancel = ()=> {
        this.setState({
            search: true
        })
    }
    SearchUser(input){
        data = this.state.dataBQL
        let inputSearch  = data.filter((text)=>{
            if(text.FullName.indexOf(input)>0){
                return text;
            }
        })
        this.setState({
            dataBQL: inputSearch
        })
    }

    render () {
        return (
            <View style = {stylesContainer.container}>
                {
                    this.state.search ?
                        <TouchableOpacity onPress = {this.Search}>
                            <View style = {styles.containerNavbar}>
                                <Icon name="search" size={25} color="#616161"/>

                                <Text>Search</Text>

                            </View>
                        </TouchableOpacity> : <View style = {{ flexDirection:'row', marginTop:10}}>
                            <View style = {styles.containerNavbarS}>
                                <TextInput  placeholder = 'Search'
                                            underlineColorAndroid="transparent"
                                            onChangeText = {this.SearchUser.bind(this)}/>
                            </View>
                            <TouchableOpacity onPress = {this.Cancel}>
                                <Text style = {{flex:2 , marginLeft:5, fontSize:17}}>cancel</Text>
                            </TouchableOpacity>
                        </View>
                }
                <FlatList
                    data = {this.state.dataBQL}
                    renderItem = {({item}) =>
                        <TouchableOpacity onPress = {()=>{
                            const { UserCuDan } = this.props;
                            if (UserCuDan.length <= 0) {
                                return null;
                            }
                            // console.log('UsercuDan111', UserCuDan)
                            // console.log('KDTID',UserCuDan.payload[0].KDTID )
                            // console.log('UserID',UserCuDan.payload[0].UserID )
                            // console.log('FullName',UserCuDan.payload[0].FullName )
                            // console.log('user1',item.UserID)
                            // console.log('FullName1',item.FullName)
                            const { callApiMsgGroupID } = this.props;
                            callApiMsgGroupID(UserCuDan.payload[0].KDTID,UserCuDan.payload[0].UserID, UserCuDan.payload[0].FullName,UserCuDan.payload[0].IntUserID, item.UserID,  item.FullName,item.IntUserID,item.FullName, UserCuDan.payload[0].UserID, UserCuDan.payload[0].FullName, false).then(dataRes=> {
                                // console.log('dataMsgGroupID',dataRes)
                                dataMsgGroupID = dataRes.ObjectResult[0].MsgGroupID
                                console.log('dataMsgGroupID',dataMsgGroupID),
                                    // console.log('gui ok')
                                    this.props.navigation.navigate("TinNhanDetailsCuDan", {title:item.FullName, MsgGroupID: dataMsgGroupID})
                            })

                        }}>
                            <View style = {{flexDirection:'row', alignItems:"center"}}>
                                <Image style={styles.image_circle}

                                       source={{
                                           uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                                       }}
                                       resizeMode="cover"
                                >
                                </Image>
                                <Text style = {{flex:3, fontSize:20}}>{item.FullName}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index}
                />




            </View>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        UserCuDan: state.LoginReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetBQL: bindActionCreators(callApiGetBQL, dispatch),
        callApiMsgGroupID: bindActionCreators(callApiMsgGroupID, dispatch),
    }
};

SoanTinMoiCuDan = connect(mapStateToProps, mapDispatchToProps)(SoanTinMoiCuDan);
export default SoanTinMoiCuDan;

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    containerNavbar: {
        borderWidth:1,
        marginHorizontal:10,
        borderRadius: 10,
        flexDirection:'row',
        borderColor:'#9E9E9E',
        minHeight:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,


    },
    containerNavbarS: {
        borderWidth:1,
        marginLeft:10,
        borderRadius: 10,
        borderColor:'#9E9E9E',
        maxHeight:40,
        flex:7,
    },
    image_circle: {
        height: DEVICE_WIDTH / 9,
        width: DEVICE_WIDTH / 9,
        borderRadius: DEVICE_WIDTH / 18,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 10,


    }
})