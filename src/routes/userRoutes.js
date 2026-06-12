import express from "express"
import { getAllUsers, getProfile } from "../controller/userProfileController.js";

import { getSingleRepoUser, getUserReposController } from "../controller/userRepoController.js";
import {UserAnalysis} from "../controller/UserAnalysisController.js";
const router = express.Router()

router.get("/:username", getProfile);
router.get("/:username/repos", getUserReposController);
router.get("/:username/repos/:repoName", getSingleRepoUser);
router.get("/", getAllUsers)
router.get("/:username/analysis", UserAnalysis);

export default router; 