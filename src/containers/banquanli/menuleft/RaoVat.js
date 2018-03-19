import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity, StyleSheet, Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import stylesContainer from "../../../components/style";
import RaoVatItem from "../../../components/raovat/RaoVatItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiGetCategory} from "../../../actions/raovat/GetCategoryActions";

class RaoVat extends Component {
    constructor(props){
        super(props)
        this.state ={
            search: true,
            SearchItem:'',
            dataCuDan:'',
            text: '',
            dataItem: []

        }
    }
    //handle event header
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerRight: <TouchableOpacity style={{marginRight: 10}}
                                           onPress={() => params.handleSave()}>
                <Text style={{color: "#1565C0"}}>Đăng bài viết</Text>
            </TouchableOpacity>
        }
    }
    componentDidMount() {
        // call function SaveDetails
        this.props.navigation.setParams({handleSave: this.DangBaiViet.bind(this)});
    }
    DangBaiViet() {
        this.props.navigation.navigate('DanhMuc')

    }
    componentWillMount(){
        const { callApiGetCategory } = this.props;
        callApiGetCategory().then(dataRes => {
            dataCategory = JSON.parse(dataRes)
            dataCategory = dataCategory.Value
            console.log('data', dataCategory)
            this.setState({
                dataItem: dataCategory
            })
        })
    }
    Search = ()=> {
        this.setState({
            search: false
        })
    }
    Cancel = ()=> {
        this.setState({
            search: true
        })
    }
    SearchUser(text){
        // const data = this.dataSearchDanCu;
        // const inputSearch = data.filter(function(item){
        //     const itemData = item.FullName.toUpperCase()
        //     const textData = text.toUpperCase()
        //     return itemData.indexOf(textData) > -1
        // })
        // this.setState({
        //     dataCuDan: inputSearch,
        //     text: text
        // })
    }
    render (){
        return (
            <View style = {stylesContainer.container}>
                {
                    this.state.search ?
                        <TouchableOpacity onPress = {this.Search}>
                            <View style = {styles.containerNavbar}>
                                <Icon name="search" size={25} color="#616161"/>

                                <Text>Search</Text>

                            </View>
                        </TouchableOpacity> : <View style = {{ flexDirection:'row',marginTop:10}}>
                            <View style = {styles.containerNavbarS}>
                                <TextInput  placeholder = 'Search'
                                            underlineColorAndroid="transparent"
                                            onChangeText = {(text) => this.SearchUser(text)}/>
                            </View>
                            <TouchableOpacity onPress = {this.Cancel}>
                                <Text style = {{flex:2 , marginLeft:5, fontSize:17}}>cancel</Text>
                            </TouchableOpacity>
                        </View>
                }
                <FlatList
                    style = {{marginTop:10}}
                    data = {this.state.dataItem}
                    renderItem={(item) => {
                        return (
                            <RaoVatItem
                                dataItem={item}/>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                    numColumns={3}
                />

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
        callApiGetCategory: bindActionCreators(callApiGetCategory, dispatch)
    }
};

RaoVat = connect(mapStateToProps, mapDispatchToProps)(RaoVat);
export default RaoVat
const styles = StyleSheet.create({
    containerNavbar: {
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: '#9E9E9E',
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,


    },
    containerNavbarS: {
        borderWidth: 1,
        marginLeft: 10,
        borderRadius: 10,
        borderColor: '#9E9E9E',
        maxHeight: 40,
        flex: 7,
    },
})