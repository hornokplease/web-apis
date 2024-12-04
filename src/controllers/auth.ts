import pool from "src/config/db.config";
import jwt from "jsonwebtoken";
import { USER } from "src/models/users";
import dotenv from "dotenv";

dotenv.config();

const AUTH_KEY = process.env.AUTH_KEY;

export const getToken = async (user: USER) => {
  const dbClient = await pool.connect();

  try {
    if (!user) throw new Error("user object required for token generation");
    if (!AUTH_KEY) throw new Error("AUTH_KEY is not defined");

    const { rows } = await dbClient.query("SELECT * FROM session where id=$1", [
      user.id,
    ]);

    const session = rows[0];

    if (session?.session_token) {
      jwt.verify(
        (session.session_token || "") as string,
        AUTH_KEY,
        async (err) => {
          if (!err) return session.session_token;
        }
      );
    }
    const new_session_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      AUTH_KEY,
      { expiresIn: "1h" }
    );

    const result = await dbClient.query(
      `INSERT INTO session 
      VALUES ($1,$2)
      ON CONFLICT (id)
      DO UPDATE SET
        session_token=EXCLUDED.session_token
      RETURNING *`,
      [user.id, new_session_token]
    );

    return result.rows[0]?.session_token;
  } catch (error) {
    throw new Error("Auth:" + error);
  }
};