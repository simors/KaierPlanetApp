/**
 * Created by lilu on 2018/3/21.
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {authAction} from '../../util/auth'
import {PRIMARY_COLOR} from '../../util/globalStyle'
import SmsCodeInput from '../common/SmsCodeInput'
import CommonButton from '../common/CommonButton'
import CommonTextInput from '../common/CommonTextInput'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: "",
      smsCode: "",
    }
  }
  
  userLogin = () => {
    this.props.loginWithPhoneNumber({
      phoneNumber: this.state.phone,
      smsCode: this.state.smsCode
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.subTitleText}>基于区块链的价值共享平台</Text>
        </View>
        <View style={styles.inputView}>
          <CommonTextInput keyboardType="phone-pad"
                           placeholder="输入手机号"
                           maxLength={11}
                           onChangeText={(text) => {this.setState({phone: text})}}
          />
          <SmsCodeInput style={{marginTop: 24}} phoneNumber={this.state.phone} onChangeText={(text) => {this.setState({smsCode: text})}}/>
        </View>
        <View style={styles.loginBtnView}>
          <CommonButton title="开启凯尔星球之旅" onPress={this.userLogin}/>
        </View>
      </View>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = {
  ...authAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subTitleText: {
    fontSize: 17,
    color: PRIMARY_COLOR,
    letterSpacing: 3.5,
  },
  inputView: {
    paddingLeft: 17,
    paddingRight: 17,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnView: {
    paddingLeft: 17,
    paddingRight: 17,
    marginTop: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
