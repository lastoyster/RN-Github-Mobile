import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Repository } from "./apiModels";

export type repoType = "repos" | "orgs" | "starred";
export type HomeParams = {
  Profile: undefined;
  Repository: { type: repoType; username: string };
  RepositoryDetails: { repo: Repository };
};

export interface StackScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}
