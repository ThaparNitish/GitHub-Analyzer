import { getRepos } from "../services/githubRepoService.js";
import { syncGitHubRepos } from "../services/RepoSyncService.js";

export const getGitHubRepos = async (req, res) => {
  try {
    const  username  = req.params.username;

    const token = req.headers.authorization?.split(" ")[1];

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const repos = await getRepos(username, token);
    await syncGitHubRepos( repos, username);
    

    return res.status(200).json({
      success: true,
      username,
      count: repos.length,
      data: repos,
    });
  } catch (error) {
    console.error("Controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch repositories",
    });
  }
};