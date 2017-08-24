import { StackNavigator } from 'react-navigation'

import headerStyle from '../constants/Header'

import FeedScreen from '../screens/FeedScreen'
import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

const FeedStack = StackNavigator({
  feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      title: 'Feed',
      headerStyle,
    }),
  },
  block: {
    screen: BlockStack,
    navigationOptions: () => ({
      title: 'Block',
      headerStyle,
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      title: 'Channel',
      headerStyle,
    }),
  },
  feedProfile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerStyle,
    }),
  },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default FeedStack
