/**
 * Created by lilu on 2018/3/21.
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'antd-mobile/lib/button'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {action} from '../../util/auth'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

 class Login extends Component {

  test = () => {
    this.props.testAction({
      onSuccess: ()=>{console.log('success===>')},
      onFailure: (error)=>{console.log('error===>',error)}
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          i m login
        </Text>
        <Button onClick={this.test} >testC</Button>
        <Button onClick={()=>{Actions.push('home')}} >toHome</Button>
      </View>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = {
  ...action


};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


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
