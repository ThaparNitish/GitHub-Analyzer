import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nitish2108",
  database: "github_app",
  waitForConnections: true,
  connectionLimit: 10,
});