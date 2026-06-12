import { getGitHubUser } from "../services/githubProfileService.js";
import { getRepos } from "../services/githubRepoService.js";

export const UserAnalysis = async (req, res) => {
  try {
    const username = String(req.params.username || "").trim();
    const token = req.headers.authorization?.split(" ")[1];

    const user = await getGitHubUser(username, token);
    const repos = await getRepos(username, token);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const mostStarred = repos.length
      ? repos.reduce((max, r) =>
          r.stargazers_count > max.stargazers_count ? r : max
        )
      : null;

    const latestUpdated = repos.length
      ? repos.reduce((latest, r) =>
          new Date(r.updated_at) > new Date(latest.updated_at) ? r : latest
        )
      : null;

    return res.json({
      success: true,
      analysis: {
        username: user.login,
        public_repos: user.public_repos,
        followers: user.followers,
        repo_count: repos.length,
        most_starred_repo: mostStarred?.name || null,
        latest_updated_repo: latestUpdated?.name || null
      }
    });

  } catch (err) {
    return res.json({
      success: false,
      message: err.message
    });
  }
};