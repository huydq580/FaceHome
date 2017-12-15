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
import DangNhap from './src/containers/DangNhap'
import NhapThongTinChiTiet from './src/containers/cudan/NhapThongTinChiTiet'
import DangKi from './src/containers/DangKi'
import Stack from './src/router/banquanli/NavigationBanQuanLy'


export default class App extends Component<{}> {
  render() {
    return (
      <Stack/>
    );
  }
}

