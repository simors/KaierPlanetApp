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
import Router from './app/scene/scene'
import LY from 'lvyii_storage'
import { store} from './app/store/persistStore'
import {Provider, connect} from 'react-redux'

const configDev = {
  appId: 'BtayVajHGy5dnmykZK4JRtV0',
  appKey: 'vVSHw5yXxSQSHt95a3WVdNt4Rs6MYCkH',
  serverURLs: {
    engine: 'https://kaiercloud-dev.xiaojee.cn',
    auth: 'https://kaierbase-dev.xiaojee.cn',
    api: 'https://kaierbase-dev.xiaojee.cn'
    // engine: 'https://kaiercloud-dev.xiaojee.cn',
    // auth: 'https://kaierbase-dev.xiaojee.cn',
    // api: 'https://kaierbase-dev.xiaojee.cn'
  },
}


LY.init(configDev)
const RouterWithRedux = connect()(Router)


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <RouterWithRedux store={store} sceneStyle={styles} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
