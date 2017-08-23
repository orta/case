import { StackNavigator } from 'react-navigation'

import headerStyle from '../constants/Header'

import BlockScreen from '../screens/BlockScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'


const ProfileStack = StackNavigator({
  profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
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
  block: {
    screen: BlockScreen,
    navigationOptions: () => ({
      tabBarVisible: false,
      title: 'Block',
      headerStyle,
    }),
  },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default ProfileStack
