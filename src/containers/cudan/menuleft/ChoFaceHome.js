import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    WebView,
    ActivityIndicator,
    TextInput,
    FlatList
} from 'react-native';


import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import Icon1 from 'react-native-vector-icons/dist/FontAwesome'
import stylesContainer from "../../../components/style";
import images from "../../../components/images";
import DichVuItem from "../../../components/dichvu/DichVuItem";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../../Constants";
import ChoFaceHomeItem from "../../../components/chofacehome/ChoFaceHomeItem";
import {callApiGetCategory} from "../../../actions/raovat/GetCategoryActions";
import {bindActionCreators} from "redux";
import {callApiSearchRaoVat} from "../../../actions/raovat/SearchRaoVatActions";
import {connect} from "react-redux";

const DEVICE_WIDTH = Dimensions.get('window').width;

class ChoFaceHome extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Chợ FaceHome',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }

    constructor(props) {
        super(props);

        this.state = {
            itemSelected: 7,
            ArrCategory: [],
            ArrAll: [
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Nguyễn Văn Hiệu',
                    time: '04/04/18 9h00',
                    content: 'Cửa hàng Bác Tôm chuyên cung cấp rau sạch, thịt sạch',
                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Nguyễn Văn Hiệu',
                    time: '04/04/18 9h00',
                    content: 'Cửa hàng Bác Tôm chuyên cung cấp rau sạch, thịt sạch',
                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Vũ Mạnh Cường',
                    time: '04/04/18 9h00',
                    content: 'Cửa hàng Bác Tôm chuyên cung cấp rau sạch, thịt sạch',

                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Vũ Mạnh Cường',
                    time: '04/04/18 9h00',
                    content: 'Cửa hàng Bác Tôm chuyên cung cấp rau sạch, thịt sạch',

                }, {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Vũ Mạnh Cường',
                    time: '04/04/18 9h00',
                    content: 'Cửa hàng Bác Tôm chuyên cung cấp rau sạch, thịt sạch',

                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Vũ Mạnh Cường',
                    time: '04/04/18 9h00',
                    content: 'Cửa hàng Bác Tôm chuyên cung cấp rau sạch, thịt sạch',

                }
            ]


        }
    }
    componentWillMount() {
        this.GetCategory()

    }
    GetCategory = () => {
        const {callApiGetCategory} = this.props;
        callApiGetCategory().then(dataRes => {
            dataCategory = JSON.parse(dataRes)
            dataCategory = dataCategory.Value
            console.log('data', dataCategory)
            this.setState({
                ArrCategory: dataCategory
            })
        })
    }


    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{backgroundColor: this.state.itemSelected === item.CatID ? '#FFCC80' : 'white'}}
                onPress={() => {
                    this.setState({itemSelected: item.CatID}, () => {
                        console.log('itemselected', this.state.itemSelected)
                    })
                }}

            >
                <View style={{height: 30, alignItems: 'center', flexDirection:'row'}}>
                    <Image
                        source={{
                            uri: item.Icon
                        }}
                        style={styles.icondichvu}
                        resizeMode="cover">
                    </Image>
                    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'black'}}>{item.Name}</Text>
                    </View>

                </View>
                <View style = {{height:1, backgroundColor: '#4FC3F7'}}/>
            </TouchableOpacity>
        );
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style = {{flex:1}}>
            <ScrollView style={stylesContainer.container}>
                <View style={{flexDirection: 'row', marginHorizontal: 20, alignItems: 'center'}}>
                    <Icon name="search" size={30} style={{marginLeft: 7}} color="black"/>
                    <TextInput
                        style={{marginLeft: 5, flex: 1}}
                        placeholder='Tìm kiếm'
                        returnKeyType={"next"}
                        // underlineColorAndroid="transparent"
                        onChangeText={(TimKiem) => this.setState({TimKiem})}/>
                </View>
                <FlatList
                    data={this.state.ArrCategory}
                    renderItem={this._renderItem}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                />
                <FlatList
                    data={this.state.ArrAll}
                    renderItem={(item) => {
                        return (
                            <ChoFaceHomeItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                />

            </ScrollView>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: '#FFC107',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height: 70,
                        backgroundColor: '#FFCA28',
                        borderRadius: 100,
                    }}

                >
                    <Icon1 name="plus" size={30} color="#29B6F6"/>
                    <Text style = {{color: 'black', fontWeight:'bold', fontSize: 12}}>Đăng tin</Text>
                </TouchableOpacity>
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

ChoFaceHome = connect(mapStateToProps, mapDispatchToProps)(ChoFaceHome);
export default ChoFaceHome
const styles = StyleSheet.create({
    icondichvu: {
        marginLeft: 10,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent:'center'
    },




})
