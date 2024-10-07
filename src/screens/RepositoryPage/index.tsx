import React, { useEffect, useState } from "react";
import { HomeParams, StackScreenProps } from "../../types";
import {
  AvatarAndUsername,
  FlexContainer,
  IconWithText,
  NavList,
  StyledText,
} from "../../components";
import styled from "styled-components/native";
import { SPACES } from "../../constants";
import { getCount, getReadMeFile } from "../../services/api";
import { formatNumber } from "../../utils";
import Divider from "../../components/Divider";
import { useWindowDimensions, View } from "react-native";
import showdown from "showdown";
import { WebView } from "react-native-webview";
import { ScrollView } from "react-native-gesture-handler";

const LIGHT_GRAY = "rgba(0, 0, 0, 0.7)";

const Index = ({
  navigation,
  route,
}: StackScreenProps<HomeParams, "RepositoryDetails">) => {
  const [{ PRcount, contributorsCount }, setExtraData] = useState<{
    [key in "contributorsCount" | "PRcount"]: number;
  }>({ PRcount: 0, contributorsCount: 0 });
  const repo = route.params.repo;

  useEffect(() => {
    const getData = async () => {
      const [con, PR] = await Promise.all([
        getCount(repo.contributors_url),
        getCount(repo.pulls_url),
      ]);
      setExtraData({
        PRcount: PR,
        contributorsCount: con,
      });
    };
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TopSection>
        <AvatarAndUsername
          avatarUrl={repo.owner.avatar_url}
          name={repo.owner.login}
        />
        <Divider size={SPACES.small} />
        <StyledText weight="bold" size={SPACES.medium}>
          {repo.name}
        </StyledText>
        <StyledText style={{ marginVertical: 10 }}>
          {repo.description}
        </StyledText>
        <IconWithText
          left={"link"}
          right={<StyledText>{repo.homepage}</StyledText>}
        />
        <FlexContainer>
          <IconWithText
            left={"star"}
            right={
              <StyledText>
                {formatNumber(repo.stargazers_count)} stars
              </StyledText>
            }
          />
          <Divider direction="horizontal" />
          <IconWithText
            left={"repo-forked"}
            right={
              <StyledText>{formatNumber(repo.forks_count)} forks</StyledText>
            }
          />
        </FlexContainer>
      </TopSection>
      <NavList
        count={repo.open_issues_count}
        label="Issues"
        icon={{ color: "green", name: "issue-opened" }}
      />
      <NavList
        count={PRcount}
        label="Pull Request"
        icon={{ color: "blue", name: "issue-opened" }}
      />
      <NavList
        count={contributorsCount}
        label="Contributors"
        icon={{ color: "orangered", name: "issue-opened" }}
      />
      <NavList
        count={repo.watchers_count}
        label="Watchers"
        icon={{ color: "gold", name: "issue-opened" }}
      />
      <BorderBox>
        <NavList icon={{ color: "lightgray", name: "" }} label="Browse code" />
        <NavList icon={{ color: "lightgray", name: "" }} label="Commits" />
      </BorderBox>
      <ReadMeSection
        branch={repo.default_branch}
        username={repo.owner.login}
        reponame={repo.name}
      />
    </ScrollView>
  );
};

interface Props {
  username: string;
  reponame: string;
  branch: string;
}

const ReadMeSection = ({ branch, reponame, username }: Props) => {
  const [data, setData] = useState<string>("");
  const { height } = useWindowDimensions();
  useEffect(() => {
    const getadme = async () => {
      const u = await getReadMeFile(username, reponame, branch);
      setData(u);
    };
    getadme();
  }, []);
  return (
    // <Views style={{ height: height }}>
    <WebView
      style={{ flex: 1, height: height }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      androidHardwareAccelerationDisabled={true}
      automaticallyAdjustContentInsets={false}
      scrollEnabled={true}
      d
      originWhitelist={["*"]}
      source={{
        html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body> ${c(
          data
        )} </body></html>`,
      }}
    />
    // </Views>
  );
};

function c(g: string) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(g);
  console.log(html);
  return html;
}

export default Index;
const Container = styled.ScrollView`
  /* flex: 1; */
`;
const BorderBox = styled.View`
  border-bottom-width: 0.5px;
  border-color: gray;
`;

const TopSection = styled(BorderBox)`
  padding: ${SPACES.medium}px;
`;
