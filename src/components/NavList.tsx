import React from "react";
import styled from "styled-components/native";
import Icon from "@expo/vector-icons/Octicons";
import StyledText from "./Text";
import { SPACES } from "../constants";
import { formatNumber } from "../utils";

interface Props {
  label: string;
  count?: number;
  icon: { name: string; color: string };
  onPress?: () => void;
}
const { small, medium, reallySmall } = SPACES;
const LIGHT_GRAY = "rgba(0, 0, 0, 0.7)";
const iconSize = 35;

const List = ({ count, icon, label, onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <IconWrapper color={icon.color}>
        <Icon name={icon.name as any} size={medium} color={"white"} />
      </IconWrapper>
      <StyledText weight="400" color={LIGHT_GRAY} size={15} style={{ flex: 1 }}>
        {label}
      </StyledText>
      {count ? (
        <StyledText weight="400" color={LIGHT_GRAY}>
          {formatNumber(count)}
        </StyledText>
      ) : null}
    </Container>
  );
};

const IconWrapper = styled.View<{ color: string }>`
  width: ${iconSize}px;
  height: ${iconSize}px;
  border-radius: ${reallySmall}px;
  align-items: center;
  justify-content: center;
  margin-right: ${small}px;
  background-color: ${({ color }) => color};
`;

const Container = styled.TouchableOpacity`
  padding: ${() => `${small}px ${medium}px`};
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

export default List;
