import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Units } from '../../constants/Style'
import HeaderPullDown from './HeaderPullDown'
import { HEADER_BUTTON_HEIGHT } from './HeaderButton'
import BackButton from '../BackButton'

export const HEADER_HEIGHT = HEADER_BUTTON_HEIGHT + Units.statusBarHeight

const HeaderModal = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${({ isExpanded }) => (isExpanded ? '100%' : HEADER_HEIGHT)};
  padding-top: ${Units.statusBarHeight}
  align-items: center;
  justify-content: center;
  background-color: ${({ isExpanded }) => (isExpanded ? 'rgba(0,0,0,0.5)' : 'white')};
`

const HeaderRight = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  height: ${HEADER_HEIGHT};
  padding-top: ${Units.statusBarHeight};
  padding-right: ${Units.statusBarHeight / 2};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: ${({ isExpanded }) => (isExpanded ? 'none' : 'flex')}
`

const HeaderLeft = styled(HeaderRight)`
  right: auto;
  left: 0;
`

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
      headerRight: props.headerRight,
    }

    this.onPress = this.onPress.bind(this)
    this.onModalPress = this.onModalPress.bind(this)
  }

  onPress() {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  onModalPress() {
    this.setState({ isExpanded: false })
  }

  render() {
    const { isExpanded, headerRight } = this.state
    const primary = { ...this.props.primary, ...this.props.navigation.state.params }
    const { secondary, headerLeft, isHeaderTitleVisible } = this.props

    return (
      <HeaderModal
        isExpanded={isExpanded}
        onPress={this.onModalPress}
        disabled={!isExpanded}
      >
        <HeaderPullDown
          primary={primary}
          secondary={secondary}
          isExpanded={isExpanded}
          isHeaderTitleVisible={isHeaderTitleVisible}
          onPress={this.onPress}
        />

        {headerLeft &&
          <HeaderLeft isExpanded={isExpanded}>
            {headerLeft}
          </HeaderLeft>
        }

        {headerRight &&
          <HeaderRight isExpanded={isExpanded}>
            {headerRight}
          </HeaderRight>
        }
      </HeaderModal>
    )
  }
}

Header.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
      }),
    }),
  }),
  primary: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  secondary: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })).isRequired,
  headerRight: PropTypes.node,
  headerLeft: PropTypes.node,
  isHeaderTitleVisible: PropTypes.bool,
}

Header.defaultProps = {
  navigation: {
    state: {
      params: {},
    },
  },
  primary: {
    title: '—',
  },
  headerRight: null,
  headerLeft: <BackButton />,
  isHeaderTitleVisible: true,
}
