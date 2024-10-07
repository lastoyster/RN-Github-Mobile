import { Repository, User } from "./apiModels";

export type userDetailsAction = {
  type: "SET_USER_DETAILS";
  payload: User;
};
export type starredRepoAction = {
  type: "SET_STARRED_REPOS";
  payload: Repository[];
};
export type orgAction = {
  type: "SET_ORGANIZATIONS";
  
  payload: any[];
};

export type AppReducer = userDetailsAction | starredRepoAction | orgAction;
