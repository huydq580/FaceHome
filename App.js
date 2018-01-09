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
import Stack from './src/router/Navigation'
import LoadData from "./src/components/LoadData";
import SanhChinh from "./src/containers/banquanli/SanhChinh";
import SoanTin from "./src/containers/banquanli/SoanTin";
import ThongTinKhuDoThi from "./src/containers/banquanli/menuleft/ThongTinKhuDoThi";
import BanQuanLy from "./src/containers/banquanli/menuleft/BanQuanLy";




export default class App extends Component<{}> {
  render() {
    return (
      <Stack/>
    );
  }
}

