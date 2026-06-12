import express from "express"
import { getProfile } from "../controller/userProfileController.js";

const router = express.Router()

router.get("/profile/:username", getProfile);

export default router; 