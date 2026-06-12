import express from "express"
import {getGitHubProfile, editGitHubProfile} from "../controller/githubProfileController.js"
import { validateToken } from "../middleware/githubMiddleware.js";
import { getGitHubRepos } from "../controller/githubRepoController.js";

const router = express.Router();

router.get("/:username", getGitHubProfile);
router.patch("/user/editProfile", validateToken, editGitHubProfile);
router.get("/:username/repos", getGitHubRepos)

export default router; 