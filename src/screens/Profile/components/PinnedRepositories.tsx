import { StyleSheet } from "react-native";
import React from "react";
import { RepoSummary } from "../../../components";
import styled from "styled-components/native";
import { Repository } from "../../../types";
import { SPACES } from "../../../constants";

interface Props {
    data: Repository[];
}
const { medium } = SPACES;

// Renders a horizontal list of pinned repositories.
const PinnedRepositories = ({ data }: Props) => {
    return (
        <Container
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: medium }}
        >
            {data.map((data, index) => (
                <ItemContainer key={index}>
                    <RepoSummary showHeader {...data} maxLines={1} />
                </ItemContainer>
            ))}
        </Container>
    );
};

const Container = styled.ScrollView`
  border-width: 0px;
  border-bottom-width: 0.5px;
  background-color: white;
  border-color: gray;
`;

const ItemContainer = styled.View`
  padding: 15px;
  width: 320px;
  border-width: 0.5px;
  margin-right: ${medium}px;
  border-radius: 5px;
  border-color: gray;
`;

export default PinnedRepositories;

const styles = StyleSheet.create({});
