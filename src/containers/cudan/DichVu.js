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
    FlatList, AsyncStorage
} from 'react-native';


import Modal from 'react-native-modalbox';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import ShowModal from "../../components/modal/ShowModal";
import stylesContainer from "../../components/style";
import images from "../../components/images";
import DichVuItem from "../../components/dichvu/DichVuItem";
import {BACKGROUND_HEADER, TITLE_HEADER} from "../../Constants";
import ChuaDangNhapKDT from "../../components/home/ChuaDangNhapKDT";
import ChuaDangNhapItem from "../../components/chuadangnhap/ChuaDangNhapItem";

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class DichVu extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Dịch vụ',
            headerStyle: {backgroundColor: BACKGROUND_HEADER},
            headerTitleStyle: {color: TITLE_HEADER},
            headerTintColor: TITLE_HEADER,

        }
    }

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            isDisabled: false,
            isLoading: false,
            itemSelected: 1,
            isShow: false,
            ArrDichVu: [
                {
                    key: 1,
                    value: 1,
                    icon: images.tatcadichvu,
                    dichvu: "Tất cả dịch vụ"
                },
                {
                    key: 2,
                    value: 2,
                    icon: images.tatcadichvu,
                    dichvu: "Dịch vụ tòa nhà"
                },
                {
                    key: 3,
                    value: 3,
                    icon: images.tatcadichvu,
                    dichvu: "Dịch vụ xung quanh khu đô thị"
                }
            ],
            ArrAll: [
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Nguyễn Văn Hiệu',
                    chucvu: 'Ban Quản Lý',
                    tendichvu: 'Dịch vụ giữ xe ô tô, xe máy',
                    content: 'Ban quản lý cung cấp dịch vụ trông giữ ô tô xe máy theo đơn giá xe máy 100K tháng. Ô tô 1.5M/tháng',
                    sdt: "0963250395"
                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Nguyễn Văn Hiệu',
                    chucvu: 'Ban Quản Lý',
                    tendichvu: 'Dịch vụ vệ sinh gia đình',
                    content: 'Ban quản lý cung cấp dịch vụ lau dọn vệ sinh căn hộ',
                    sdt: "0963250395"
                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Vũ Mạnh Cường',
                    chucvu: 'Nhà cung cấp',
                    tendichvu: 'Dịch vụ trông trẻ, giúp việc nhà',
                    content: 'Bác Son 50 tuổi nhận trông giữ trẻ chuyển nghiệp, cung cấp dịch vụ giúp việc gia đình uy tín',
                    sdt: "0963250395"
                }
            ]


        }
    }

    componentDidMount() {
        AsyncStorage.getItem('UserID').then((value) => {
            this.setState({
                value: value
            })
        })
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{backgroundColor: this.state.itemSelected === item.key ? '#FFCC80' : 'white'}}
                onPress={() => {
                    this.setState({itemSelected: item.key}, () => {
                        console.log('itemselected', this.state.itemSelected)
                    })
                }}

            >
                <View style={{height: 30, alignItems: 'center', flexDirection: 'row'}}>
                    <Image
                        source={
                            item.icon
                        }
                        style={styles.icondichvu}
                        resizeMode="cover">
                    </Image>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'black'}}>{item.dichvu}</Text>
                    </View>

                </View>
                <View style={{height: 1, backgroundColor: '#4FC3F7'}}/>
            </TouchableOpacity>
        );
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                {
                    !this.state.value ?
                        <ChuaDangNhapItem
                            navigation={navigation}
                        /> : <ScrollView style={stylesContainer.container}>
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
                                data={this.state.ArrDichVu}
                                renderItem={this._renderItem}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <FlatList
                                data={this.state.ArrAll}
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

                        </ScrollView>

                }
            </View>

        )
    }
}
const styles = StyleSheet.create({
    icondichvu: {
        marginLeft: 10,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notification: {
        width: 100,
        height: 100,
    },
    viewDangNhap: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#01579B',
        marginHorizontal: 40,
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#01579B'
    },
    textDangNhap: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }


})
