import express from "express"
import { getProfile } from "../controller/userProfileController.js";

import { getSingleRepoUser, getUserReposController } from "../controller/userRepoController.js";

const router = express.Router()

router.get("/profile/:username", getProfile);
router.get("/:username/repos", getUserReposController);
router.get("/:username/repos/:repoName", getSingleRepoUser);

export default router; 