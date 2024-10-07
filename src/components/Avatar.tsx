import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

interface Props {
  /**The size of the avatar. Default size of 80 */
  size: "small" | "medium" | "large";
  imageUrl: string;
}
const Avatar = ({ imageUrl, size = "small" }: Props) => {
  const avatarSize: number =
    size === "small" ? 20 : size === "medium" ? 40 : 80;
  return (
    <Container {...{ avatarSize }}>
      <StyledImage
        resizeMode="contain"
        resizeMethod="resize"
        source={{ uri: imageUrl }}
      />
    </Container>
  );
};

const Container = styled.View<{ avatarSize: number }>`
  width: ${({ avatarSize }) => avatarSize}px;
  height: ${({ avatarSize }) => avatarSize}px;
  overflow: hidden;
  border-radius: ${({ avatarSize }) => avatarSize / 2}px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default Avatar;
