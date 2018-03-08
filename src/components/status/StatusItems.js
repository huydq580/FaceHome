import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native'
import moment from 'moment';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import SocketIOClient from "socket.io-client";
import {SOCKET} from "../Api";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { callApiSearchCmt } from "../../actions/SearchCmtActions";

class StatusItems extends Component {
    constructor(props) {
        super(props)
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']

        });
    }

    LikePost = (PostID, DatePost) => {
        const {UserBQL} = this.props;
        if (UserBQL.length <= 0) {
            return null
        }
        this.socket.emit('likepost', {
            UserID: UserBQL.payload[0].UserID,
            PostID: PostID,
            FullName: UserBQL.payload[0].FullName,
            DatePost: DatePost
        })
    }
    BinhLuan = (PostID) => {
        const { callApiSearchCmt } = this.props
        callApiSearchCmt( PostID ).then(dataRes => {
            dataCmt = JSON.parse(dataRes)
            dataCmt = dataCmt.Value
            console.log('dtacmt', dataCmt)
        })
    }


    render() {

        const {item} = this.props.dataItem;

        const {navigation} = this.props;
        console.log('item', item.Comments.length)
        return (
            <View>
                <View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style={{resizeMode: 'cover', height: 40, width: 30, marginLeft: 10}}>
                        </Image>
                        <View style={{marginLeft: 10}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>{item.FullName}</Text>
                            <Text>{moment(item.CreatedDate).startOf("hour").fromNow()}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                        <Text style={{color: '#212121'}}>{item.PostContent}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                            <Icon1 name="like" size={25} color="#424242"/>
                            <Text>{item.like}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginRight: 10}}>
                            {/*<Icon1 name="comment" size={25} color="#424242" />*/}
                            <Text> {item.comment} bình luận</Text>
                        </View>

                    </View>
                    <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <Icon1 name="like" size={25} color="#424242"/>
                            <TouchableOpacity onPress={this.LikePost(item.PostID, item.CreatedDate)}>
                                <Text style={{color: '#424242'}}>Thích</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', marginRight: 20}}>
                            <Icon1 name="comment" size={25} color="#424242"/>
                            <TouchableOpacity onPress={() => {
                                this.BinhLuan(item.PostID)
                                navigation.navigate('BinhLuanBQL')
                            }}>
                                <Text style={{color: '#424242'}}>Bình luận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                    {
                        item.Comments.length == 1 ?
                            <View>
                                <View style={{flexDirection: 'row', marginTop: 15, marginRight: 15}}>
                                    <Image
                                        source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                                        style={{resizeMode: 'cover', height: 40, width: 30, marginLeft: 10}}>
                                    </Image>
                                    <View style={{
                                        marginLeft: 10, flex: 1,
                                        backgroundColor: '#F5F5F5', borderRadius: 10,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                    }}>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 13
                                        }}>{item.FullName}</Text>
                                        <Text>{item.Comments[0].Content}</Text>
                                    </View>
                                </View>
                            </View> :
                            item.Comments.length == 2 ?
                                <View>
                                    <View style={{flexDirection: 'row', marginTop: 15, marginRight: 15}}>
                                        <Image
                                            source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                                            style={{resizeMode: 'cover', height: 40, width: 30, marginLeft: 10}}>
                                        </Image>
                                        <View style={{
                                            marginLeft: 10, flex: 1,
                                            backgroundColor: '#F5F5F5', borderRadius: 10,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        }}>
                                            <Text style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: 13
                                            }}>{item.FullName}</Text>
                                            <Text>{item.Comments[0].Content}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 15, marginRight: 15}}>
                                        <Image
                                            source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                                            style={{resizeMode: 'cover', height: 40, width: 30, marginLeft: 10}}>
                                        </Image>
                                        <View style={{
                                            marginLeft: 10, flex: 1,
                                            backgroundColor: '#F5F5F5', borderRadius: 10,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        }}>
                                            <Text style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: 13
                                            }}>{item.FullName}</Text>
                                            <Text>{item.Comments[1].Content}</Text>
                                        </View>
                                    </View>
                                </View>


                            : null
                    }
                </View>

                <View style={{height: 5, backgroundColor: '#cccccc', marginTop: 10}}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        UserBQL: state.LoginReducers,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchCmt: bindActionCreators(callApiSearchCmt, dispatch),
    }
};

StatusItems = connect(mapStateToProps, mapDispatchToProps)(StatusItems);

export default StatusItems