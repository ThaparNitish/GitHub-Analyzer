import express from "express";
import gitHubRoutes from "../src/routes/githubRoutes.js"
import userRoutes from "../src/routes/userRoutes.js"
import { getDB } from "../src/config/db.js";
const app = express();

app.use(express.json())

app.use("/api/github", gitHubRoutes)
app.use("/api/users", userRoutes)


app.get("/db-test", async (req, res) => {
  try {
    const db = getDB();

    const conn = await db.getConnection();
    conn.release();

    return res.json({
      success: true,
      message: "DB connected"
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err.message
    });
  }
});

export default app; 