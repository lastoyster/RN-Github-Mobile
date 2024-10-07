import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Octicons from "@expo/vector-icons/Octicons";
import { FlexContainer, StyledText } from '../../../components';
import styled from 'styled-components/native';
import Divider from '../../../components/Divider';
import { SPACES } from '../../../constants';

const LIGHT_GRAY = 'rgba(0, 0, 0, 0.8)'
const { small, reallySmall } = SPACES

const FollowButton = () => {
    const [isFollowing, setisFollowing] = useState(false)
    const toggleFollow = () => setisFollowing(!isFollowing)

    const text = isFollowing ? "Following" : "Follow"
    const icon = isFollowing ? "check" : "plus"
    const iconColor = isFollowing ? "green" : LIGHT_GRAY

    return (
        <Container as={TouchableOpacity} {...{ isFollowing }} onPress={toggleFollow} activeOpacity={0.8}  >
            <Octicons name={icon} size={15} color={iconColor} />
            <Divider direction='horizontal' size={small} />
            <StyledText size={15} weight='400' color={LIGHT_GRAY}  >{text}</StyledText>
        </Container>
    )

}

const Container = styled(FlexContainer) <{ isFollowing: boolean }>`
    justify-content: center;
    border-radius: ${reallySmall}px;
    border-color: gray;
    background-color: ${({ isFollowing }) => isFollowing ? 'rgba(0, 0, 0, 0.03)' : 'white'};
    border-width: 0.5px;
    padding: 12px;
`

export default FollowButton

const styles = StyleSheet.create({})