import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Feather';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {CallApiSearchFaceHome} from "../../actions/cudan/SearchFaceHomeActions";
import SearchDanCuItem from "../../components/searchfacehome/SearchDanCuItem";
import DichVuItem from "../../components/dichvu/DichVuItem";
import StatusItemCuDan from "../../components/status/StatusItemCuDan";
import SearchBaiVietItem from "../../components/searchfacehome/SearchBaiVietItem";
import KDTItem from "../../components/KDTItem";
import SearchDichVuItem from "../../components/searchfacehome/SearchDichVuItem";

class SearchFaceHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: "",
            TimKiem: "",
            ArrPost: "",
            ArrKDT: "",
            ArrMember: "",
            ArrSale: "",
            ArrService: "",
            isShow: false,
        }
    }

    componentDidMount() {
        // this.SearchFaceHome()
    }

    SearchFaceHome = () => {
        const {CallApiSearchFaceHome, InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        let dataLtProfile = InfoUser[0].LtProfile ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile) : null;
        // console.log('dataProfile', dataProfile)
        // console.log('infoUser', InfoUser)
        CallApiSearchFaceHome(this.state.TimKiem, dataProfile[0].KDTID).then(dataRes => {
            dataSearchFaceHome = JSON.parse(dataRes.Value)
            console.log("dataSearchFaceHome", dataSearchFaceHome)
            this.setState({
                ArrPost: dataSearchFaceHome.Post.length ? dataSearchFaceHome.Post : null,
                ArrMember: dataSearchFaceHome.Member.length ? dataSearchFaceHome.Member : null,
                ArrKDT: dataSearchFaceHome.KDT.length ? dataSearchFaceHome.KDT : null,
                ArrSale: dataSearchFaceHome.Sale.length ? dataSearchFaceHome.Sale : null,
                ArrService: dataSearchFaceHome.Service.length ? dataSearchFaceHome.Service : null,
            })

        })
    }

    render() {
        // console.log('this.state.ArryPost', this.state.ArrPost)
        // console.log('this.state.ArryMember', this.state.ArrMember)
        // console.log('this.state.ArryKDT', this.state.ArrKDT)
        // console.log('this.state.ArrySale', this.state.ArrSale)
        // console.log('this.state.ArryService', this.state.ArrService)
        const {navigation} = this.props
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', marginHorizontal: 20, alignItems: 'center'}}>
                    <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                         <Icon name="md-arrow-back" size={30} style={{marginLeft: 5}} color="black"/>
                    </TouchableOpacity>
                        <TextInput
                        style={{marginLeft: 15, flex: 1}}
                        placeholder='Tìm kiếm'
                        returnKeyType={"next"}
                        // underlineColorAndroid="transparent"
                        onChangeText={(TimKiem) => this.setState({TimKiem})}/>
                    {
                        this.state.TimKiem ?
                            <TouchableOpacity onPress={() => {
                                this.SearchFaceHome(),
                                    this.setState({
                                        isShow: true
                                    })
                            }
                            }>
                                <Icon1 name="search" size={30} style={{marginRight: 7}} color="black"/>
                            </TouchableOpacity> : null

                    }
                </View>

                {
                    this.state.isShow == true ?
                        <ScrollableTabView
                            style={styles.container}
                            // renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
                            // tabBarPosition='overlayTop'
                        >
                            <ScrollView tabLabel='Bài viết'>
                                {
                                    this.state.ArrPost ?
                                        <View style={{flex: 1}}>
                                            <FlatList
                                                data={this.state.ArrPost}
                                                renderItem={(item) => {
                                                    return (
                                                        <SearchBaiVietItem
                                                            dataItem={item}
                                                            navigation={navigation}
                                                        />
                                                    )
                                                }}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View> : <View style={{alignItems: 'center', marginTop: 10}}>
                                            <Text>Không có dữ liệu hiển thị</Text>
                                        </View>
                                }
                            </ScrollView>
                            <ScrollView tabLabel='Đô thị'>
                                {
                                    this.state.ArrKDT ?
                                        <View style={{flex: 1}}>
                                            <FlatList
                                                data={this.state.ArrKDT}
                                                renderItem={(item) => {
                                                    return (
                                                        <KDTItem
                                                            dataItem={item}
                                                            navigation={navigation}
                                                            fromSearch = {true}
                                                        />
                                                    )
                                                }}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View> : <View style={{alignItems: 'center', marginTop: 10}}>
                                            <Text>Không có dữ liệu hiển thị</Text>
                                        </View>
                                }
                            </ScrollView>
                            <ScrollView tabLabel='Dân cư'>
                                {
                                    this.state.ArrMember ?
                                        <View style={{flex: 1}}>
                                            <FlatList
                                                data={this.state.ArrMember}
                                                renderItem={(item) => {
                                                    return (
                                                        <SearchDanCuItem
                                                            dataItem={item}
                                                            navigation={navigation}
                                                        />
                                                    )
                                                }}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View> : <View style={{alignItems: 'center', marginTop: 10}}>
                                            <Text>Không có dữ liệu hiển thị</Text>
                                        </View>
                                }
                            </ScrollView>
                            <ScrollView tabLabel='Dịch vụ'>
                                {
                                    this.state.ArrService ?
                                        <View style={{flex: 1, backgroundColor: 'white'}}>
                                            <FlatList
                                                data={this.state.ArrService}
                                                renderItem={(item) => {
                                                    return (
                                                        <SearchDichVuItem
                                                            dataItem={item}
                                                            navigation={navigation}
                                                        />
                                                    )
                                                }}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View> : <View style={{alignItems: 'center', marginTop: 10}}>
                                            <Text>Không có dữ liệu hiển thị</Text>
                                        </View>
                                }
                            </ScrollView>
                            <ScrollView tabLabel='Rao vặt'>
                                <View style={{alignItems: 'center', marginTop: 10}}>
                                    <Text>Không có dữ liệu hiển thị</Text>
                                </View>
                            </ScrollView>
                        </ScrollableTabView> : null
                }
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
        CallApiSearchFaceHome: bindActionCreators(CallApiSearchFaceHome, dispatch),
    }
};

SearchFaceHome = connect(mapStateToProps, mapDispatchToProps)(SearchFaceHome);
export default SearchFaceHome

const styles = StyleSheet.create({
    container: {},
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});