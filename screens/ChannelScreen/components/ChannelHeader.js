import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { pickBy } from 'lodash'
import { Share } from 'react-native'

import UserNameText from '../../../components/UserNameText'
import TabToggle from '../../../components/TabToggle'
import FollowButtonWithData from '../../../components/FollowButton'
import HTML from '../../../components/HTML'
import { Colors, Units, Typography } from '../../../constants/Style'
import { SmallButton, SmallButtonLabel } from '../../../components/UI/Buttons'

import NavigationService from '../../../utilities/navigationService'
import { pluralize } from '../../../utilities/inflections'

const Container = styled.View`
  margin-bottom: ${Units.scale[2]};
`

const Header = styled.View`
  padding-top: ${Units.scale[3]};
  padding-horizontal: ${Units.scale[3]};
  padding-bottom: ${Units.scale[4]};
`

const Headline = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const Title = styled.Text`
  flex: 1;
  margin-right: ${Units.scale[2]};
  margin-bottom: ${Units.scale[3]};
  font-size: ${Typography.fontSize.h1};
  font-weight: ${Typography.fontWeight.medium};
  color: ${({ visibility }) => Colors.channel[visibility]};
`

const Metadata = styled.Text`
  width: 85%;
  margin-vertical: ${Units.scale[1]};
  color: ${({ visibility }) => Colors.channel[visibility]};
  font-size: ${Typography.fontSize.small};
`

const Description = styled(HTML)`
  width: 85%;
  margin-vertical: ${Units.scale[1]};
`

const Actions = styled.View`
  margin-top: ${Units.scale[1]};
`

const Action = styled.Text`
  margin-vertical: ${Units.scale[1] / 2};
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('base')};
  font-weight: ${Typography.fontWeight.bold};
  color: ${({ visibility }) => Colors.channel[visibility]};
`

const editChannel = (channel) => {
  NavigationService.navigate('editChannel', { channel })
}

const ChannelHeader = ({ channel, type, onToggle }) => {
  let TAB_OPTIONS = {
    [pluralize(channel.counts.connections, 'Connection')]: 'CONNECTION',
    [pluralize(channel.counts.channels, 'Channel')]: 'CHANNEL',
    [pluralize(channel.counts.blocks, 'Block')]: 'BLOCK',
  }

  // Remove channels tab if there are none
  if (channel.counts.channels === 0) {
    TAB_OPTIONS = pickBy(TAB_OPTIONS, value => value !== 'CHANNEL')
  }

  return (
    <Container>
      <Header>
        <Headline>
          <Title visibility={channel.visibility}>
            {channel.title}
          </Title>

          {channel.can.follow &&
            <Actions>
              <FollowButtonWithData id={channel.id} type="CHANNEL" />
            </Actions>
          }
          {channel.can.manage &&
            <Actions>
              <SmallButton onPress={() => editChannel(channel)}>
                <SmallButtonLabel accessibilityLabel="Edit">
                  Edit
                </SmallButtonLabel>
              </SmallButton>
            </Actions>
          }
        </Headline>

        <Description
          value={channel.displayDescription || '<p>—</p>'}
          stylesheet={{
            p: {
              color: Colors.channel[channel.visibility],
            },
          }}
        />

        <Metadata visibility={channel.visibility}>
          by <UserNameText user={channel.user} />
        </Metadata>

        {channel.visibility !== 'private' &&
          <Action visibility={channel.visibility} onPress={() => Share.share({ url: `https://www.are.na/${channel.user.slug}/${channel.id}` })}>
            Share
          </Action>
        }

      </Header>

      <TabToggle
        selectedSegment={type}
        onToggleChange={onToggle}
        options={TAB_OPTIONS}
        color={Colors.channel[channel.visibility]}
      />
    </Container>
  )
}

ChannelHeader.propTypes = {
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK', 'CONNECTION']).isRequired,
  onToggle: PropTypes.func,
  channel: PropTypes.shape({
    id: PropTypes.any,
    visibility: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.any,
    can: PropTypes.any,
  }).isRequired,
}

ChannelHeader.defaultProps = {
  onToggle: () => null,
}

export default ChannelHeader
