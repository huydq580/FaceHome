import  React, { Component } from 'react';
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
import {callApiMsgGroupID} from "../../actions/MsgGroupIDActions";
class SoanTinMoi extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: true,
            SearchItem:'',
            dataCuDan:'',
            text: ''
        }
        this.dataSearchDanCu = [];
    }
    componentWillMount(){
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }

        const { callApiSearchDanCu } = this.props;
        callApiSearchDanCu(InfoUser[0].KDTID).then(dataSearchDanCu => {
            dataSearchDanCu = JSON.parse(dataSearchDanCu)
            dataSearchDanCu = dataSearchDanCu.Value
            this.dataSearchDanCu = dataSearchDanCu
            this.setState({
                dataCuDan: dataSearchDanCu
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
    SearchUser(text){
        const data = this.dataSearchDanCu;
        const inputSearch = data.filter(function(item){
            const itemData = item.FullName.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataCuDan: inputSearch,
            text: text
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
                                        onChangeText = {(text) => this.SearchUser(text)}/>
                        </View>
                        <TouchableOpacity onPress = {this.Cancel}>
                            <Text style = {{flex:2 , marginLeft:5, fontSize:17}}>cancel</Text>
                        </TouchableOpacity>
                    </View>
                }
                <FlatList
                    data = {this.state.dataCuDan}
                    renderItem = {({item}) =>
                        <TouchableOpacity onPress = {()=>{
                            const { InfoUser } = this.props;
                            if (InfoUser.length <= 0) {
                                return null;
                            }
                            const { callApiMsgGroupID } = this.props;
                            callApiMsgGroupID(InfoUser[0].KDTID,InfoUser[0].UserID, InfoUser[0].FullName,InfoUser[0].IntUserID, item.UserID,  item.FullName,item.IntUserID,  item.FullName, InfoUser[0].UserID, InfoUser[0].FullName, false).then(dataRes=> {
                                // console.log('dataMsgGroupID',dataRes)
                                dataMsgGroupID = dataRes.ObjectResult[0].MsgGroupID
                                console.log('dataMsgGroupID',dataMsgGroupID),
                                    // console.log('gui ok')
                                this.props.navigation.navigate("TinNhanDetails", { title : item.FullName, MsgGroupID: dataMsgGroupID})
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
        InfoUser: state.GetProfileReducers,
        infoCuDan: state.QLDanCuReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchDanCu: bindActionCreators(callApiSearchDanCu, dispatch),
        callApiMsgGroupID: bindActionCreators(callApiMsgGroupID, dispatch),
    }
};

SoanTinMoi = connect(mapStateToProps, mapDispatchToProps)(SoanTinMoi);
export default SoanTinMoi;

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