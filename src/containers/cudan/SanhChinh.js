import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import stylesContainer from "../../components/style";
import StatusItems from "../../components/status/StatusItems";
import { callApiNhaCuDan } from "../../actions/actionsCuDan/NhaCuDanActions";
import {callApiSearchPost} from "../../actions/SearchPostActions";

class SanhChinh extends Component {
    constructor(props){
        super(props)
        this.state = {
            // dataBanTin: [''],
            // dataBaiDang: [''],
            refresh : false,
            isLoading: true,
            page_index: 1,
            dataItem : [],
        }
    }
    componentWillMount() {
        const { UserCuDan } = this.props;
        if (UserCuDan.length <= 0) {
            return null;
        }

        // console.log('userbql', UserCuDan.payload)
        const {callApiNhaCuDan} = this.props;
        callApiNhaCuDan(UserCuDan.payload[0].ProfileID, UserCuDan.payload[0].UserID, UserCuDan.payload[0].Type).then(dataNha => {
            dataNhaCuDan = JSON.parse(dataNha);
            console.log('data1', dataNhaCuDan)

        })
        this.fetchData()
    }
    fetchData = () => {
        const { UserCuDan, callApiSearchPost } = this.props
        if (UserCuDan.length <= 0) {
            return null;
        }
        callApiSearchPost(this.state.page_index, UserCuDan.payload[0].KDTID,UserCuDan.payload[0].UserID).then(dataRes => {
            dataBaiViet = JSON.parse(dataRes);
            dataBaiViet = dataBaiViet.Value
            console.log('bai viet sanh chinh', dataBaiViet)
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
    //handle event when loadmore
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
    //activityIndicator when loadmore
    // renderFooter = () => {
    //     if (this.state.isLoading) return null;
    //
    //     return (
    //         <View style={{flex: 1,justifyContent:'center', alignItems: 'center', backgroundColor: '#718792'}}>
    //             <ActivityIndicator size="large" color="white"/>
    //         </View>
    //     );
    // };

    render(){
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1,justifyContent:'center', alignItems: 'center', backgroundColor: '#718792'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        const {navigation} = this.props;
        return(
            <View style = {stylesContainer.container}>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('SoanTinCuDan')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {()=>  {this.fetchData()}}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    // ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={this.renderFooter}

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
            </View>
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

SanhChinh = connect(mapStateToProps, mapDispatchToProps)(SanhChinh);
export default SanhChinh;