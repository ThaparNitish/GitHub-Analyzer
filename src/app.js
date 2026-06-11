import express from "express";
import dotenv from "dotenv";
import gitHubRoutes from "../src/routes/githubRoutes.js"

const app = express();

app.use(express.json())

app.use("/api/github", gitHubRoutes)
app.get("/health", (req, res) => {
    res.json({status: "Ok"});
})

export default app; 