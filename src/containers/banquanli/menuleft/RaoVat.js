import React, {Component} from 'react';
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

class RaoVat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: true,
            SearchItem: '',
            dataCuDan: '',
            text: '',
            dataItem: [],
            dataSearchRaoVat: []

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

    componentWillMount() {
        const {callApiGetCategory} = this.props;
        callApiGetCategory().then(dataRes => {
            dataCategory = JSON.parse(dataRes)
            dataCategory = dataCategory.Value
            console.log('data', dataCategory)
            this.setState({
                dataItem: dataCategory
            })
        })
    }

    Search = () => {
        this.setState({
            search: false
        })
    }
    Cancel = () => {
        this.setState({
            search: true
        })
    }

    SearchRaoVat(text) {
        const { callApiSearchRaoVat } = this.props
        callApiSearchRaoVat(this.state.text).then(dataRes => {
            // console.log('search', dataRes)
            dataRaoVat = JSON.parse(dataRes)
            dataRaoVat = dataRaoVat.Value
            this.setState({
                dataSearchRaoVat : dataRaoVat,
                text: text
            })
        })
    }

    render() {
        return (
            <View style={stylesContainer.container}>
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
                                           onChangeText={(text) => this.SearchRaoVat(text)}/>
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
                            <View style={{height: 1, backgroundColor: "#BDBDBD", marginTop: 5}}/>
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