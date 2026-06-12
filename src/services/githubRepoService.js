import axios from "axios";

const GitHubBaseUrl = "https://api.github.com";

export const getRepos = async (username, token = null) => {
    try {
        if (!username) throw new Error("Username is required");

        const headers = {};

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get(
          `${GitHubBaseUrl}/users/${username}/repos`,
          {
            params: {
              per_page: 100,
              page: 1,
              sort: "updated",
            },
            headers,
          }
        );

        return response.data;
      } catch (error) {
          console.error("getRepo error:", error.response?.data || error.message);

          throw new Error("Failed to fetch repositories from GitHub");
      }
};


export const getSingleRepo = async (username, repoName, token = null) => {
  try {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.get(
      `${GitHubBaseUrl}/repos/${username}/${repoName}`,
      { headers }
    );

    return response.data;

  } catch (err) {
    throw new Error("Failed to fetch repo from GitHub");
  }
};