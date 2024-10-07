import { FlatList } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HomeParams, Repository, StackScreenProps } from "../types";
import {
  ErrorScreenWrapper,
  LoadingView,
  RepoSummary,
  SlideInView,
} from "../components";
import { fetchDataRecursively } from "../services/api";
import styled from "styled-components/native";
import { useIsFocused } from "@react-navigation/native";
import { SPACES } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

// This screen renders a list of repositories.
const { medium } = SPACES;
const Index = ({
  route,
  navigation,
}: StackScreenProps<HomeParams, "Repository">) => {
  const [repos, setRepos] = useState<Repository[] | null>(null);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [isFetchingMoreData, setIsFetchingMoreData] = useState(false);

  const isScreenFocused = useIsFocused();
  const repoType = route.params.type;
  const showRepoHeader = repoType !== "repos";
  const getData = useMemo(() => fetchDataRecursively(repoType), []);

  const fetchData = useCallback(async () => {
    // reset error state
    setErrorFetchingData(false);
    // don't fetch if already fetching
    if (isFetchingMoreData) return;
    setIsFetchingMoreData(true); // set fetching state
    const data = await getData.next();

    if (data.value && isScreenFocused) {
      // append new data to existing data
      repos ? setRepos([...repos, ...data.value]) : setRepos(data.value);
    } else {
      // set error state if generator function is not done and screen is not focused
      setErrorFetchingData(!data.done!);
    }
    // reset fetching state
    setIsFetchingMoreData(false);
  }, [repos, getData, isFetchingMoreData, errorFetchingData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ErrorScreenWrapper isVisible={errorFetchingData} onPress={fetchData}>
      {repos ? (
        <SlideInView>
          <FlatList
            data={repos}
            style={{ backgroundColor: "white" }}
            contentContainerStyle={{ paddingVertical: medium }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Item
                onPress={() => {
                  navigation.navigate("RepositoryDetails", { repo: item });
                }}
              >
                <RepoSummary
                  showHeader={showRepoHeader}
                  {...item}
                  maxLines={3}
                />
              </Item>
            )}
            onEndReached={fetchData}
            ListFooterComponent={() =>
              isFetchingMoreData ? <LoadingView text="" size={40} /> : null
            }
          />
        </SlideInView>
      ) : (
        <LoadingView text="" size={80} />
      )}
    </ErrorScreenWrapper>
  );
};
const Item = React.memo(styled.TouchableOpacity`
  padding: 15px ${medium}px;
  border-bottom-width: 0.4px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
`);

export default Index;
