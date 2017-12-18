import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import NhapThongTinNCC from "../../containers/nhacungcap/NhapThongTinNCC";
import TrangChuNCC from "../../containers/nhacungcap/TrangChuNCC";

const StackNCC = StackNavigator ({
    NhapThongTinNCC : {
        screen : NhapThongTinNCC,
        navigationOptions: {
            header: null,
        }
    },
    TrangChuNCC: {
        screen: TrangChuNCC,
        navigationOptions:{
            header : null,
        }
    }

})
export default StackNCC;

