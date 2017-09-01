import { StackNavigator } from 'react-navigation'

import BlockScreen from '../screens/BlockScreen'
import SelectConnectionsScreen from '../components/SelectConnections/index'
import CommentScreen from '../screens/CommentScreen/index'

import headerOptions from '../constants/Header'

const BlockStack = StackNavigator({
  block: {
    screen: BlockScreen,
    navigationOptions: () => ({
      ...headerOptions,
      tabBarVisible: false,
    }),
  },
  connect: {
    screen: SelectConnectionsScreen,
    navigationOptions: () => ({
      ...headerOptions,
      tabBarVisible: false,
      title: 'Connect',
    }),
  },
  comment: {
    screen: CommentScreen,
    navigationOptions: () => ({
      ...headerOptions,
      tabBarVisible: false,
      title: 'Comment',
    }),
  },
}, {
  headerMode: 'none',
  mode: 'modal',
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default BlockStack
