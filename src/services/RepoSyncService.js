import { formatDate } from "../helper/helper.js";
import { getRepoByGithubId, updateRepo, createRepo  } from "./UserRepoService.js";
import { getUserProfile } from "./UserProfileService.js";

export const syncGitHubRepos = async (githubRepos, username) => {
  if (!githubRepos) {
    throw new Error("syncGitHubRepos: githubRepos is undefined");
  }
  const user = await getUserProfile(username);

    if (!user) {
        throw new Error(`User ${username} not found`);
    }

    try {
    for (const repo of githubRepos) {
        const repoData = {
            github_repo_id: repo.id,

            user_id: user.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,

            html_url: repo.html_url,

            language: repo.language,

            stars: repo.stargazers_count,
            forks: repo.forks_count,

            created_at: formatDate(repo.created_at),
            updated_at: formatDate(repo.updated_at),
            pushed_at: formatDate(repo.pushed_at)
        };

        const existingRepo = await getRepoByGithubId(repo.id);

        if (existingRepo) {
            await updateRepo(existingRepo.id, repoData);
        } else {
            await createRepo(repoData);
            console.log("user id", user?.id);
            console.log("Repo data:", repoData)
        }
        }

        return {
        success: true,
        count: githubRepos.length
        };

    } catch (err) {
        throw new Error(`Repo sync failed: ${err.message}`);
    }
};