import { StyleSheet, View } from "react-native";
import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import { ProfileScreen, RepositoryPage, RepositoryScreen } from "../screens";
import { homeNav, HomeParams, repoType } from "../types";
import Octicons from "@expo/vector-icons/Octicons";
import { FlexContainer, StyledText } from "../components";
import Divider from "../components/Divider";
import styled from "styled-components/native";
import { SPACES } from "../constants";

const { Navigator, Screen } = createStackNavigator<HomeParams>();
const { small, medium } = SPACES;

const Main = () => {
  return (
    <Navigator
      initialRouteName="Profile"
      screenOptions={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
    >
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Repository" //This screen will be used for both starred and user repositories
        component={RepositoryScreen}
        options={{
          header: RepoHeader,
        }}
      />
      <Screen name="RepositoryDetails" component={RepositoryPage} />
    </Navigator>
  );
};

// Header for Repository Screen
const RepoHeader = ({ route, navigation }: StackHeaderProps) => {
  return (
    <Header>
      <Octicons
        name="arrow-left"
        size={medium}
        color="rgba(0, 0, 0, 0.8)"
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: medium }}
      />
      <Divider direction="horizontal" />
      <View>
        {/* Due  to the structure of the app, username and type property will always be available before users navigate to this screen*/}
        <StyledText weight="300">{route.params?.username}</StyledText>
        <StyledText weight="bold" size={medium}>
          {getHeadingText(route.params?.type)}
        </StyledText>
      </View>
    </Header>
  );
};

//Get the heading of the repo screen based on the type of repo
const getHeadingText = (routeName: repoType) => {
  switch (routeName) {
    case "repos": //users repos
      return homeNav.Repositories;
    case "starred": // users starred repos
      return homeNav.Starred;
    case "orgs": // users orgs
      return homeNav.Organizations;
  }
};

const Header = styled(FlexContainer)`
  padding: ${() => `${small}px ${medium}px`};
  padding-left: 0px;
  background-color: white;
  border-bottom-width: 0.3px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;

export default Main;

const styles = StyleSheet.create({});
