import { StackNavigator } from 'react-navigation'

const StackModalNavigator = (routeConfigs, navigatorConfig) => {
  const CardStackNavigator = StackNavigator(routeConfigs, navigatorConfig)
  const modalRouteConfig = {}
  const routeNames = Object.keys(routeConfigs)

  for (let i = 0; i < routeNames.length; i += 1) {
    modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]]
  }

  const ModalStackNavigator = StackNavigator({
    CardStackNavigator: { screen: CardStackNavigator },
    ...modalRouteConfig,
  }, {
    mode: 'modal',
    headerMode: 'none',
  })

  return ModalStackNavigator
}

export default StackModalNavigator
