import {db} from "../config/db.js";

export const getUserProfile = async(username) => {
    console.log("RAW USERNAME:", username);
    const [rows] = await db.query(
        "SELECT * FROM users WHERE username = ?", [username.trim()]
    );
    console.log("DB ROWS:", rows);
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

  const [result] = await db.query(
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

  await db.query(
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
// export const updateUserProfile = async (userId, user) => {
//     console.log("DB FUNCTION USER ID:", userId);
//   const {
//     name, avatar_url,url,  bio, company, location, blog, email, followers, following, public_repos, updated_at, last_synced_at,} = user;

//   await db.query(
//     `UPDATE users SET
//       name = ?,
//       avatar_url = ?,
//       url = ?,
//       bio = ?,
//       company = ?,
//       location = ?,
//       blog = ?,
//       email = ?,
//       followers = ?,
//       following = ?,
//       public_repos = ?,
//       updated_at = ?,
//     WHERE id = ?`,
//     [
//       name, avatar_url, url,  bio, company, location, blog, email,followers, following, public_repos,  updated_at, last_synced_at, userId
//     ]
//   );
// };