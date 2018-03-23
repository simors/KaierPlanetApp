/**
 * Created by lilu on 2018/3/21.
 */
import React, {Component} from 'react'
import {StyleSheet, AsyncStorage, StatusBar, InteractionManager} from 'react-native'
import {Actions, Scene, Modal, Router, Stack} from 'react-native-router-flux'
import Home from '../component/home'
import Login from '../component/login'

const Scenes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home}/>
      <Scene key="login" component={Login}/>
    </Stack>
  </Router>
);

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
    height:49,
  },
});

export default Scenes