import express from "express";
import dotenv from "dotenv";
import gitHubRoutes from "../src/routes/githubRoutes.js"
import userRoutes from "../src/routes/userRoutes.js"

const app = express();

app.use(express.json())

app.use("/api/github", gitHubRoutes)
app.use("/api/users", userRoutes)
app.get("/health", (req, res) => {
    res.json({status: "Ok"});
})

export default app; 