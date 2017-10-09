import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { concat, reject } from 'lodash'
import styled from 'styled-components/native'

import { Keyboard } from 'react-native'
import NavigationService from '../../utilities/navigationService'

import SelectedChannels from './components/SelectedChannels'
import SearchHeader from '../../components/SearchHeader'
import SearchConnectionsWithData from './components/SearchConnections'
import RecentConnectionsWithData, { RecentConnectionsQuery } from './components/RecentConnections'
import { BlockConnectionsQuery } from '../../screens/BlockScreen/components/BlockConnections'
import { BlockQuery } from '../../screens/BlockScreen/components/BlockContents'

import uploadImage from '../../api/uploadImage'

import { Units } from '../../constants/Style'
import { Container } from '../../components/UI/Layout'

const SelectContainer = styled(Container)`
  margin-top: 0;
  background-color: white;
`

const SelectedContainer = styled.View`
  flex: 1;
  margin-top: ${Units.scale[5]};
`

class SelectConnectionScreen extends React.Component {
  static navigationOptions() {
    return {
      header: null,
    }
  }

  constructor(props) {
    super(props)

    const {
      image,
      content,
      description,
      title,
      source_url,
      onCancel,
      block_id,
    } = props.navigation.state.params

    this.state = {
      isSearching: false,
      q: null,
      selectedConnections: [],
      search: null,
      image,
      content,
      description,
      title,
      source_url,
      block_id,
    }

    this.onToggleConnection = this.onToggleConnection.bind(this)
    this.saveConnections = this.saveConnections.bind(this)

    this.onCancel = onCancel
  }

  onToggleConnection(connection, isSelected) {
    const connections = this.state.selectedConnections
    let newConnections

    if (isSelected) {
      newConnections = concat(connections, connection)
    } else {
      newConnections = reject(connections, existingConnection =>
        connection.id === existingConnection.id,
      )
    }

    this.setState({
      selectedConnections: newConnections,
    })
  }

  maybeUploadImage() {
    const { image } = this.state
    if (!image) return new Promise(resolve => resolve())
    return uploadImage(image)
  }

  navigateToBlock(id, imageLocation) {
    this.setState({ selectedConnections: [] })
    NavigationService.navigate('block', { id, imageLocation })
  }

  saveConnections() {
    const { title, content, description, source_url, block_id: blockId } = this.state
    const { createBlock, createConnection } = this.props
    const channelIds = this.state.selectedConnections.map(channel => channel.id)
    const refetchQueries = [{ query: RecentConnectionsQuery }]

    if (blockId) {
      const blockRefetchQueries = [...refetchQueries,
        {
          query: BlockConnectionsQuery,
          variables: { id: blockId },
        },
        {
          query: BlockQuery,
          variables: { id: blockId },
        },
      ]
      return createConnection({
        variables: {
          connectable_type: 'BLOCK',
          connectable_id: blockId,
          channel_ids: channelIds,
        },
        refetchQueries: blockRefetchQueries,
      }).then(() => {
        Keyboard.dismiss()
        NavigationService.back()
      }).catch(error => console.log('error', error))
    }

    return this.maybeUploadImage()
      .then((image) => {
        let variables = { channel_ids: channelIds, title, description }

        if (image) {
          // This is an image
          variables = { ...variables, source_url: image.location }
        } else if (content) {
          // This is a piece of text
          variables = { ...variables, content }
        } else {
          // This is some kind of link
          variables = { ...variables, source_url }
        }

        createBlock({ variables, refetchQueries }).then((response) => {
          Keyboard.dismiss()
          const { data: { create_block: { block } } } = response
          this.navigateToBlock(block.id, image && image.location)
        })
      })
  }

  search = (text) => {
    this.setState({
      isSearching: text.length,
      search: text,
    })
  }

  render() {
    const { search, selectedConnections, isSearching, title, source_url: sourceURL } = this.state

    const ConnectionContent = isSearching ? (
      <SearchConnectionsWithData
        q={search}
        key={`search-${selectedConnections.length}`}
        selected={selectedConnections}
        onToggleConnection={this.onToggleConnection}
      />
    ) : (
      <RecentConnectionsWithData
        selected={selectedConnections}
        key={`recent-${selectedConnections.length}`}
        onToggleConnection={this.onToggleConnection}
      />
    )

    const cancelOrDone = selectedConnections.length > 0 ? 'Done' : 'Cancel'

    return (
      <SelectContainer>
        <SearchHeader
          onChangeText={this.search}
          cancelOrDone={cancelOrDone}
          onSubmit={this.saveConnections}
          onCancel={this.onCancel}
        />
        <SelectedContainer>
          <SelectedChannels
            isSearching={isSearching}
            onRemove={channel => this.onToggleConnection(channel, false)}
            channels={selectedConnections}
            title={title || sourceURL || 'Untitled block'}
            key={`selected-${selectedConnections.length}`}
          />
          {ConnectionContent}
        </SelectedContainer>
      </SelectContainer>
    )
  }
}

SelectConnectionScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  createBlock: PropTypes.any.isRequired,
  createConnection: PropTypes.any.isRequired,
}

SelectConnectionScreen.defaultProps = {
  q: '',
  searchData: {},
}

const createMutation = gql`
  mutation createBlockMutation($channel_ids: [ID]!, $title: String, $content: String, $description: String, $source_url: String){
    create_block(input: { channel_ids: $channel_ids, title: $title, content: $content, description: $description, source_url: $source_url }) {
      clientMutationId
      block {
        id
        title
      }
    }
  }
`

const connectMutation = gql`
mutation createConnectionMutation($channel_ids: [ID]!, $connectable_id: ID!, $connectable_type: BaseConnectableTypeEnum!){
  create_connection(input: { channel_ids: $channel_ids, connectable_type: $connectable_type, connectable_id: $connectable_id }) {
    connectable {
      id
      title
    }
  }
}
`

const SelectConnectionScreenWithData = compose(
  graphql(connectMutation, { name: 'createConnection' }),
  graphql(createMutation, { name: 'createBlock' }),
)(SelectConnectionScreen)

export default SelectConnectionScreenWithData
