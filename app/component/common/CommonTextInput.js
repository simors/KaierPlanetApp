/**
 * Created by yangyang on 2018/3/31.
 */
import React, {PureComponent} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native'
import {PRIMARY_COLOR} from '../../util/globalStyle'

export default class CommonTextInput extends PureComponent {
  constructor(props) {
    super(props)
  }
  
  textChange = (text) => {
    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }
  }
  
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          keyboardType={this.props.keyboardType || 'default'}
          maxLength={this.props.maxLength || 255}
          clearButtonMode="while-editing"
          placeholder={this.props.placeholder || "输入手机号"}
          style={styles.inputStyle}
          placeholderTextColor={PRIMARY_COLOR}
          underlineColorAndroid="transparent"
          onChangeText={this.textChange}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
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
})