import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Communications from 'react-native-communications';
import {callApiCanhBaoChay, callApiSearchCanhBaoChay} from "../../../actions/actionsBQL/CanhBaoChayNhanhActions";
import PickerImage from "../../../components/PickerImage";
import {callApiUploadImage} from "../../../actions/SoanTinActions";
import CanhBaoChayItem from "../../../components/canhbaochay/CanhBaoChayItem";

class CanhBaoChayNhanh extends Component {
    constructor(props){
        super(props)
        this.state = {
            CanhBao: '',
            UserBQL1:'',
            placeholdeText: '',
            data: [],
            isCheck:true,
            dataImage: null,
            avatarSource: null,
            linkImg: '',

        }
    }
    componentWillMount(){
        const { InfoUser, callApiSearchCanhBaoChay } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        callApiSearchCanhBaoChay(InfoUser[0].KDTID, InfoUser[0].UserID).then((dataSearch) => {
            dataSearch1 = JSON.parse(dataSearch);
            console.log('dataSearch', dataSearch1)
            this.setState({
                data: dataSearch1.Value
            })
        })
    }
    BaoChay () {
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        // console.log('userbbql1', UserBQL)
        const { callApiCanhBaoChay } = this.props;
        callApiCanhBaoChay(InfoUser[0].KDTID, InfoUser[0].UserID,  InfoUser[0].FullName, this.state.CanhBao, this.state.linkImg).then((dataCanhBaoChay) => {
            data = JSON.parse(dataCanhBaoChay);
            if(data.ErrorCode === "00"){
                Alert.alert(
                    'Alert',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )

            }
        })
    }
    show() {
        PickerImage((source, data) => this.setState({avatarSource: source, dataImage: data, isCheck: false}, ()=>{
            this.upload()
        }));
    }

    upload() {
        const {InfoUser, callApiUploadImage} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        callApiUploadImage(InfoUser[0].UserID, this.state.dataImage).then(dataImg => {
            dataImg = JSON.parse(dataImg)
            dataImg = dataImg.Value
            // console.log('dataImage1', dataImg)
            this.setState({
                linkImg: 'http://192.168.1.254:9051' + dataImg
            })
        })
    }
    render(){
        const {navigation} = this.props
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={styles.viewImage}

            />
        const {navigate} = this.props.navigation;
        // console.log('navigation', this.props.navigation)
        return(
            <ScrollView>
                {
                    this.state.isCheck ?
                        <View style={styles.viewImage}>
                            <TouchableOpacity onPress={this.show.bind(this)}>
                                <Image
                                    source={require('../../../images/camera.png')}
                                    style={styles.imagePost}

                                />
                            </TouchableOpacity>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>Bạn cần đăng 1 hình</Text>
                        </View> : img
                }
                <View style = {styles.viewWrap}>
                    <TextInput
                        style = {{
                            marginLeft: 10,
                        }}
                        placeholder = 'Ban quản lí nhập thông tin tại đây'
                        underlineColorAndroid="transparent"
                        onChangeText = {(CanhBao) => this.setState({CanhBao})}/>
                </View>
                <View style = {styles.viewGui}>
                    <Text style = {{fontSize: 17}}>
                        Cảnh báo cháy
                    </Text>


                </View>


                <View style = {{flexDirection:'row', marginLeft:20, marginTop:20}}>
                    <Text>Hoặc gọi ngay cứu hỏa: </Text>
                    <TouchableOpacity onPress={() => Communications.phonecall('114', true)}>
                        <Text style = {{marginLeft:30, borderWidth:1, backgroundColor:'#0288D1'}}>114</Text>
                    </TouchableOpacity>
                </View>
                <Text style = {{marginTop:20}}>Lịch sử báo cháy</Text>
                <FlatList
                    data = {this.state.data}
                    renderItem = {(item) => {
                        return (
                            <CanhBaoChayItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }

                    }
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent = {this.renderSeparator}
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
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiUploadImage: bindActionCreators(callApiUploadImage, dispatch),
        callApiCanhBaoChay: bindActionCreators(callApiCanhBaoChay, dispatch),
        callApiSearchCanhBaoChay: bindActionCreators(callApiSearchCanhBaoChay, dispatch)
    }
};

CanhBaoChayNhanh = connect(mapStateToProps, mapDispatchToProps)(CanhBaoChayNhanh);
export default CanhBaoChayNhanh;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
        borderColor:'#9E9E9E',
        justifyContent:'center',
        // alignItems:'center'
    },
    viewWrap: {
        marginHorizontal: 10,
        marginTop: 10,
        borderWidth: 1,
        height: DEVICE_HEIGHT/12,
        borderColor: '#cccccc',
        borderRadius:40,
        justifyContent:'center' ,
    },
    viewGui: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 50,
        borderColor: "#23b34c",
        backgroundColor:'#23b34c',
        height: DEVICE_HEIGHT/12,
        justifyContent:'center',
        alignItems:'center'


    },
    viewImage: {
        marginTop: 10,
        marginHorizontal: 10,
        height: DEVICE_HEIGHT/5,
        backgroundColor:'#AED581',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 5,
        borderColor:'#23b34c'
    },
    imagePost: {
        width: 60,
        height: 60,

    }
})