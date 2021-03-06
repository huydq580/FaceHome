import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image, StyleSheet,
    FlatList,
    Alert

} from 'react-native'
import moment from 'moment';
import Dimensions from 'Dimensions';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import SocketIOClient from "socket.io-client";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {LikePost, SOCKET, URL_SOCKET} from "../Api";
import PollVote from "../status/PollVote";
import images from "../images";
import {callApiSearchCmt} from "../../actions/SearchCmtActions";

class SearchBaiVietItem extends Component {
    constructor(props) {
        super(props)
        this.socket = SocketIOClient(SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket'],

        });
        this.countliked = this.props.dataItem.item.TotalLike;
        this.state = {
            TongCmt: "",
            checkLike: true,
            ArrPoll: [],
            liked: false,
            countLike: this.countliked,
            countCheck: "",
        }
    }
    /*
        onClick = () => {
            console.log('hihi')
            this.youChecked(PostID)
        }*/
    likePost = (PostID) => {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        fetch(URL_SOCKET + LikePost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                IntUserID: InfoUser[0].IntUserID,
                PostID: PostID,
                FullName: InfoUser[0].FullName,
                Islike: true,
                TableLog: 0


            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log("data like", data);
            if (data.Error === null) {
                let currentLike = this.state.countLike;
                currentLike++;

                this.setState({liked: true, countLike: currentLike});
            }
            else {
                Alert.alert("Thông báo", "có lỗi sảy ra");
            }
        }).catch(e => {
            console.log("exception", e);
            Alert.alert("Thông báo", "Có lỗi khi like");
        });

    }

    unlikePost = (PostID) => {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        fetch(URL_SOCKET + LikePost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                IntUserID: InfoUser[0].IntUserID,
                PostID: PostID,
                FullName: InfoUser[0].FullName,
                Islike: false,
                TableLog: 0


            })
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.Error === null) {
                let currentLike = this.state.countLike;
                currentLike--;

                this.setState({liked: false, countLike: currentLike});
            }
            else {
                Alert.alert("Thông báo", "có lỗi sảy ra");
            }
        }).catch(e => {
            console.log("exception", e);
            Alert.alert("Thông báo", "Có lỗi khi like");
        });

    }


    BinhLuan = (PostID, IntUserIDPost) => {
        const {callApiSearchCmt} = this.props
        callApiSearchCmt(PostID).then(dataRes => {
            dataCmt = JSON.parse(dataRes)
            dataCmt = dataCmt.Value
            this.props.navigation.navigate('BinhLuanCuDan', {postId: PostID, IntUserIDPost: IntUserIDPost})
        })
    }

    componentDidMount() {
        const {item} = this.props.dataItem;
        //ArrUser Liked
        let dataLike = (item.LikePost) ? item.LikePost : null
        ArrUserLiked = dataLike ? JSON.parse(dataLike) : [];
        //Get Arr IntUserID
        var ArrIntUserID = ArrUserLiked.map(function (o) {
            return o.IntUserID;
        });
        // console.log('value', values)

        if (ArrIntUserID.indexOf(this.props.InfoUser[0].IntUserID) > -1) {
            this.setState({liked: true})
        }
        // console.log('userLiked', ArrUserLiked)
        let dataPoll = (item.Poll) ? item.Poll : null
        Poll = dataPoll ? JSON.parse(dataPoll) : null;
        this.setState({
            ArrPoll: Poll,
            // countCheck:  Poll.TotalVote

        })
    }


    render() {
        const {InfoUser} = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        const {item} = this.props.dataItem;
        return (
            <View>
                {
                    item.Type == 0 ? <View>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Image
                                source={
                                    item.Avatar == "http://image.facehome.vn/avatar/default.png" ? images.noavatar : {uri: item.Avatar}
                                }
                                style={styles.image_circle}
                                resizeMode="cover">
                            </Image>
                            <View style={{marginLeft: 10}}>
                                <Text style={{color: 'black', fontWeight: 'bold'}}>{item.FullName}</Text>
                                <Text>{moment(item.CreatedDate).format("HH:mm, DD-MM-YYYY")}</Text>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 10, marginTop: 10}}>
                            <Text style={{color: '#212121'}}>{item.PostContent}</Text>
                        </View>
                        {
                            (item.Images == URL || item.Images == "") ?
                                null
                                : <Image source={{
                                    uri: item.Images
                                }}
                                         style={styles.imagePost}
                                         resizeMode="cover">
                                </Image>
                        }
                        <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', marginLeft: 10}}>
                                <Text>{this.state.countLike}</Text>
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
                                <Icon1 name="like" size={25} color={this.state.liked ? "blue" : "#424242"}/>
                                <TouchableOpacity
                                    onPress={() => this.state.liked ? this.unlikePost(item.PostID) : this.likePost(item.PostID)}
                                >
                                    <Text style={{color: this.state.liked ? 'blue' : null}}>Thích</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', marginRight: 20}}>
                                <Icon1 name="comment" size={25} color="#424242"/>

                                <Text style={{color: '#424242'}}>Bình luận</Text>
                            </View>
                        </View>
                        <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                        {/*{*/}
                            {/*item.Comments.length > 0 ?*/}
                                {/*<View>*/}
                                    {/*<View style={{flexDirection: 'row', marginTop: 15, marginRight: 15}}>*/}
                                        {/*<Image*/}
                                            {/*source={*/}
                                                {/*item.Comments[0].Avartar == "http://image.facehome.vn/avatar/default.png" ? images.noavatar : {uri: item.Comments[0].Avartar}*/}
                                            {/*}*/}
                                            {/*style={styles.image_circle}*/}
                                            {/*resizeMode="cover">*/}
                                        {/*</Image>*/}
                                        {/*<View style={{*/}
                                            {/*marginLeft: 10, flex: 1,*/}
                                            {/*backgroundColor: '#F5F5F5', borderRadius: 10,*/}
                                            {/*paddingLeft: 10,*/}
                                            {/*paddingRight: 10,*/}
                                            {/*paddingTop: 10,*/}
                                            {/*paddingBottom: 10,*/}
                                        {/*}}>*/}
                                            {/*<Text style={{*/}
                                                {/*color: 'black',*/}
                                                {/*fontWeight: 'bold',*/}
                                                {/*fontSize: 13*/}
                                            {/*}}>{item.Comments[0].FullName}</Text>*/}
                                            {/*<Text>{item.Comments[0].Content}</Text>*/}
                                        {/*</View>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                {/*: null*/}
                        {/*}*/}
                        <View style={{flexDirection: 'row', marginTop: 5, marginRight: 15, alignItems: 'center'}}>
                            <Image
                                source={
                                    // uri: InfoUser[0].Avatar
                                    !InfoUser[0].Avatar ? images.noavatar : {uri: InfoUser[0].Avatar}
                                }
                                style={styles.image_circle}
                                resizeMode="cover">
                            </Image>
                            <TouchableOpacity onPress={() => {
                                this.BinhLuan(item.PostID, item.IntUserID)
                            }}
                                              style={{
                                                  marginLeft: 10, flex: 1,
                                                  backgroundColor: '#F5F5F5', borderRadius: 50,
                                                  borderWidth: 1,
                                                  borderColor: '#9E9E9E',
                                                  paddingLeft: 10,
                                                  paddingRight: 10,
                                                  paddingTop: 5,
                                                  paddingBottom: 5,
                                              }}>
                                <View>
                                    <Text>Viết bình luận ...</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> : <View>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Image
                                source={
                                    item.Avatar == "http://image.facehome.vn/avatar/default.png" ? images.noavatar : {uri: item.Avatar}
                                }
                                style={styles.image_circle}
                                resizeMode="cover">
                            </Image>
                            <View style={{marginLeft: 10}}>
                                <Text style={{color: 'black', fontWeight: 'bold'}}>{item.FullName}</Text>
                                <Text>{moment(item.CreatedDate).format("HH:mm, DD-MM-YYYY")}</Text>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 10, marginTop: 10}}>
                            <Text style={{color: '#212121'}}>{item.PostContent}</Text>
                        </View>
                        <FlatList
                            style={{marginTop: 5}}
                            data={this.state.ArrPoll}
                            renderItem={(item) => {
                                return (
                                    <PollVote
                                        dataItem={item}
                                    />

                                )
                            }}

                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}

                        />
                        <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', marginLeft: 10}}>
                                <Text>{this.state.countLike}</Text>
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
                                <Icon1 name="like" size={25} color={this.state.liked ? "blue" : "#424242"}/>
                                <TouchableOpacity
                                    onPress={() => this.state.liked ? this.unlikePost(item.PostID) : this.likePost(item.PostID)}
                                >
                                    <Text style={{color: this.state.liked ? 'blue' : null}}>Thích</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', marginRight: 20}}>
                                <Icon1 name="comment" size={25} color="#424242"/>

                                <Text style={{color: '#424242'}}>Bình luận</Text>
                            </View>
                        </View>
                        <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                        {/*{*/}
                            {/*item.Comments.length > 0 ?*/}
                                {/*<View>*/}
                                    {/*<View style={{flexDirection: 'row', marginTop: 15, marginRight: 15}}>*/}
                                        {/*<Image*/}
                                            {/*source={*/}
                                                {/*item.Comments[0].Avartar == "http://image.facehome.vn/avatar/default.png" ? images.noavatar : {uri: item.Comments[0].Avartar}*/}
                                            {/*}*/}
                                            {/*style={styles.image_circle}*/}
                                            {/*resizeMode="cover">*/}
                                        {/*</Image>*/}
                                        {/*<View style={{*/}
                                            {/*marginLeft: 10, flex: 1,*/}
                                            {/*backgroundColor: '#F5F5F5', borderRadius: 10,*/}
                                            {/*paddingLeft: 10,*/}
                                            {/*paddingRight: 10,*/}
                                            {/*paddingTop: 10,*/}
                                            {/*paddingBottom: 10,*/}
                                        {/*}}>*/}
                                            {/*<Text style={{*/}
                                                {/*color: 'black',*/}
                                                {/*fontWeight: 'bold',*/}
                                                {/*fontSize: 13*/}
                                            {/*}}>{item.Comments[0].FullName}</Text>*/}
                                            {/*<Text>{item.Comments[0].Content}</Text>*/}
                                        {/*</View>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                {/*: null*/}
                        {/*}*/}
                        <View style={{flexDirection: 'row', marginTop: 5, marginRight: 15, alignItems: 'center'}}>
                            <Image
                                source={
                                    // uri: InfoUser[0].Avatar
                                    !InfoUser[0].Avatar ? images.noavatar : {uri: InfoUser[0].Avatar}
                                }
                                style={styles.image_circle}
                                resizeMode="cover">
                            </Image>
                            <TouchableOpacity onPress={() => {
                                this.BinhLuan(item.PostID, item.IntUserID)
                            }}
                                              style={{
                                                  marginLeft: 10, flex: 1,
                                                  backgroundColor: '#F5F5F5', borderRadius: 50,
                                                  borderWidth: 1,
                                                  borderColor: '#BDBDBD',
                                                  paddingLeft: 10,
                                                  paddingRight: 10,
                                                  paddingTop: 6,
                                                  paddingBottom: 6,
                                              }}>
                                <View>
                                    <Text>Viết bình luận ...</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

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

SearchBaiVietItem = connect(mapStateToProps, mapDispatchToProps)(SearchBaiVietItem);

export default SearchBaiVietItem
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