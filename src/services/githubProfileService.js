import axios from "axios";
import {syncGitHubUser} from "./ProfileSyncService.js"

const GitHubBaseUrl = "https://api.github.com";

export const getGitHubUser = async(username) => {
    try{
        const response = await axios.get(`${GitHubBaseUrl}/users/${username}`);
        return response.data;
    }catch(err){
        console.log(err.response?.data || err.message)
        err.response?.data?.message || "Github API error"
    }
}

export const validateGitHubToken = async(token) => {
    try{
        const response = await axios.get(`${GitHubBaseUrl}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return{
            valid: true,
            user: response.data,
        }

    }catch(err){
        return{
            valid: false,
            message: err.response?.data?.message || "Invalid Token",
        }
    }
}

export const updateGitHubProfile = async (token, data) => {
    try{
        const response = await axios.patch(`${GitHubBaseUrl}/user`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
            }
        });
        return response.data;
    } catch(err){
        throw new Error(
            err.response?.data?.message || "Failed to update profile"
        )
    }
}