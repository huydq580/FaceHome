import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Picker,
    TextInput,
    Alert,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import stylesContainer from "../../../components/style";
import {LINKIMG, PostSuco, URL} from "../../../components/Api";
import PickerImage from "../../../components/PickerImage";
import {callApiUploadImage} from "../../../actions/SoanTinActions";

class BaoSuCoMoi extends Component {
    constructor(props){
        super(props)
        this.state = {
            SuCo: '',
            NoiDung: '',
            //upload imgae
            isCheck:true,
            dataImage: null,
            avatarSource: null,
            linkImg: '',
        }
    }
    BaoSuCoMoi(){
        const { InfoUser } = this.props;
        if (InfoUser<=0){
            return null;
        }
        fetch( URL+ PostSuco,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                kdt_id: InfoUser[0].KDTID,
                user_id: InfoUser[0].UserID,
                full_name: InfoUser[0].FullName,
                avatar: "",
                ten_can_ho: 1002,
                media: this.state.linkImg,
                type: InfoUser[0].Type,
                post_content: this.state.NoiDung,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                data = JSON.parse(dataRes);
                if(data.ErrorCode==="00") {
                    Alert.alert(
                        'Alert',
                        data.Message,
                        [
                            {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                    )
                }
                else {
                    Alert.alert(
                        'Alert',
                        data.Message,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )
                }

            }).catch((erro)=> {
            console.log('erro',erro);
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
                linkImg: LINKIMG + dataImg
            }, ()=> {
                console.log('linkImg', this.state.linkImg)
            })
        })
    }
    render () {
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={styles.viewImage}

            />
        return(
            <View style = {stylesContainer.container}>
                <Picker
                    selectedValue={this.state.SuCo}
                    onValueChange={(itemValue, itemIndex) => this.setState({SuCo: itemValue})}>
                    <Picker.Item label = {'Tất cả'} value = ''/>
                    <Picker.Item label = {'Nhà riêng'} value = {'1'}/>
                    <Picker.Item label = {'Công cộng'} value ={'2'}/>
                </Picker>

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
                        placeholder = 'Nhập nội dung sự cố tại đây'
                        underlineColorAndroid="transparent"
                        onChangeText = {(NoiDung) => this.setState({NoiDung})}

                    />
                </View>
                <TouchableOpacity onPress = {this.BaoSuCoMoi.bind(this)}>
                    <View style = {styles.viewGui}>
                        <Text style = {{fontSize: 17, color: 'white', fontWeight:'bold'}}>
                            Báo cáo sự cố
                        </Text>


                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        infoCuDan: state.NhaCuDanReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImage: bindActionCreators(callApiUploadImage, dispatch)
    }
};

BaoSuCoMoi = connect(mapStateToProps, mapDispatchToProps)(BaoSuCoMoi);
export default BaoSuCoMoi;
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
    imagePost: {
        width: 60,
        height: 60,

    }
})