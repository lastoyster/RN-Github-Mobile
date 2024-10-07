import styled from 'styled-components/native'
import { SPACES } from '../constants'

interface Props {
    direction?: 'horizontal' | 'vertical'
    size?: number
}

const { medium } = SPACES

const Divider = styled.View<Props>`
    width: ${({ size, direction }) => direction === 'horizontal' ? size : 0}px;
    height: ${({ size, direction }) => direction === 'vertical' ? size : 0}px;
    `
Divider.defaultProps = {
    direction: 'vertical',
    size: medium,
}
export default Divider