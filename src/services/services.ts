import pool from "../config/db.config";

export async function checkDbConnection() {
  try {
    console.log("Connecting to DB");
    await pool.connect();
    console.log("Connected to DB successfully!");
    return true;
  } catch (err) {
    console.error("Error connecting to DB:", err);
    return false;
  }
}
