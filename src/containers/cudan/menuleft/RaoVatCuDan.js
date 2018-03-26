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
import ItemSearchRaoVat from "../../../components/raovat/ItemSearchRaoVat";
import {callApiSearchRaoVat} from "../../../actions/raovat/SearchRaoVatActions";

class RaoVatCuDan extends Component {
    constructor(props){
        super(props)
        this.state ={
            search: true,
            SearchItem:'',
            dataCuDan:'',
            text: '',
            dataItem: [],
            dataSearchRaoVat: [],
            isLoading:false


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
    debounce = (func, wait)=> {
        var context = this,
            args = arguments;
        var executeFunction = function() {
            func.apply(context, args);
            this.timeout = 0;
        };

        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(executeFunction, wait);
    }

    SearchRaoVat =(textSearch) => {
        this.setState({isLoading:true})
        if(textSearch === ""){
            this.setState({dataSearchRaoVat:[],isLoading:false})
            return;
        }
        const { callApiSearchRaoVat } = this.props
        callApiSearchRaoVat(textSearch).then(dataRes => {
            // console.log('search', dataRes)
            dataRaoVat = JSON.parse(dataRes)
            dataRaoVat = dataRaoVat.Value
            this.setState({
                dataSearchRaoVat : dataRaoVat,
                isLoading:false
            })
        })
    }

    render (){
        return (
            <View style = {stylesContainer.container}>
                {

                    this.state.search ?
                        <TouchableOpacity onPress={this.Search}>
                            <View style={styles.containerNavbar}>
                                <Icon name="search" size={25} color="#616161"/>

                                <Text>Search</Text>

                            </View>
                        </TouchableOpacity> : <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={styles.containerNavbarS}>
                                <TextInput placeholder='Search'
                                           underlineColorAndroid="transparent"
                                           onChangeText={(text)=>this.debounce(function(e){

                                               this.SearchRaoVat(text);
                                           }.bind(this), 1000)}/>
                            </View>
                            <TouchableOpacity onPress={this.Cancel}>
                                <Text style={{flex: 2, marginLeft: 5, fontSize: 17}}>cancel</Text>
                            </TouchableOpacity>
                        </View>
                }
                {
                    this.state.search ?
                        <FlatList
                            style={{marginTop: 10}}
                            data={this.state.dataItem}
                            renderItem={(item) => {
                                return (
                                    <RaoVatItem
                                        dataItem={item}/>
                                )
                            }
                            }
                            keyExtractor={(item, index) => index}
                            numColumns={3}

                        /> :
                        <View>
                            {/*<Text style={{marginTop: 10, height:20,textAlign:'center'}}>{this.state.dataSearchRaoVat.length == 0?"Dữ liệu rỗng":""}</Text>*/}
                            <FlatList
                                data={this.state.dataSearchRaoVat}
                                renderItem={(item) => {
                                    return (
                                        <ItemSearchRaoVat
                                            dataItem={item}/>
                                    )
                                }
                                }
                                keyExtractor={(item, index) => index}
                            />
                        </View>
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
        callApiGetCategory: bindActionCreators(callApiGetCategory, dispatch),
        callApiSearchRaoVat: bindActionCreators(callApiSearchRaoVat, dispatch),
    }
};

RaoVatCuDan = connect(mapStateToProps, mapDispatchToProps)(RaoVatCuDan);
export default RaoVatCuDan
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