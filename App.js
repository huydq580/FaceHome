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
    DeviceEventEmitter
} from 'react-native';


import { Provider } from 'react-redux'
import store from './src/store'
import Stack from './src/router/Navigation'

import SocketIOClient from "socket.io-client";
import ChiTietSuCo from "./src/containers/banquanli/menuleft/ChiTietSuCo";




export default class App extends Component<{}> {
    componentDidMount() {
        this.socket = SocketIOClient('http://222.252.16.186:9061/', { pingTimeout: 30000, pingInterval: 30000, transports: ['websocket'] });
        DeviceEventEmitter.addListener(
            'ON_HOME_BUTTON_PRESSED',
            () => {
                console.log('You tapped the home button!')
                this.socket.emit("dis", 12)
            })
    }


    render() {
    return (
        <Provider store={store}>
          <Stack/>
        </Provider>
    );
  }
}
