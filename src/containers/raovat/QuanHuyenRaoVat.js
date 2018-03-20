import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import stylesContainer from "../../components/style";
import Dimensions from 'Dimensions';

class QuanHuyenRaoVat extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataItemHuyen: [],
        }
    }
    componentWillMount(){
        const { params } = this.props.navigation.state
        this.setState({
            dataItemHuyen: params.dataQuan
        })
    }
    TiepTucRaoVat =(tenVung, maVung)=> {
        const { params } = this.props.navigation.state
        // console.log('tinh', params)
        this.props.navigation.navigate('HinhAnhRaoVat',
            {
                danhMuc:params.danhMuc,
                name: params.name,
                Tinh: params.Tinh,
                tenVung: tenVung,
                maVung: maVung
            })
    }
    render (){
        return (
            <View style={[stylesContainer.container, {justifyContent: 'space-between'}]}>
                <FlatList
                    style = {{marginTop:10}}
                    data = {this.state.dataItemHuyen}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress = {()=> this.TiepTucRaoVat(item.TenVung, item.MaVung)}>
                                <View style = {{flexDirection:'column', marginTop: 12, flex:1, marginLeft: 5}}>
                                    <Text style = {{ fontSize:16}}>{item.TenVung}</Text>
                                    <View style = {{height:1, backgroundColor:"#BDBDBD", marginTop:12}}/>
                                </View>
                            </TouchableOpacity>

                        )}
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
export default QuanHuyenRaoVat
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