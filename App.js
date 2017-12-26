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




export default class App extends Component<{}> {
  render() {
    return (
      <Stack/>
    );
  }
}

