import { getDB } from "../config/db.js";


export const getUserRepos = async (username) => {
  const safeUsername = String(username || "");

  const [rows] = await getDB().query(
    `SELECT r.*
     FROM repositories r
     JOIN users u
       ON r.user_id = u.id
     WHERE u.username = ?`,
    [safeUsername]
  );

  return rows;
};

export const getRepoByGithubId = async (githubRepoId) => {
    const [rows] = await getDB().query(
        "SELECT * FROM repositories WHERE github_repo_id = ?",
        [githubRepoId]
    );

    return rows[0] || null;
};

export const createRepo = async (repo) => {
  const {
    github_repo_id,
    user_id,
    name,
    full_name,
    description,
    html_url,
    language,
    stars,
    forks,
    created_at,
    updated_at,
    pushed_at
  } = repo;

  const [result] = await getDB().query(
    `INSERT INTO repositories (
      github_repo_id,
      user_id,
      name,
      full_name,
      description,
      html_url,
      language,
      stars,
      forks,
      created_at,
      updated_at,
      pushed_at,
      last_synced_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      github_repo_id,
      user_id,
      name,
      full_name,
      description,
      html_url,
      language,
      stars,
      forks,
      created_at,
      updated_at,
      pushed_at
    ]
  );

  return result.insertId;
};

export const updateRepo = async (repoId, repo) => {
  if (!repoId) {
    throw new Error("updateRepo: repoId is missing");
  }

  const {
    name,
    full_name,
    description,
    html_url,
    language,
    stars,
    forks,
    updated_at,
    pushed_at
  } = repo;

  await getDB().query(
    `UPDATE repositories SET
      name = ?,
      full_name = ?,
      description = ?,
      html_url = ?,
      language = ?,
      stars = ?,
      forks = ?,
      updated_at = ?,
      pushed_at = ?,
      last_synced_at = NOW()
    WHERE id = ?`,
    [
      name,
      full_name,
      description,
      html_url,
      language,
      stars,
      forks,
      updated_at,
      pushed_at,
      repoId
    ]
  );
};

export const getRepoByName = async (username, repoName) => {
  const safeUsername = String(username || "");
  const safeRepo = String(repoName || "");

  const [rows] = await getDB().query(
    `SELECT r.*
     FROM repositories r
     JOIN users u ON r.user_id = u.id
     WHERE u.username = ?
     AND r.name = ?`,
    [safeUsername, safeRepo]
  );

  return rows[0] || null;
};

