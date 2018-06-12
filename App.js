/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    AsyncStorage,
    YellowBox,
    DeviceEventEmitter
} from 'react-native';


import { Provider } from 'react-redux'
import store from './src/store'
import Stack from './src/router/Navigation'

import SocketIOClient from "socket.io-client";
import ChuyenDiaDiem from "./src/containers/cudan/menuleft/ChuyenDiaDiem";
import TaiKhoanCuaBanCuDan from "./src/containers/cudan/menuleft/TaiKhoanCuaBanCuDan";
import GioiThieuKDT from "./src/containers/cudan/GioiThieuKDT";
import CapMaCanHo from "./src/containers/cudan/menuleft/CapMaCanHo";
import QuanLyCanHo from "./src/containers/cudan/menuleft/QuanLyCanHo";
import DangKyNhaCungCap from "./src/containers/cudan/menuleft/DangKyNhaCungCap";
import CuDanKhac from "./src/containers/cudan/menuleft/CuDanKhac";
import DichVu from "./src/containers/cudan/DichVu";
import SoanTinCuDan from "./src/containers/cudan/SoanTinCuDan";
import ChuaCoCanHo from "./src/containers/cudan/DaCoCanHo";
import SearchFaceHome from "./src/containers/cudan/SearchFaceHome";
import SearchDanCuItem from "./src/components/searchfacehome/SearchDanCuItem";
import ThamDoYKien from "./src/components/soanbaivietcudan/ThamDoYKien";

export default class App extends Component<{}> {
    // componentDidMount() {
    //     this.socket = SocketIOClient('http://222.252.16.186:9061/', { pingTimeout: 30000, pingInterval: 30000, transports: ['websocket'] });
    //     DeviceEventEmitter.addListener(
    //         'ON_HOME_BUTTON_PRESSED',
    //         () => {
    //             console.log('You tapped the home button!')
    //             let dataGroup = {
    //                 MsgGroupID: null,
    //                 UserID: "115CCFA3-E03D-4A9A-B8DB-F57A3A5D4F3C"
    //             }
    //             this.socket.emit("dis", dataGroup)
    //         })
    // }
    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: isMounted(...) is deprecated'
        ]);
    return (
        <Provider store={store}>
          <Stack/>
        </Provider>
    );
  }
}
