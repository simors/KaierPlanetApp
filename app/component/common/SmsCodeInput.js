/**
 * Created by yangyang on 2018/3/31.
 */
import React, {PureComponent} from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native'
import {PRIMARY_COLOR} from '../../util/globalStyle'
import {connect} from 'react-redux'
import {action} from '../../util/auth'
import {Toast} from 'antd-mobile';

class SmsCodeInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {countDown: 0}
  }
  
  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }
  
  countDown = () => {
    this.interval = setInterval(()=> {
      this.setState({countDown: this.state.countDown - 1})
    }, 1000)
  }
  
  smsCodeInput = (text) => {
    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }
  }
  
  requestSmsCode = () => {
    let {phoneNumber} = this.props
    if (!phoneNumber || phoneNumber == '') {
      this.setState({countDown: 0})
      this.interval && clearInterval(this.interval)
      Toast.fail('未指定手机号')
      return
    }
    if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
      this.setState({countDown: 0})
      this.interval && clearInterval(this.interval)
      Toast.fail('手机号格式错误')
      return
    }
    this.props.requestSmsCode({phoneNumber})
  }
  
  getSmsAuthCode = () => {
    if (this.props.reset) {
      this.setState({countDown: 0})
    } else {
      this.setState({countDown: 60})
      this.countDown()
    }
    this.requestSmsCode()
  }
  
  renderCodeFetcher = () => {
    if (this.state.countDown) {
      return (
        <Text style={styles.btnText}>
          {this.state.countDown + 's后重新获取'}
        </Text>
      )
    } else {
      this.interval && clearInterval(this.interval)
      return (
        <Text style={styles.btnText}>
          获取验证码
        </Text>
      )
    }
  }
  
  renderGetSmsButton = () => {
    return (
      <TouchableOpacity style={[styles.smsCodeTextContainer]}
                        onPress={this.state.countDown ? ()=> {} : this.getSmsAuthCode}
      >
        {this.renderCodeFetcher()}
      </TouchableOpacity>
    )
  }
  
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          placeholder="输入验证码"
          style={styles.captchaInput}
          placeholderTextColor={PRIMARY_COLOR}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          onChangeText={this.smsCodeInput}
          maxLength={4}
        />
        {this.renderGetSmsButton()}
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = {
  ...action
};

export default connect(mapStateToProps, mapDispatchToProps)(SmsCodeInput);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  captchaInput: {
    flex: 1,
    backgroundColor: '#02413c',
    borderWidth: 1,
    borderColor: '#02413c',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
    textAlignVertical: 'center',
    color: '#7AEBE9'
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
  },
  smsCodeTextContainer: {
    width: 110,
    height: 50,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: PRIMARY_COLOR
  },
})