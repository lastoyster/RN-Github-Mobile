import { Repository, User } from "../types";

const BASE_URL = "https://api.github.com/users/lastoyster";

export async function getUser() {
  const response = await fetch(`${BASE_URL}`);
  const result = await response.json();
  return result as Promise<User>;
}

export async function* fetchDataRecursively(endpoint: string) {
  let nextLink = `${BASE_URL}/${endpoint}`;
  while (nextLink) {
    try {
      const response = await fetch(nextLink);

      //get the link to the next page
      const link = response.headers
        .get("link")
        ?.split(",")
        .find((u) => u.includes(`rel="next"`));

      //format the link to the next page and save it for the next iteration
      nextLink =
        link?.split(";")[0].replace(">", "").replace("<", "").trim() || "";
      const result = await response.json();
      yield result as any as Repository[];
    } catch (error) {
      yield undefined;
    }
  }
}

export async function getNumberOfStaredRepo() {
  const response = await getCount(`${BASE_URL}/starred`);
  return response;
}

export async function getReadMeFile(
  username: string,
  repoName: string,
  branch: string
) {
  const response = await fetch(
    `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/README.md`
  );
  const result = await response.text();
  return result;
}
export async function getCount(url: string) {
  const response = await fetch(`${url}?per_page=1`);
  const link = response.headers
    .get("link")
    ?.split(",")
    .find((u) => u.includes(`rel="last"`));
  const pageCount = parseInt(link?.match(/page=(\d+)*>/)?.[1] || "0");
  return pageCount;
}
