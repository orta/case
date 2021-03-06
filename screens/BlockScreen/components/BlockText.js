import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import HTMLView from 'react-native-htmlview'

import { Border, Units } from '../../../constants/Style'
import HTMLStyles from '../../../constants/HtmlView'
import { Container } from '../../../components/UI/Layout'

const Wrapper = styled.View`
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
  margin-horizontal: ${Units.scale[2]};
  margin-vertical: ${Units.scale[2]};
`

export default class BlockText extends React.Component {
  render() {
    const { block } = this.props.navigation.state.params

    return (
      <Container>
        <ScrollView>
          <Wrapper>
            <HTMLView
              value={block.kind.displayContent}
              stylesheet={HTMLStyles}
            />
          </Wrapper>
        </ScrollView>
      </Container>
    )
  }
}

BlockText.propTypes = {
  navigation: PropTypes.any.isRequired,
}
