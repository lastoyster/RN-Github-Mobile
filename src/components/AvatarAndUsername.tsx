import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FlexContainer from "./FlexContainer";
import Avatar from "./Avatar";
import Divider from "./Divider";
import StyledText from "./Text";
import { SPACES } from "../constants";

interface Props {
  name: string;
  avatarUrl: string;
}
const AvatarAndUsername = ({ avatarUrl, name }: Props) => {
  return (
    <FlexContainer>
      <Avatar imageUrl={avatarUrl} size={"small"} />
      <Divider direction="horizontal" size={SPACES.small} />
      <StyledText weight="300">{name}</StyledText>
    </FlexContainer>
  );
};

export default AvatarAndUsername;
