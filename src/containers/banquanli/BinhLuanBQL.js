import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput

} from 'react-native';
import stylesContainer from "../../components/style";
import CmtItem from "../../components/status/CmtItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {callApiPostCmt} from "../../actions/PostCmtActions";

class BinhLuanBQL extends Component {
    constructor(props){
        super(props)
        this.input_msg = '';
        this.state = {
            dataCmt: [
                {
                    fullName: 'Hiệu Nguyễn',
                    avt: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg',
                    cmt: 'thế giờ mày thích sao?'
                },
                {
                    fullName: 'Hiền Hyhy',
                    avt: 'http://i.chieu-cao.net/wp-content/uploads/2016/12/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg',
                    cmt: 'một con vịt xòe ra 2 cái cánh, nó kêu rằng fuck you'
                },
                {
                    fullName: 'Nguyễn Công Phượng',
                    avt: 'http://s1.img.yan.vn/YanNews/2167221/201608/20160816-120254-13_600x600.jpg',
                    cmt: 'hôm nay mình đá hay quá'
                },
            ]
        }
    }
    Comment =() => {
        if (this.input_msg === "")
            return;
        this.textInput.clear();
        let SendCMT = this.input_msg;
        const { callApiPostCmt, UserBQL } = this.props;
        if (UserBQL.length <= 0) {
            return null
        }
        callApiPostCmt(176, UserBQL.payload[0].UserID, UserBQL.payload[0].Type, UserBQL.payload[0].FullName, SendCMT).then(dataRes => {
            console.log('thong bao cmt', dataRes)
        })
    }
    render (){
        return (
            <View style = {stylesContainer.container}>
                <FlatList
                    data={this.state.dataCmt}
                    renderItem={(item) => {
                        return (
                            <CmtItem
                                dataItem={item}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingBottom: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: 40,
                                aspectRatio: 1,
                                paddingBottom: 10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                            }}
                            source={require('../../images/camera.png')}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{flex: 1}}
                        placeholder={"Nhập vào đây..."}
                        onChangeText={
                            (text) => this.input_msg = text}
                        ref={input => {
                            this.textInput = input
                        }}


                    />
                    <TouchableOpacity
                         onPress={this.Comment}
                    >
                        <Image
                            style={{
                                width: 40,
                                paddingBottom: 10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                aspectRatio: 1
                            }}
                            source={require('../../images/send.png')}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiPostCmt: bindActionCreators(callApiPostCmt, dispatch)
    }
};

BinhLuanBQL = connect(mapStateToProps, mapDispatchToProps)(BinhLuanBQL);
export default BinhLuanBQL