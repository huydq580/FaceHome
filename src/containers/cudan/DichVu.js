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


import Modal from 'react-native-modalbox';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/dist/EvilIcons'
import ShowModal from "../../components/modal/ShowModal";
import stylesContainer from "../../components/style";
import images from "../../components/images";

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class DichVu extends Component {


    constructor(props) {
        super(props);

        this.state = {
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
                    content: 'Ban quản lý cung cấp dịch vụ trông giữ ô tô xe máy theo đơn giá xe máy 100K/\n' +
                    'tháng. Ô tô 1.5M/tháng'
                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Nguyễn Văn Hiệu',
                    chucvu: 'Ban Quản Lý',
                    tendichvu: 'Dịch vụ giữ xe ô tô, xe máy',
                    content: 'Ban quản lý cung cấp dịch vụ trông giữ ô tô xe máy theo đơn giá xe máy 100K/\n' +
                    'tháng. Ô tô 1.5M/tháng'
                },
                {
                    avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44Xb-IAuYoK4nU0ua0HzmUXlwjS8cmVbMR5IkrmM7EZR44jRhw",
                    name: 'Nguyễn Văn Hiệu',
                    chucvu: 'Ban Quản Lý',
                    tendichvu: 'Dịch vụ giữ xe ô tô, xe máy',
                    content: 'Ban quản lý cung cấp dịch vụ trông giữ ô tô xe máy theo đơn giá xe máy 100K/\n' +
                    'tháng. Ô tô 1.5M/tháng'
                }
            ]


        }
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
                <View style={{height: 30, alignItems: 'center', flexDirection:'row'}}>
                    <Image
                        source={
                            item.icon
                        }
                        style={styles.icondichvu}
                        resizeMode="cover">
                    </Image>
                    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'black'}}>{item.dichvu}</Text>
                    </View>

                </View>
                <View style = {{height:1, backgroundColor: '#4FC3F7'}}/>
            </TouchableOpacity>
        );
    }

    render() {

        return (
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
                <View>
                    <FlatList
                        data={this.state.ArrDichVu}
                        renderItem={this._renderItem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>


        )
    }
}
const styles = StyleSheet.create({
    icondichvu: {
        marginLeft: 10,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent:'center'
    },




})
