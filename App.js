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
  View
} from 'react-native';
import { Provider } from 'react-redux'
import store from './src/store'
import Stack from './src/router/Navigation'
import LoadData from "./src/components/LoadData";
import SanhChinh from "./src/containers/banquanli/SanhChinh";
import SoanTin from "./src/containers/banquanli/SoanTin";
import ThongTinKhuDoThi from "./src/containers/banquanli/menuleft/ThongTinKhuDoThi";
import BanQuanLy from "./src/containers/banquanli/menuleft/BanQuanLy";
import QuanLyCuDan from "./src/containers/banquanli/QuanLyCuDan";
import SuCoItem from "./src/components/baocaosuco/SuCoItemCuDan";
import SuCoItemBQL from "./src/components/baocaosuco/SuCoItemBQL";




export default class App extends Component<{}> {

  render() {
    return (
        <Provider store={store}>
          <Stack/>
        </Provider>
    );
  }
}

