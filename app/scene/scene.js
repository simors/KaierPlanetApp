/**
 * Created by lilu on 2018/3/21.
 */
import React, {Component} from 'react'
import {StyleSheet, AsyncStorage, Image, BackHandler, ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import {Actions, Scene, Modal, Router, Stack} from 'react-native-router-flux'
import {SECONDARY_COLOR} from '../util/globalStyle'
import {authSelector} from '../util/auth'
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
  
  isUserLogout = () => {
    let {token} = this.props
    if (token) {
      return false
    }
    return true
  }
  
  jumpToLogin = () => {
    Actions.LOGIN_NONAV()
  }
  
  render() {
    return (
      <Router backAndroidHandler={this.onBackAndroid} sceneStyle={styles.sceneStyle}>
        <Stack key="root">
          <Scene key="HOME" tabs tabBarStyle={styles.tabBarStyle} activeTintColor={SECONDARY_COLOR} inactiveTintColor="#888"
                 tabBarPosition="bottom" initial={true}>
            <Scene key="HOME_INDEX" title="星球" icon={TabbarIcon} hideNavBar component={Home} onEnter={this.isUserLogout} success={this.jumpToLogin}/>
            <Scene key="MINE" title="我的" icon={TabbarIcon} hideNavBar component={Login} onEnter={this.isUserLogout} success={this.jumpToLogin}/>
          </Scene>
          <Scene key="LOGIN" title="登录" component={Login} navBarButtonColor='#fff' navigationBarStyle={styles.navBarStyle}/>
          <Scene key="LOGIN_NONAV" title="登录" hideNavBar component={Login}/>
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

const mapStateToProps = (state, ownProps) => {
  return {
    token: authSelector.selectLoginUserToken(state)
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Scenes);