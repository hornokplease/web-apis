import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/db.config";
import { USER } from "../models/users";

dotenv.config();

const AUTH_KEY = process.env.AUTH_KEY;

export const getToken = async (user: USER) => {
  const dbClient = await pool.connect();

  try {
    if (!user) {
      const error = new Error("user object required for token generation");
      (error as any).status = 400;
      throw error;
    }
    if (!AUTH_KEY) {
      const error = new Error("AUTH_KEY is not defined");
      (error as any).status = 400;
      throw error;
    }

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
  } finally {
    dbClient.release();
  }
};
