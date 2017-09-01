import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import headerOptions from '../constants/Header'
import colors from '../constants/Colors'

import FeedScreen from '../screens/FeedScreen'
import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

import NotificationCountWithData from '../components/NotificationCount'

const FeedStack = StackNavigator({
  feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerOptions,
      title: 'Feed',
      headerRight: (<NotificationCountWithData navigation={navigation} />),
    }),
  },
  block: {
    screen: BlockStack,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Block',
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Channel',
    }),
  },
  feedProfile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Profile',
    }),
  },
}, {
  cardStyle: {
    backgroundColor: colors.gray.text,
  },
})

export default FeedStack
