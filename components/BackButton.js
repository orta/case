import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import layout from '../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default class BackButton extends React.Component {
  goBack() {
    // if (this.props.navigator.getCurrentIndex() > 0) {
    //   this.props.navigator.pop()
    // }
    return this
  }

  render() {
  // this.props.navigator.getCurrentIndex() > 0
    return (
      <View onPress={this.goBack} style={styles.container}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="black"
          onPress={this.goBack}
          style={{ paddingLeft: layout.padding, paddingRight: layout.padding }}
        />
      </View>
    )
  }
}
