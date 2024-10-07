import { listDataType, pinnedRepoType } from "../types";
import colors from "./colors.json";
export const languageColors = colors;
export const homeListData: listDataType[] = [
  {
    color: "gray",
    label: "Repositories",
    name: "repo",
    params: "repos",
  },
  {
    color: "#fa8633",
    label: "Organizations",
    name: "organization",
    params: "orgs",
  },
  {
    color: "#fac412",
    label: "Starred",
    name: "star",
    params: "starred",
  },
];

export enum SPACES {
  tiny = 3,
  reallySmall = 5,
  small = 10,
  medium = 20,
  large = 40,
  extraLarge = 80,
}
