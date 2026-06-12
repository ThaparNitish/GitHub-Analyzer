import {syncGitHubUser} from "../services/ProfileSyncService.js"
import {getUserProfile, createUserProfile} from "../services/UserProfileService.js"
import {getGitHubUser} from "../services/githubProfileService.js"

export const getProfile = async(req, res) => {
    try{
        const username = req.params.username; 

        let user = await getUserProfile(username);

        if (user) {
            return res.json({
                success: true,
                source: "db",
                user
            });
        }

        const githubUser = await getGitHubUser(username);
        await syncGitHubUser(githubUser)
        const newUser = await getUserProfile(username);

        res.json({
            success: "true",
            source: "github",
            user: newUser,
        })
    } catch(err){
        res.json({
            success: "false",
            message: err.message || "Failed to fetch github Profile"
        })
    }
}