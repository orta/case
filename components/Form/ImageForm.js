import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Container } from '../../components/UI/Layout'
import FieldSet from '../FieldSet'
import HeaderRightButton from '../HeaderRightButton'

import { Units, Border } from '../../constants/Style'

const contentWidth = (Units.window.width - (Units.scale[4] * 2))

const Field = styled(FieldSet)`
  margin-top: ${Units.scale[4]};
`

const ImagePreview = styled.Image`
  width: ${contentWidth};
  height: ${contentWidth};
  border-width: 1;
  border-color: ${Border.borderColor};
  align-self: center;
  resize-mode: contain;
  margin-vertical: ${Units.scale[3]};
`

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: props.block.kind.image_url,
      title: props.block.title,
      description: props.block.description,
    }
  }

  componentDidUpdate() {
    this.setNavOptions({
      headerRight: <HeaderRightButton onPress={this.onSubmit} text={this.props.submitText} />,
    })
  }

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state)
  }

  setNavOptions(options) {
    const newOptions = Object.assign({}, this.props.navigationOptions, options)
    this.props.navigation.setOptions(newOptions)
  }

  render() {
    const { image, title, description } = this.state
    return (
      <Container>
        <KeyboardAwareScrollView>
          <ImagePreview source={{ uri: image }} />
          <Field
            isFirst
            label="Title / Description"
            onChange={this.onFieldChange}
            fields={[
              {
                key: 'title',
                placeholder: 'Title',
                value: title,
              },
              {
                key: 'description',
                placeholder: 'Description',
                type: 'textarea',
                value: description,
              },
            ]}
          />
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

ImageForm.propTypes = {
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  navigation: PropTypes.any,
  navigationOptions: PropTypes.any.isRequired,
  block: PropTypes.shape({
    kind: PropTypes.shape({
      image_url: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
  }),
}

ImageForm.defaultProps = {
  onSubmit: () => null,
  navigation: () => null,
  submitText: 'Done',
  block: {
    kind: {
      image_url: '',
    },
    title: '',
    description: '',
  },
}
