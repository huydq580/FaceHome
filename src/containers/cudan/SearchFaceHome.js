import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/EvilIcons';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {CallApiSearchFaceHome} from "../../actions/cudan/SearchFaceHomeActions";
import SearchDanCuItem from "../../components/searchfacehome/SearchDanCuItem";
import DichVuItem from "../../components/dichvu/DichVuItem";

class SearchFaceHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataProfile: "",
            TimKiem: "",
            ArrPost: "",
            ArrKDT: "",
            ArrMember: "",
            ArrSale: "",
            ArrService: "",
        }
    }
    componentDidMount () {
        this.SearchFaceHome()
    }
    SearchFaceHome = () => {
        const { CallApiSearchFaceHome, InfoUser } = this.props
        if (InfoUser.length <=0 ){
            return null
        }
        let dataLtProfile = InfoUser[0].LtProfile ? InfoUser[0].LtProfile : null
        dataProfile = dataLtProfile ? JSON.parse(dataLtProfile): null;
        // console.log('dataProfile', dataProfile)
        // console.log('infoUser', InfoUser)
        CallApiSearchFaceHome("h",dataProfile[0].KDTID ).then(dataRes => {
            dataSearchFaceHome = JSON.parse(dataRes.Value)
            console.log("dataSearchFaceHome", dataSearchFaceHome)
            this.setState({
                ArrPost: dataSearchFaceHome.Post,
                ArrMember: dataSearchFaceHome.Member,
                ArrKDT: dataSearchFaceHome.KDT,
                ArrSale: dataSearchFaceHome.Sale,
                ArrService: dataSearchFaceHome.Service,
            })

        })
    }
    render () {
        console.log('this.state.Arry', this.state.ArrMember)
        const { navigation} = this.props
        return (
            <View style = {{flex:1, backgroundColor:'white'}}>
                <View style={{flexDirection: 'row', marginHorizontal: 20, alignItems: 'center'}}>
                    <TouchableOpacity onPress = {this.SearchFaceHome}>
                    <Icon name="search" size={30} style={{marginLeft: 7}} color="black"/>
                    </TouchableOpacity>
                    <TextInput
                        style={{marginLeft: 5, flex: 1}}
                        placeholder='Tìm kiếm'
                        returnKeyType={"next"}
                        // underlineColorAndroid="transparent"
                        onChangeText={(TimKiem) => this.setState({TimKiem})}/>
                </View>
            <ScrollableTabView
                style={styles.container}
                // renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
                // tabBarPosition='overlayTop'
            >
                <ScrollView tabLabel='Bài viết'>
                    <Text>content</Text>
                </ScrollView>
                <ScrollView tabLabel='Đô thị'>
                    <Text>content</Text>
                </ScrollView>
                <ScrollView tabLabel='Dân cư'>
                    <View style = {{flex:1}}>
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
                    </View>
                </ScrollView>
                <ScrollView tabLabel='Dịch vụ'>
                    <View style = {{flex:1, backgroundColor:'white'}}>
                    <FlatList
                        data={this.state.ArrService}
                        renderItem={(item) => {
                            return (
                                <DichVuItem
                                    dataItem={item}
                                    navigation={navigation}
                                />
                            )
                        }}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                </ScrollView>
                <ScrollView tabLabel='Rao vặt'>
                    <Text>content</Text>
                </ScrollView>
            </ScrollableTabView>
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
    container: {
        marginTop: 10,
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});