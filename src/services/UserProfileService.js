import { getDB } from "../config/db.js";

export const getUserProfile = async(username) => {
    const [rows] = await getDB().query("SELECT * FROM users WHERE username = ?", [String(username) || ""]);

    return rows[0] || null;
}; 

export const createUserProfile = async (user) => {
  const {
    github_id,
    username,
    name,
    avatar_url,
    url,
    bio,
    company,
    location,
    blog,
    email,
    followers,
    following,
    public_repos,
    created_at,
    updated_at
  } = user;

  const [result] = await getDB().query(
    `INSERT INTO users (
      github_id,
      username,
      name,
      avatar_url,
      url,
      bio,
      company,
      location,
      blog,
      email,
      followers,
      following,
      public_repos,
      created_at,
      updated_at,
      last_synced_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      github_id,
      username,
      name,
      avatar_url,
      url,
      bio,
      company,
      location,
      blog,
      email,
      followers,
      following,
      public_repos,
      created_at,
      updated_at
    ]
  );

  return result.insertId;
};


export const updateUserProfile = async (userId, user) => {
  if (!userId) {
    throw new Error("updateUserProfile: userId is missing");
  }

  const {
    name,
    avatar_url,
    url,
    bio,
    company,
    location,
    blog,
    email,
    followers,
    following,
    public_repos,
    updated_at
  } = user;

  await getDB().query(
    `UPDATE users SET
      name = ?,
      avatar_url = ?,
      url = ?,
      bio = ?,
      company = ?,
      location = ?,
      blog = ?,
      email = ?,
      followers = ?,
      following = ?,
      public_repos = ?,
      updated_at = ?
    WHERE id = ?`,
    [
      name,
      avatar_url,
      url,
      bio,
      company,
      location,
      blog,
      email,
      followers,
      following,
      public_repos,
      updated_at,
      userId
    ]
  );
};

export const getAllUsersFromDB = async () => {
  const [rows] = await getDB().query(
    `SELECT * FROM users`
  );

  return rows;
};