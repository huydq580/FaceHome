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
import DangKi from './src/containers/cudan/DangKi'
import Stack from './src/router/cudan/NavigationCuDan'


export default class App extends Component<{}> {
  render() {
    return (
      <Stack/>
    );
  }
}

