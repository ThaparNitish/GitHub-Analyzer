import { getGitHubUser, updateGitHubProfile, validateGitHubToken } from "../services/githubService.js";

export const getProfile = async(req, res) => {
    try{
        const username = req.params.username; 

        const data = await getGitHubUser(username); 

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



export const editProfile = async(req, res) => {
    try{
        const {bio} = req.body;
        const token = req.token;

        const updated = await updateGitHubProfile(token, {bio});

        return res.json({success: true,
            data: updated,
        })
    }catch(err){
        return res.json({
            success: false,
            message: err.message,
        })
    }
}