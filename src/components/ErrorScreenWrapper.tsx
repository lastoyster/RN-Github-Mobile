import React, { FC } from "react";
import StyledText from "./Text";
import styled from "styled-components/native";
import Divider from "./Divider";
import { SPACES } from "../constants";

interface Props {
    isVisible: boolean;
    onPress: () => void;
}

const { medium, small, reallySmall } = SPACES;

const ErrorScreenWrapper: FC<Props> = ({ isVisible, onPress, children }) => {
    return (
        <>
            {isVisible ? (
                <Container>
                    <StyledText weight="bold" size={medium}>
                        Something went wrong
                    </StyledText>
                    <Divider />
                    <Button {...{ onPress }}>
                        <StyledText color="skyblue" weight="600">
                            TRY AGAIN
                        </StyledText>
                    </Button>
                </Container>
            ) : (
                children
            )}
        </>
    );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: white;
  padding: ${() => `${small}px ${medium}px`};
  border-radius: ${reallySmall}px;
`;

export default ErrorScreenWrapper;

