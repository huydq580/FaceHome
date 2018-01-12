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
import RootStack from './src/router/RootNavigator'
import LoadData from "./src/components/LoadData";
import SanhChinh from "./src/containers/banquanli/SanhChinhBQL";
import SoanTin from "./src/containers/banquanli/SoanTin";
import ThongTinKhuDoThi from "./src/containers/banquanli/menuleft/ThongTinKhuDoThi";
import BanQuanLy from "./src/containers/banquanli/menuleft/BanQuanLy";




export default class App extends Component<{}> {

  render() {
    return (
        <Provider store={store}>
          <RootStack/>
        </Provider>
    );
  }
}

