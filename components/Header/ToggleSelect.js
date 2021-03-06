import styled from 'styled-components/native'
import { Border, Units } from '../../constants/Style'

export const ToggleSelect = styled.View`
  width: 100%;
  background-color: white;
  align-self: center;
  width: 100%;
  border-color: black;
  border-radius: ${Border.borderRadius};
  border-width: 1;
  background-color: white;
`

export const ToggleSelectOption = styled.TouchableOpacity`
  align-self: center;
  padding-horizontal: ${Units.base};
  padding-vertical: ${Units.scale[2]};
  width: 100%;
`
