import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    AsyncStorage,
    ScrollView,
    ActivityIndicator,
    Image, Alert
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import stylesContainer from "../../../components/style";
import StatusItems from "../../../components/status/StatusItems";
import {callApiSearchPost} from "../../../actions/SearchPostActions";
import {callApiGetProfile} from "../../../actions/GetProfileActions";
import {ChangePassword, GetProfileBQL, URL} from "../../../components/Api";



class Nha extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataItem :[],
            refresh : false,
            isLoading: true,
            page_index: 1,
            Profile: [],

        }
    }

    componentWillMount() {
        this.fetchData()
        const { InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }

        // console.log('userbql', UserBQL.payload[0].UserID)
        // const { callApiGetProfile } = this.props;
        // callApiGetProfile(UserBQL.payload[0].ProfileID, UserBQL.payload[0].UserID, UserBQL.payload[0].Type).then(dataNha => {
        //     // dataNhaBQL = JSON.parse(dataNha);
        //     // console.log('data', dataNhaBQL)
        // })
        fetch( URL + GetProfileBQL,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                profile_id: InfoUser[0].ProfileID,
                user_id: InfoUser[0].UserID,
                user_type: InfoUser[0].Type,
                option: 101,
                lang_name: "vi_VN"
            })
        })
            .then((response) => response.json())
            .then((dataRes)=> {
                dataNhaBQL = JSON.parse(dataRes);
                dataNhaBQL = dataNhaBQL.Value;
                // console.log('data profle', dataNhaBQL)
                this.setState ({
                    Profile: dataNhaBQL
                })

            }).catch((erro)=> {
            console.log('erro',erro);
        })
    }
    //lay du lieu api
    fetchData = () => {
        const { InfoUser, callApiSearchPost } = this.props
        if (InfoUser.length <= 0) {
            return null;
        }
        callApiSearchPost(this.state.page_index, InfoUser[0].KDTID,InfoUser[0].UserID).then(dataRes => {
            dataBaiViet = JSON.parse(dataRes);
            dataBaiViet = dataBaiViet.Value
            // console.log('bai viet sanh chinh', dataBaiViet)
            if (dataBaiViet.length <=0){
                return null
            }
            this.setState({
                isLoading: false,
                //save data
                dataItem: this.state.page_index === 1 ? [...dataBaiViet] : [...this.state.dataItem,...dataBaiViet]
            })
        })
    }
    // handle event when loadmore
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
        let InfoProfile = this.state.Profile
        // console.log('profile1', InfoProfile)
        if(InfoProfile.length<=0){
            return null
        }
        //ActivityIndicator
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1,justifyContent:'center', alignItems: 'center', backgroundColor: '#718792'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        const {navigation} = this.props;
        return (

            <ScrollView style = {stylesContainer.container}>
                <View style = {{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <View style = {styles.circle}>
                        <Text>Avatar</Text>
                    </View>
                    <Text style = {{marginTop:20, fontSize: 20}}>{InfoProfile[0].FullName}</Text>
                </View>

                <TouchableOpacity style = {styles.Touch}>
                    <Text style = {{color: 'white'}}>
                        Nhật ký
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate('ThongTinCaNhanBQL')}>
                    <View style = {{flexDirection: 'column', marginLeft: 40,
                        backgroundColor:"#42A5F5",width:200,height:100, borderWidth:1,marginTop:8,
                        justifyContent:'center'
                    }}>

                        <Text style ={{marginLeft:10, color:'white'}}>Thông tin cá nhân</Text>
                        <View style = {{flexDirection:'row', marginLeft:10,}}>
                            <Text style = {{color: 'white', fontSize:15}}>Tên:  </Text>
                            <Text style = {{color: 'white',fontSize:15}}>{InfoProfile[0].FullName}</Text>
                        </View>
                        <View style = {{flexDirection:'row', marginLeft:10, }}>
                            <Text style = {{color: 'white',fontSize:15}}>Số điện thoại: </Text>
                            <Text style = {{color: 'white',fontSize:15}}>{InfoProfile[0].Phone}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
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
                            <StatusItems
                                dataItem={item}
                                navigation={navigation}/>
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
        InfoUser: state.GetProfileReducers,
        // infoBQL: state.GetProfileReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiGetProfile: bindActionCreators(callApiGetProfile, dispatch),
        callApiSearchPost: bindActionCreators(callApiSearchPost, dispatch),
    }
};

Nha = connect(mapStateToProps, mapDispatchToProps)(Nha);
export default Nha;
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
