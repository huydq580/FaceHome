import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import stylesContainer from "../../components/style";
import Dimensions from 'Dimensions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class DanhMuc extends Component {
    constructor (props){
        super(props)
        this.state = {
            dataItem: [],
        }
    }
    componentWillMount(){
        const { Category } = this.props;
        if (Category.length<=0){
            return null;
        }
        this.setState({
            dataItem: Category.payload
        })
    }
    TiepTucRaoVat =(danhmuc, name)=> {
        this.props.navigation.navigate('BanDangTin', {danhMuc: danhmuc, name: name})
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between', flex:1}]}>
                <FlatList
                    style = {{marginTop:10}}
                    data = {this.state.dataItem}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress = {() => this.TiepTucRaoVat(item.CatID, item.Name)}>
                                <View style = {{flexDirection:'row', marginTop: 6, flex:1}}>
                                    <Image style = {{flex:1, height:20, width:20, marginLeft: 8}}
                                           source={{
                                               uri: "http://www.bibun.vn/image/data/upload/product/1217/1217_img1.jpg"
                                           }}
                                           resizeMode="cover">

                                    </Image>
                                    {/*<Image style={styles.image_circle}*/}

                                           {/*source={{*/}
                                               {/*uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'*/}
                                           {/*}}*/}
                                           {/*resizeMode="cover"*/}
                                    {/*>*/}
                                    {/*</Image>*/}
                                    <View style = {{marginLeft: 15, marginTop:6, flex:8}}>
                                        <Text style = {{ fontSize:16}}>{item.Name}</Text>
                                        <View style = {{height:1, backgroundColor:"#BDBDBD", marginTop:12}}/>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                />
                {/*<View style = {styles.TiepTucView}>*/}
                    {/*<TouchableOpacity onPress = {this.TiepTucRaoVat}>*/}
                        {/*<Text style = {styles.TiepTucText}>TIẾP TỤC</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        Category: state.GetCategoryReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

DanhMuc = connect(mapStateToProps, mapDispatchToProps)(DanhMuc);
export default DanhMuc
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    TiepTucView: {
        height: DEVICE_HEIGHT/11,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF9800'

    },
    TiepTucText: {
        fontWeight:'bold',
        color: 'white'
    }
})