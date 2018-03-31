/**
 * Created by yangyang on 2018/3/31.
 */
import React, {PureComponent} from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native'
import {PRIMARY_COLOR} from '../../util/globalStyle'

export default class CommonButton extends PureComponent {
  constructor(props) {
    super(props)
  }
  
  pressAction() {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }
  
  renderTrip() {
    if(this.props.disabled && this.props.trip) {
      return(
        <Text style={styles.trip}>{this.props.trip}</Text>
      )
    } else {
      return(
        null
      )
    }
  }
  
  renderActivityIndicator() {
    if(this.props.activityIndicator) {
      return(
        <View style={{marginLeft: 10}}>
          <ActivityIndicator
            animating={true}
            size="small"
            color={'white'}
          />
        </View>
      )
    } else {
      return <View />
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.defaultBtnStyle}
                          onPress={() => this.pressAction()}
                          disabled={this.props.disabled}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.defaultTitleStyle, this.props.titleStyle]}>{this.props.title}</Text>
            {this.renderTrip()}
            {this.renderActivityIndicator()}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

CommonButton.defaultProps = {
  title: '完成',
  disabled: false,
  activityIndicator: false
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultBtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5
  },
  defaultTitleStyle: {
    fontSize: 18,
    color: 'white'
  },
  trip: {
    fontSize: 14,
    color: 'white'
  }
})