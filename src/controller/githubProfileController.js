import { getGitHubUser, updateGitHubProfile, validateGitHubToken } from "../services/githubProfileService.js";
import { syncGitHubUser } from "../services/ProfileSyncService.js";

export const getProfile = async(req, res) => {
    try{
        const username = req.params.username; 

        const data = await getGitHubUser(username); 
        const fullProfile = {
            ...data
        }
        await syncGitHubUser(data)
        res.json({
            success: "true",
            data,
        })
    } catch(err){
        res.json({
            success: "false",
            message: err.message || "Failed to fetch github Profile"
        })
    }
}



export const editProfile = async (req, res) => {
  try {
    const updates = req.body;
    const token = req.token;

    const allowedFields = [
      "bio",
      "name",
      "company",
      "blog",
      "location",
      "twitter_username"
    ];
    
    const filteredUpdates = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      return res.json({
        success: false,
        message: "No valid fields to update"
      });
    }

    await updateGitHubProfile(token, filteredUpdates);

    const updatedGitHubUser = await validateGitHubToken(token);

    const githubUser = updatedGitHubUser.user;

    await syncGitHubUser(githubUser);

    return res.json({
      success: true,
      source: "github",
      data: githubUser
    });

  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};