import express from "express"
import { getProfile } from "../controller/userProfileController.js";

import { getUserReposController } from "../controller/userRepoController.js";

const router = express.Router()

router.get("/profile/:username", getProfile);
router.get("/:username/repos", getUserReposController);

export default router; 