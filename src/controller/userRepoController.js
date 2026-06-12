import {getUserRepos} from "../services/UserRepoService.js" 
import { getRepos } from "../services/githubRepoService.js";
import {syncGitHubRepos} from "../services/RepoSyncService.js"

export const getUserReposController = async (req, res) => {
  try {
    const { username } = req.params;

    let repos = await getUserRepos(username);

    if (repos.length > 0) {
      return res.json({
        success: true,
        source: "db",
        repos
      });
    }

    const githubRepos = await getRepos(username);

    await syncGitHubRepos(githubRepos, username);

    repos = await getUserRepos(username);

    return res.json({
      success: true,
      source: "github",
      repos
    });

  } catch (err) {
    return res.json({
      success: false,
      message: err.message
    });
  }
};