import { NavigatorScreenParams } from "@react-navigation/native";
import { Repository, User } from "./apiModels";
import { HomeParams, repoType } from "./navigation";

export * from "./apiModels";
export * from "./navigation";
export * from "./reducer";
export enum homeNav {
  Repositories = "Repositories",
  Organizations = "Organizations",
  Starred = "Starred",
}

export interface listDataType {
  label: keyof typeof homeNav;
  color: string;
  name: string;
  params: repoType;
}

export interface pinnedRepoType
  extends Pick<
    Repository,
    "name" | "description" | "stargazers_count" | "language" | "owner"
  > {
  /**Maximum number of lines to show the description before clipping*/
  maxLines?: number;
}

export interface GlobalState {
  userDetails: User | null;
  starredRepos: Repository[];
  organizations: any[];
}
