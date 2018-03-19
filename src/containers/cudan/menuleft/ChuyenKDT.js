import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet,
    Picker,
    TextInput,
    TouchableOpacity, Alert
} from 'react-native';
import {callApiGetKDT, callApiSearchKDT} from "../../../actions/KDTActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import stylesContainer from "../../../components/style";
import {callApiChuyenDiaDiem} from "../../../actions/actionsCuDan/ChuyenDiaDiemActions";


class ChuyenKDT extends Component{
    constructor(props){
        super(props)
        this.state = {
            ToaKDT: [],
            SearchKDT: [],
            KDT:'',
            ToaNha:'',
            Tang: '',
            CanHo: ''
        }
    }
    componentWillMount() {
        const { callApiSearchKDT, InfoUser } = this.props;
        if(InfoUser.length<=0){
            return null
        }
        callApiSearchKDT("", "").then(dataRes=> {
            dataSearchKDT = JSON.parse(dataRes);
            this.setState({
                SearchKDT: dataSearchKDT.Value
            })
        })

    }
    callApiToa(kdtid){
        const { callApiGetKDT } = this.props
        callApiGetKDT(kdtid).then(dataRes => {
            console.log('toa trong kdt', dataRes)
            dataKDT = JSON.parse(dataRes);
            this.setState({
                ToaKDT: dataKDT.Value
            })
        })
    }
    ChuyenKDT = ()=> {
        const { callApiChuyenDiaDiem, InfoUser } = this.props
        if(InfoUser.length<=0){
            return null
        }
        callApiChuyenDiaDiem(InfoUser[0].ProfileID, InfoUser[0].UserID, 2, InfoUser[0].KDTID, this.state.KDT, this.state.ToaNha, this.state.Tang, this.state.CanHo).then(dataRes => {
            data = JSON.parse(dataRes);
            if(data.ErrorCode==="00") {
                Alert.alert(
                    'Alert',
                    "Chuyển địa điểm thành công",
                    [
                        {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                )
            }
            else {
                Alert.alert(
                    'Alert',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }
        })
    }
    render (){
        let dataToa = this.state.ToaKDT
        let SearchKDT = this.state.SearchKDT
        // dataToa.unshift({Code: "", Ten:"Chọn Tòa/Nhà"});
        return (
            <View style = {stylesContainer.container}>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.KDT}
                        onValueChange={(value) => {
                            this.setState({KDT: value})
                            this.callApiToa(value)
                        }}>
                        {SearchKDT.map((value)=><Picker.Item key ={value} label={value.TenKDT} value={value.KDTID}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <Picker
                        selectedValue={this.state.ToaNha}
                        onValueChange={(value) => this.setState({ToaNha: value})}>
                        {dataToa.map((value)=><Picker.Item key ={value} label={value.Ten} value={value.Code}/>)}
                    </Picker>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Tầng mới'
                               underlineColorAndroid="transparent"
                               onChangeText = {(Tang) => this.setState({Tang})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Tên căn hộ mới '
                               underlineColorAndroid="transparent"
                               onChangeText = {(CanHo) => this.setState({CanHo})}/>
                </View>
                <TouchableOpacity onPress = {() => this.ChuyenKDT()}>
                    <View style = {[styles.itemBoder, {alignItems:'center',minHeight:40, justifyContent: 'center', backgroundColor: '#2196F3'}]} >
                        <Text>Tiếp tục</Text>
                    </View>
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
        callApiGetKDT: bindActionCreators(callApiGetKDT, dispatch),
        callApiChuyenDiaDiem: bindActionCreators(callApiChuyenDiaDiem, dispatch),
        callApiSearchKDT: bindActionCreators(callApiSearchKDT, dispatch),

    }
};

ChuyenKDT = connect(mapStateToProps, mapDispatchToProps)(ChuyenKDT);
export default ChuyenKDT
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },


})