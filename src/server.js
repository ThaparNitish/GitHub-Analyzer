import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import app from "./app.js";

// optional debug
console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});