import { TextStyle, TextPropsIOS, TextPropsAndroid } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

interface Props {
    size?: number,
    weight?: TextStyle['fontWeight']
    color?: string
}


const AppText = styled.Text<Props>`
    font-size: ${({ size }) => size}px;
    font-weight: ${({ weight }) => weight};
    color: ${({ color }) => color};
`

AppText.defaultProps = {
    size: 15,
    weight: 'normal',
    color: 'black'
}

export default AppText
