import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image, StyleSheet,

} from 'react-native'
import Dimensions from 'Dimensions';
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
            transports: ['websocket'],
        });
        this.state = {
            TongCmt: "",
            checkLike: true,
        }
        this.socket.on('receivelikepost', (dataReceive) => {
            console.log('receivelikepost', dataReceive)
        })


    }
    componentWillMount (){
    }

    LikePost = (PostID, DatePost) => {
        this.setState({
            checkLike: false
        })
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        this.socket.emit('likepost', {
            UserID: InfoUser[0].UserID,
            PostID: PostID,
            FullName: InfoUser[0].FullName,
            DatePost: DatePost,
            KDTID: InfoUser[0].KDTID,

        })
    }
    BinhLuan = (PostID, UserID, ProfileID) => {
        const { navigate } = this.props.navigation
        const { callApiSearchCmt } = this.props
        callApiSearchCmt( PostID ).then(dataRes => {
            dataCmt = JSON.parse(dataRes)
            dataCmt = dataCmt.Value
            navigate('BinhLuanBQL', {PostId: PostID, UserId: UserID,ProfileId: ProfileID, })
        })
    }


    render() {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }

        const {item} = this.props.dataItem;
        // console.log('item.item.ProfileID', item.ProfileID)
        return (
            <View>
                <View>
                    <View style={{flexDirection: 'row', marginTop: 15, alignItems:'center'}}>
                        <Image
                            source={{
                                // uri: item.Avatar
                                uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                            }}
                               style={styles.image_circle}
                               resizeMode="cover">
                        </Image>
                        <View style={{marginLeft: 10}}>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>{item.FullName}</Text>
                            <Text>{moment(item.CreatedDate).startOf("hour").fromNow()}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 10}}>
                        <Text style={{color: '#212121'}}>{item.PostContent}</Text>
                    </View>

                    {
                        item.Images !== "http://192.168.1.254:9051" ?
                            <Image source={{
                                uri: item.Images
                            }}
                                   style={styles.imagePost}
                                   resizeMode="cover">
                            </Image>
                            : null
                    }
                    <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                            <Text>{item.TotalLike}</Text>
                            <Icon1 name="like" size={25} color="#424242"/>

                        </View>
                        <View style={{flexDirection: 'row', marginRight: 10}}>
                            {/*<Icon1 name="comment" size={25} color="#424242" />*/}
                            <Text> {item.TotalComment} bình luận</Text>
                        </View>

                    </View>
                    <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <Icon1 name="like" size={25} color="#424242"/>
                            {
                                this.state.checkLike ?
                                    <TouchableOpacity
                                        onPress={() => this.LikePost()}
                                    >
                                        <Text style={{color: '#424242'}}>Thích</Text>
                                    </TouchableOpacity> : <Text style={{color: '#424242'}}> Bỏ thích</Text>
                            }
                        </View>
                        <View style={{flexDirection: 'row', marginRight: 20}}>
                            <Icon1 name="comment" size={25} color="#424242"/>

                                <Text style={{color: '#424242', fontWeight:'bold'}}>Bình luận</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                    {
                        item.Comments.length > 0 ?
                            <View>
                                <View style={{flexDirection: 'row', marginTop: 15, marginRight: 15}}>
                                    <Image
                                        source={{

                                            // uri: item.Comments[0].Content
                                            uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                                        }}
                                        style={styles.image_circle}
                                        resizeMode="cover">
                                    </Image>
                                    <View style={{
                                        marginLeft: 10, flex: 1,
                                        backgroundColor: '#F5F5F5', borderRadius: 10,
                                        paddingLeft: 10,
                                        flexWrap: 'wrap',
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                    }}>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 13
                                        }}>{item.Comments[0].FullName}</Text>
                                        <Text>{item.Comments[0].Content}</Text>
                                    </View>
                                </View>
                            </View>
                            : null
                    }
                    <View style={{flexDirection: 'row', marginTop: 5, marginRight: 15, alignItems:'center'}}>
                        <Image
                            source={{
                                uri: InfoUser[0].Avatar
                            }}
                            style={styles.image_circle}
                            resizeMode="cover">
                        </Image>
                        <TouchableOpacity onPress={() => {
                            console.log('item.item.ProfileID', item.ProfileID)
                            this.BinhLuan(item.PostID, item.UserID, item.ProfileID)
                        }}
                                          style={{
                                              marginLeft: 10, flex: 1,
                                              backgroundColor: '#F5F5F5', borderRadius: 50,
                                              borderWidth:1,
                                              borderColor:'#757575',
                                              paddingLeft: 10,
                                              paddingRight: 10,
                                              paddingTop: 10,
                                              paddingBottom: 10,
                                          }}>
                            <View>
                            <Text>Viết bình luận ...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{height: 5, backgroundColor: '#cccccc', marginTop: 10}}/>
            </View>
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
        callApiSearchCmt: bindActionCreators(callApiSearchCmt, dispatch),
    }
};

StatusItems = connect(mapStateToProps, mapDispatchToProps)(StatusItems);

export default StatusItems
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
        height: 250,
        marginTop: 10
    }
})