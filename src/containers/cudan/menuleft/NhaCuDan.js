import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    FlatList,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import stylesContainer from "../../../components/style";
import {callApiNhaCuDan} from "../../../actions/actionsCuDan/NhaCuDanActions";
import StatusItemCuDan from "../../../components/status/StatusItemCuDan";
import SocketIOClient from "socket.io-client";
import {callApiSearchPost} from "../../../actions/SearchPostActions";
import {SOCKET} from "../../../components/Api";



class NhaCuDan extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataItem : [],
            refresh : false,
            isLoading: true,
            page_index: 1,

        }
        const {UserCuDan} = this.props;
        if (UserCuDan.length <= 0) {
            return null;
        }
        this.fetchData()
        this.socket = SocketIOClient( SOCKET, {
            pingTimeout: 30000,
            pingInterval: 30000,
            transports: ['websocket']
        });
        this.socket.emit('loginpost', {
            UserID: UserCuDan.payload[0].UserID,
            KDTID: UserCuDan.payload[0].KDTID,
        })
        this.socket.on('receivepost', (dataReceive) => {
            console.log('receivepost', dataReceive)
            dataPost = dataReceive.PostContent;
            //set newMsg = messga receive
            let newPost = this.state.dataItem;
            //add message to array
            newPost.unshift({
                RowNum: dataReceive.RowNum,
                KDTID: dataReceive.KDTID,
                UserID: dataReceive.UserID,
                FullName: dataReceive.FullName,
                Avatar: dataReceive.Avatar,
                CreatedDate: dataReceive.CreatedDate,
                UserType: dataReceive.UserType,
                TotalComment: dataReceive.TotalComment,
                TotalLike: dataReceive.TotalLike,
                TotalShare: dataReceive.TotalShare,
                PostContent: dataReceive.PostContent,
                TotalRow: dataReceive.TotalRow,
                PostID:dataReceive.PostID,
                Comments:dataReceive.Comments
            });
            this.setState({dataItem: newPost});

        })
    }
    fetchData = () => {
        const {UserCuDan, callApiSearchPost} = this.props
        if (UserCuDan.length <= 0) {
            return null;
        }
        callApiSearchPost(this.state.page_index, UserCuDan.payload[0].KDTID).then(dataRes => {
            dataBaiViet = JSON.parse(dataRes);
            dataBaiViet = dataBaiViet.Value
            console.log('bai viet sanh chinh', dataBaiViet)
            if (dataBaiViet.length <= 0) {
                return null
            }
            this.setState({
                isLoading: false,
                //save data
                dataItem: this.state.page_index === 1 ? [...dataBaiViet] : [...this.state.dataItem, ...dataBaiViet]
            })
        })
    }
    handleLoadMore = () => {
        this.setState(
            {
                page_index: this.state.page_index + 1
            },
            () => {
                console.log('index', this.state.page_index)
                this.fetchData();
            }
        );
    };
    render (){
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#718792'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        // console.log('render')
        const { infoCuDan } = this.props;
        if (infoCuDan.length <= 0) {
            return null;
        }
        console.log('infoBQL', infoCuDan[0].FullName)
        return (
            <ScrollView style = {stylesContainer.container}>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                    <View style = {styles.circle}>
                        <Text>Avatar</Text>
                    </View>
                    <Text style = {{color:'red', fontSize: 20}}>{infoCuDan[0].FullName}</Text>
                </View>
                <TouchableOpacity style = {styles.Touch}
                                  onPress = {()=>this.props.navigation.navigate('ThongTinCaNhanCuDan')}>
                    <Text style = {{color: 'white'}}>
                        Nhật ký
                    </Text>
                </TouchableOpacity>
                <View style = {{flexDirection: 'column', marginLeft: 40,
                    backgroundColor:"#42A5F5",width:200,height:100, borderWidth:1,marginTop:8,
                    justifyContent:'center'
                }}>
                    <Text style ={{marginLeft:10, color:'white'}}>Thông tin cá nhân</Text>
                    <View style = {{flexDirection:'row', marginLeft:10,}}>
                        <Text style = {{color: 'white', fontSize:15}}>Tên:</Text>
                        <Text style = {{color:'white'}}>{infoCuDan[0].FullName}</Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft:10, }}>
                        <Text style = {{color: 'white',fontSize:15}}>Số điện thoại:</Text>
                        <Text style = {{color: 'white'}}>{infoCuDan[0].Phone}</Text>
                    </View>
                </View>
                <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 20}}/>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 20}}>
                        <Image source={require('../../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('SoanTin')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <FlatList
                    data = {this.state.dataItem}
                    renderItem={(item) => {
                        return (
                            <StatusItemCuDan
                                dataItem={item}/>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                />




            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        UserCuDan: state.LoginReducers,
        infoCuDan: state.NhaCuDanReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiNhaCuDan: bindActionCreators(callApiNhaCuDan, dispatch),
        callApiSearchPost: bindActionCreators(callApiSearchPost, dispatch),
    }
};

NhaCuDan = connect(mapStateToProps, mapDispatchToProps)(NhaCuDan);
export default NhaCuDan;
const styles = StyleSheet.create({
    circle: {
        marginTop: 15,
        marginLeft: 15,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#42A5F5',
        alignItems: 'center',
        justifyContent:'center'
    },
    Touch: {
        marginTop: 8,marginLeft: 40,
        borderWidth:1, backgroundColor: '#FB8C00', width:100,height:40,
        alignItems:'center', justifyContent:'center'
    },
    viewItem: {
        flexDirection: 'row',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 30,
        marginTop:20,
        minHeight:50,
    }
})
