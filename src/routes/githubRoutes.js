import express from "express"
import {getProfile, editProfile} from "../controller/githubProfileController.js"
import { validateToken } from "../middleware/githubMiddleware.js";

const router = express.Router();

router.get("/profile/:username", getProfile);
router.patch("/user/editProfile", validateToken, editProfile);

export default router; 