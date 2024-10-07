import { Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ErrorScreenWrapper,
  LoadingView,
  NavList,
  SlideInView,
} from "../../components";
import {
  fetchDataRecursively,
  getNumberOfStaredRepo,
  getUser,
} from "../../services/api";
import {
  homeNav,
  HomeParams,
  Repository,
  StackScreenProps,
  User,
} from "../../types";
import { homeListData } from "../../constants";
import { PinnedRepositories, ProfileDetails } from "./components";
import { ScrollView } from "react-native-gesture-handler";
import Divider from "../../components/Divider";
import { SlideFromRightIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";

type screenData = {
  userData: User;
  numberOfStarredRepo: number;
  mockPinnedRepo: Repository[];
};

const Profile = ({ navigation }: StackScreenProps<HomeParams, "Profile">) => {
  const [data, setData] = useState<screenData | null>(null);
  const [errorFetchingData, setErrorFetchingData] = useState(false);

  const getCount = useCallback(
    (name: keyof typeof homeNav) => {
      switch (name) {
        case "Repositories":
          return data?.userData.public_repos ?? 0;
        case "Organizations":
          return 0;
        case "Starred":
          return data?.numberOfStarredRepo ?? 0;
      }
    },
    [data]
  );
  const fetchData = useCallback(async () => {
    try {
      setErrorFetchingData(false);
      const [user, count, repos] = await Promise.all([
        getUser(),
        getNumberOfStaredRepo(),
        fetchDataRecursively("repos?per_page=5").next(),
      ]);
      if ("message" in user) {
        // possible api limit
        setErrorFetchingData(true);
      } else {
        setData({
          userData: user,
          numberOfStarredRepo: count,
          mockPinnedRepo: repos.value || [],
        });
      }
    } catch (e) {
      setErrorFetchingData(true);
    }
  }, [errorFetchingData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ErrorScreenWrapper isVisible={errorFetchingData} onPress={fetchData}>
      {data ? (
        <SlideInView>
          <ScrollView>
            <ProfileDetails {...data.userData} />
            <Divider />
            <PinnedRepositories data={data.mockPinnedRepo} />
            <View>
              {homeListData.map(({ label, color, params, name }) => (
                <NavList
                  key={label}
                  count={getCount(label)}
                  icon={{ color, name }}
                  onPress={() =>
                    navigation.navigate("Repository", {
                      type: params,
                      username: data.userData.login,
                    })
                  }
                  {...{ label }}
                />
              ))}
            </View>
          </ScrollView>
        </SlideInView>
      ) : (
        <LoadingView text="Fetching user data" />
      )}
    </ErrorScreenWrapper>
  );
};

export default Profile;
