import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import stylesContainer from "../../components/style";
import StatusItems from "../../components/StatusItems";
import { callApiNhaCuDan } from "../../actions/actionsCuDan/NhaCuDanActions";

class SanhChinh extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataBanTin: [''],
            dataBaiDang: [''],
            dataItem :
                [
                    {
                        "status": "Một con vit xòe ra 2 cái cánh",
                        "like": "11",
                        'comment': '30',
                    },
                    {
                        "status": "Bà ơi bà cháu yêu bà lắm, tóc bà trắng màu trắng màu trắng như mây, cháu yêu bà cháu nắm bàn tay.",
                        "like": "55",
                        'comment': '20',
                    },
                    {
                        "status": "wtf",
                        "like": "66",
                        'comment': '10',
                    },

                ],
        }
    }
    componentWillMount() {
        const { UserCuDan } = this.props;
        if (UserCuDan.length <= 0) {
            return null;
        }

        // console.log('userbql', UserCuDan.payload)
        const {callApiNhaCuDan} = this.props;
        callApiNhaCuDan(UserCuDan.payload[0].ProfileID, UserCuDan.payload[0].UserID, UserCuDan.payload[0].Type).then(dataNha => {
            dataNhaCuDan = JSON.parse(dataNha);
            console.log('data1', dataNhaCuDan)
        })
    }
    render(){
        return(
            <ScrollView style = {stylesContainer.container}>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('SoanTin')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>
                <FlatList
                    data = {this.state.dataItem}
                    renderItem={(item) => {
                        return (
                            <StatusItems
                                dataItem={item}/>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        UserCuDan: state.LoginReducers,
        infoCuDan: state.NhaCuDanReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiNhaCuDan: bindActionCreators(callApiNhaCuDan, dispatch)
    }
};

SanhChinh = connect(mapStateToProps, mapDispatchToProps)(SanhChinh);
export default SanhChinh;