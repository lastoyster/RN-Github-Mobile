import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import {
  Avatar,
  FlexContainer,
  IconWithText,
  StyledText,
} from "../../../components";
import { User } from "../../../types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Divider from "../../../components/Divider";
import FollowButton from "./FollowButton";
import { SPACES } from "../../../constants";

type Props = Pick<
  User,
  | "avatar_url"
  | "bio"
  | "location"
  | "email"
  | "twitter_username"
  | "followers"
  | "following"
  | "login"
  | "name"
>;

const { small, medium } = SPACES;

// Renders the profile details of a user.
const ProfileDetails = ({
  avatar_url,
  bio,
  followers,
  following,
  location,
  twitter_username,
  email,
  name,
  login,
}: Props) => {
  return (
    <Container>
      <Header>
        <Avatar imageUrl={avatar_url} size="large" />
        <View style={{ marginLeft: small }}>
          <StyledText weight="bold" size={medium}>
            {name}
          </StyledText>
          <StyledText weight="300" size={13}>
            {login}
          </StyledText>
        </View>
      </Header>
      <StyledText>{bio}</StyledText>
      <Divider />
      <View>
        <IconWithText
          left={"location"}
          right={<StyledText>{location}</StyledText>}
        />
        {email ? (
          <IconWithText
            left={"mail"}
            right={<StyledText weight="bold">{email}</StyledText>}
          />
        ) : null}
        <IconWithText
          left={<AntDesign name="twitter" size={15} color="gray" />}
          right={<StyledText weight="bold">{twitter_username}</StyledText>}
        />
        <IconWithText
          left={"person"}
          right={
            <>
              <FlexContainer>
                <StyledText weight="bold">{followers}</StyledText>
                <Divider direction="horizontal" size={8} />
                <StyledText>followers</StyledText>
              </FlexContainer>
              <Divider direction="horizontal" size={small} />
              <FlexContainer>
                <StyledText weight="bold">{following}</StyledText>
                <Divider direction="horizontal" size={8} />
                <StyledText>following</StyledText>
              </FlexContainer>
            </>
          }
        />
      </View>
      <FollowButton />
    </Container>
  );
};

const Container = styled.View`
  padding: ${medium}px;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${medium}px 0px;
`;

export default ProfileDetails;
