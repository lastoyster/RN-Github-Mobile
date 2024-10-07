import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';
import StyledText from './Text';

const LoadingView = ({ text, size = 80 }: { text: string, size?: number }) => {
    return (
        <EmptyView >
            <ActivityIndicator size={size} color='blue' />
            <StyledText >{text}</StyledText>
        </EmptyView>
    )
}

const EmptyView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    `;

export default LoadingView

const styles = StyleSheet.create({})