import { Request, Response } from "express";
import pool from "../config/db.config";
import { getToken } from "./auth";
import { sanitizeUser } from "src/utils/utils";

export const create = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  if (!name) {
    res.status(400).json({ error: "Missing required field: name" });
    return;
  }
  if (!email) {
    res.status(400).json({ error: "Missing required field: email" });
    return;
  }
  if (!password) {
    res.status(400).json({ error: "Missing required field: password" });
    return;
  }

  const dbClient = await pool.connect();

  try {
    let { rows: result } = await dbClient.query(
      "INSERT INTO users VALUES (DEFAULT,$1,$2,$3) RETURNING *",
      [name, email, password]
    );

    const newUser = result[0];

    if (!newUser) throw new Error("db error while inserting");

    const sessionToken = await getToken(newUser);

    res.status(200).json({ user: sanitizeUser(newUser), sessionToken });
  } catch (error: any) {
    if (error.code == "23505") {
      res.status(409).send({ error: "Email already registered" });
    } else {
      console.error(error);
      res.status(500).send(error);
    }
  } finally {
    dbClient.release();
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ error: "Missing email field" });
    return;
  }
  if (!password) {
    res.status(400).json({ error: "Missing password field" });
    return;
  }

  const dbClient = await pool.connect();

  try {
    const { rows } = await dbClient.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    const existingUser = rows[0];
    if (!existingUser || existingUser.password !== password) {
      res.status(404).json({
        error: "Incorrect credentials",
        message: "Incorrect email or password",
      });
    } else {
      const sessionToken = await getToken(existingUser);
      res.status(200).json({ user: sanitizeUser(existingUser), sessionToken });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  } finally {
    dbClient.release();
  }
};
