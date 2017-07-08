import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: () => {
      return (
        <Text>Connect</Text>
      )
    },
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View>
            <Text>
              This is where the feed will be.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: (layout.padding * 4),
    alignItems: "center"
  },
});
