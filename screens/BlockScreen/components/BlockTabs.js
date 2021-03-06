import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import TabToggle from '../../../components/TabToggle'
import BlockConnections from './BlockConnections'
import BlockComments from './BlockComments'

import { pluralize } from '../../../utilities/inflections'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class BlockTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSegment: props.selectedSegment,
    }
    this.onToggleChange = this.onToggleChange.bind(this)
  }

  onToggleChange(selectedSegment) {
    this.setState({
      selectedSegment,
    })
  }

  render() {
    const { block } = this.props
    const { selectedSegment } = this.state
    const content = selectedSegment === 'connections' ? (
      <BlockConnections id={block.id} style={{ flex: 1 }} />
    ) : (
      <BlockComments id={block.id} />
    )

    const tabOptions = {
      [pluralize(block.counts.channels, 'Connection')]: 'connections',
      [pluralize(block.counts.comments, 'Comment')]: 'comments',
    }

    return (
      <View style={styles.container}>
        <TabToggle
          options={tabOptions}
          onToggleChange={this.onToggleChange}
          selectedSegment={this.state.selectedSegment}
        />
        {content}
      </View>
    )
  }
}

BlockTabs.propTypes = {
  block: PropTypes.any,
  selectedSegment: PropTypes.string,
}

BlockTabs.defaultProps = {
  block: {},
  selectedSegment: 'connections',
}
