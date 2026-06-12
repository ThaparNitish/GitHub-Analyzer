import {getUserProfile, createUserProfile, updateUserProfile} from "./UserProfileService.js"
import {formatDate} from "../helper/helper.js"

export const syncGitHubUser = async (githubUser) => {
   if (!githubUser) {
    throw new Error("syncGitHubUser: githubUser is undefined");
  }
  try {
    const username = githubUser.login;

    const userData = {
      github_id: githubUser.id,
      username: githubUser.login,
      name: githubUser.name,
      avatar_url: githubUser.avatar_url,
      url: githubUser.html_url || githubUser.url,
      bio: githubUser.bio,
      company: githubUser.company,
      location: githubUser.location,
      blog: githubUser.blog,
      email: githubUser.email,
      followers: githubUser.followers,
      following: githubUser.following,
      public_repos: githubUser.public_repos,
      created_at: formatDate(githubUser.created_at),
      updated_at: formatDate(githubUser.updated_at)
    };

    const userProfile = await getUserProfile(username);


    let userId;


    if (userProfile && userProfile.id) {


      userId = userProfile.id;

      await updateUserProfile(userId, userData);
    }


    else {


      userId = await createUserProfile(userData);
    }



    return {
      success: true,
      userId
    };

  } catch (err) {

    throw new Error(`Sync failed: ${err.message}`);
  }
};


//   console.log("1️⃣ SYNC RECEIVED:", githubUser?.public_repos);
//   try {
//     const username = githubUser.login;

//     const userData = {
//       github_id: githubUser.id,
//       username: githubUser.login,
//       name: githubUser.name,
//       avatar_url: githubUser.avatar_url,
//       url: githubUser.url,
//       bio: githubUser.bio,
//       company: githubUser.company,
//       location: githubUser.location,
//       blog: githubUser.blog,
//       email: githubUser.email,
//       followers: githubUser.followers,
//       following: githubUser.following,
//       public_repos: githubUser.public_repos,
//       created_at: formatDate(githubUser.created_at),
//       updated_at: formatDate(githubUser.updated_at)
//     };
//     console.log("2️⃣ USERDATA BUILT:", userData.public_repos);

//     console.log("3️⃣ BEFORE DB UPDATE:", userData.public_repos);
//     let userProfile = await getUserProfile(username);
//     console.log("4️⃣ DB EXISTING USER:", userProfile?.public_repos);
//     let userId;

    
//     if (!userProfile) {
//       userId = await createUserProfile(userData);
//     } else {
//       userId = userProfile.id;
//       await updateUserProfile(userProfile.id, userData);        
      
//     }

//     return {
//       success: true,
//       userId,
//     };

//   } catch (err) {
//     throw new Error(`Sync failed: ${err.message}`);
//   }
// };