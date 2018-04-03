/**
 * Created by lilu on 2018/3/21.
 */
import React, {Component} from 'react'
import {StyleSheet, AsyncStorage, Image, BackHandler, ToastAndroid} from 'react-native'
import {Actions, Scene, Modal, Router, Stack} from 'react-native-router-flux'
import {SECONDARY_COLOR} from '../util/globalStyle'
import Home from '../component/home'
import Login from '../component/login'

const TabbarIcon = ({ title, focused }) => {
  let image;
  
  switch (title) {
    case '星球':
      image = focused ? require('../asset/png/planet_selected.png') : require('../asset/png/planet_unselected.png');
      break;
    
    case '我的':
      image = focused ? require('../asset/png/mine_selected.png') : require('../asset/png/mine_unselected.png');
      break;
  }
  
  return ( <Image style={styles.iconStyle} source={image} /> );
}

class Scenes extends Component {
  constructor(props) {
    super(props)
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',this.onBackAndroid);
  }
  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.onBackAndroid);
  }
  
  onBackAndroid = () => {
    if (Actions.state.index == 0) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp()
        return false
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
    Actions.pop()
    return true
  }
  
  render() {
    return (
      <Router backAndroidHandler={this.onBackAndroid} sceneStyle={styles.sceneStyle}>
        <Stack key="root">
          <Scene key="HOME" tabs tabBarStyle={styles.tabBarStyle} activeTintColor='#7AEBE9' inactiveTintColor="#888"
                 tabBarPosition="bottom" initial={true}>
            <Scene key="HOME_INDEX" title="星球" icon={TabbarIcon} hideNavBar component={Home} />
            <Scene key="MINE" title="我的" icon={TabbarIcon} hideNavBar component={Login} />
          </Scene>
          <Scene key="login" title="登录" component={Login} navBarButtonColor={SECONDARY_COLOR} navigationBarStyle={styles.navBarStyle}/>
        </Stack>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#000',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  sceneStyle: {
    flex: 1,
    backgroundColor: '#000',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  },
  navBarStyle: {
    backgroundColor: '#000'
  },
})

export default Scenes