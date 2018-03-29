import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native'
import {bindActionCreators} from "redux";
import {callApiNhaCuDan} from "../../../actions/actionsCuDan/NhaCuDanActions";
import {connect} from "react-redux";
import {callApiSearchDanCu} from "../../../actions/actionsBQL/QLDanCuActions";
import CuDanItem from "../../../components/cudan/CuDanItem";
import ThanhVienCanHoItem from "../../../components/thanhviencanho/ThanhVienCanHoItem";

class ThanhVienCanHo extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataCuDan: [],
        }
    }
    componentWillMount () {
        this.SearchDanCu()

    }
    SearchDanCu = ()=>  {
        const {InfoUser, callApiSearchDanCu} = this.props;
        if (InfoUser.length <= 0) {
            return null;
        }
        callApiSearchDanCu(InfoUser[0].KDTID, InfoUser[0].BlockID, InfoUser[0].FloorID,255 ).then(dataSearchDanCu => {
            dataSearchDanCu = JSON.parse(dataSearchDanCu)
            dataSearchDanCu = dataSearchDanCu.Value
            this.dataSearchDanCu = dataSearchDanCu
            this.setState({
                dataCuDan: dataSearchDanCu
            })
            console.log('data cu dan', dataSearchDanCu)
        })
    }
    render () {
        const {navigation} = this.props;
        return (
            <View>
                <FlatList
                    data={this.state.dataCuDan}
                    renderItem={(item) => {
                        return (
                            <ThanhVienCanHoItem
                                dataItem={item}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.GetProfileReducers,
        infoCuDan: state.QLDanCuReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiSearchDanCu: bindActionCreators(callApiSearchDanCu, dispatch),
        callApiNhaCuDan: bindActionCreators(callApiNhaCuDan, dispatch),
    }
};

ThanhVienCanHo = connect(mapStateToProps, mapDispatchToProps)(ThanhVienCanHo);
export default ThanhVienCanHo