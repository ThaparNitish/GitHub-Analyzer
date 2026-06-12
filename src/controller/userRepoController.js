import {getUserRepos, getRepoByName} from "../services/UserRepoService.js" 
import { getRepos, getSingleRepo } from "../services/githubRepoService.js";
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

export const getSingleRepoUser = async (req, res) => {
  try {
    const { username, repoName } = req.params;
    const token = req.headers.authorization?.split(" ")[1];


    const repo = await getRepoByName(username, repoName);

    if (repo) {
      return res.json({
        success: true,
        source: "db",
        repo
      });
    }


    const githubRepo = await getSingleRepo(username, repoName, token);


    const formatted = {
      github_repo_id: githubRepo.id,
      name: githubRepo.name,
      full_name: githubRepo.full_name,
      description: githubRepo.description,
      html_url: githubRepo.html_url,
      language: githubRepo.language,
      stars: githubRepo.stargazers_count,
      forks: githubRepo.forks_count,
      created_at: githubRepo.created_at,
      updated_at: githubRepo.updated_at,
      pushed_at: githubRepo.pushed_at
    };

    return res.json({
      success: true,
      source: "github",
      repo: formatted
    });

  } catch (err) {
    return res.json({
      success: false,
      message: err.message
    });
  }
};