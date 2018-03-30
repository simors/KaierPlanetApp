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
  StatusBar,
} from 'react-native';
import Router from './app/scene/scene'
import LY from 'lvyii_storage'
import {store, persistor} from './app/store/persistStore'
import {Provider, connect} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const configDev = {
  appId: 'BtayVajHGy5dnmykZK4JRtV0',
  appKey: 'vVSHw5yXxSQSHt95a3WVdNt4Rs6MYCkH',
  serverURLs: {
    engine: 'https://kaiercloud-dev.xiaojee.cn',
    auth: 'https://kaierbase-dev.xiaojee.cn',
    api: 'https://kaierbase-dev.xiaojee.cn'
  },
}

LY.init(configDev)
const RouterWithRedux = connect()(Router)

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    if (Platform.OS == 'android') {
      StatusBar.setTranslucent(true)
      StatusBar.setBackgroundColor('transparent', true)
    }
    StatusBar.setBarStyle('light-content', true)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <RouterWithRedux store={store} sceneStyle={getSceneStyle}/>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#000',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  }
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64
    style.marginBottom = computedProps.hideTabBar ? 0 : 50
  }
  return style
}
