import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet,
    Picker,
    TextInput,
    TouchableOpacity, Alert
} from 'react-native';
import {callApiGetKDT} from "../../../actions/KDTActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import stylesContainer from "../../../components/style";
import {callApiChuyenDiaDiem} from "../../../actions/actionsCuDan/ChuyenDiaDiemActions";


class ChuyenCanHo extends Component{
    constructor(props){
        super(props)
        this.state = {
            ToaKDT: [],
            ToaNha:'',
            Tang: '',
            CanHo: ''
        }
    }
    componentWillMount() {
        const { callApiGetKDT, InfoUser } = this.props;
        if(InfoUser.length<=0){
            return null
        }
        callApiGetKDT(InfoUser[0].KDTID).then(dataRes => {
            console.log('toa trong kdt', dataRes)
            dataKDT = JSON.parse(dataRes);
            this.setState({
                ToaKDT: dataKDT.Value
            })
        })
    }
    ChuyenCanHo = ()=> {
        const { callApiChuyenDiaDiem, InfoUser } = this.props
        if(InfoUser.length<=0){
            return null
        }
        callApiChuyenDiaDiem(InfoUser[0].ProfileID, InfoUser[0].UserID, 1, InfoUser[0].KDTID, "", this.state.ToaNha, this.state.Tang, this.state.CanHo).then(dataRes => {
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
        // dataToa.unshift({Code: "", Ten:"Chọn Tòa/Nhà"});
        return (
            <View style = {stylesContainer.container}>
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
                <TouchableOpacity onPress = {() => this.ChuyenCanHo()}>
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

    }
};

ChuyenCanHo = connect(mapStateToProps, mapDispatchToProps)(ChuyenCanHo);
export default ChuyenCanHo
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 30,
        marginTop:20,
    },


})