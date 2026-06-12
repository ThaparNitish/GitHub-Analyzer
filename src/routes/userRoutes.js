import express from "express"
import { getProfile } from "../controller/userProfileController.js";

import { getSingleRepo, getUserReposController } from "../controller/userRepoController.js";

const router = express.Router()

router.get("/profile/:username", getProfile);
router.get("/:username/repos", getUserReposController);
router.get("/:username/repos/:repoName", getSingleRepo);

export default router; 