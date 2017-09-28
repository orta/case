import React from 'react'
import {
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel'

import NavigationService from '../../../utilities/navigationService'

import BlockItem from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import UserAvatar from '../../../components/UserAvatar'

import layout from '../../../constants/Layout'
import colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  blockStyle: {
    borderWidth: 1,
    borderColor: colors.gray.border,
  },
  carouselContainer: {
    marginRight: layout.padding,
    justifyContent: 'flex-start',
  },
  carouselItemContainer: {
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    paddingHorizontal: layout.padding,
    flexWrap: 'wrap',
  },
})

const renderItem = ({ item }) => {
  let objectItem = null
  if (item) {
    const { __typename } = item
    switch (__typename) {
      case 'Connectable':
        objectItem = (
          <BlockItem
            size="1-up"
            block={item}
            key={item.id}
            style={styles.blockStyle}
          />
        )
        break
      case 'Channel':
        objectItem = <ChannelItem channel={item} key={item.id} />
        break
      case 'User':
        objectItem = (
          <UserAvatar
            user={item}
            key={item.id}
            size={90}
            mode="feed"
            onPress={() => NavigationService.navigate('profile', {
              id: item.id,
              title: item.title,
            })}
            style={{ marginRight: layout.padding }}
            includeName
          />
        )
        break
      default:
        objectItem = <Text key={`klass-${item.id}`} >{item.id}</Text>
        break
    }
    return objectItem
  }
  return null
}

const FeedContents = ({ items, verb }) => {
  const itemData = items.slice().reverse()

  const { __typename } = items[0]
  const channelGroup = __typename === 'Channel'
  const userGroup = __typename === 'User'
  const sliderWidth = layout.window.width
  const itemWidth = layout.feedBlock + (layout.padding)
  const showSlider = verb === 'connected' && items.length > 1 && !channelGroup

  if (showSlider) {
    return (
      <Carousel
        ref={(carousel) => { this.Carousel = carousel }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        activeSlideOffset={1}
        inactiveSlideScale={1}
        renderItem={renderItem}
        data={itemData}
        scrollEndDragDebounceValue={50}
        contentContainerCustomStyle={styles.carouselItemContainer}
        animationOptions={{ duration: 100, easing: Easing.sin }}
        slideStyle={{ justifyContent: 'flex-start' }}
      />
    )
  }

  const flexDirection = channelGroup ? 'column' : 'row'
  const justifyContent = userGroup ? 'flex-start' : 'center'
  const contentsItems = itemData.map((item, index) => renderItem({ item, index }))

  return (
    <View style={[{ flexDirection, justifyContent }, styles.container]}>
      {contentsItems}
    </View>
  )
}

FeedContents.propTypes = {
  items: PropTypes.any,
  verb: PropTypes.string.isRequired,
}

FeedContents.defaultProps = {
  items: [],
}

export default FeedContents
