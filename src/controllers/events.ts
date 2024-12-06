import { Request, Response } from "express";
import pool from "../config/db.config";

export const create = async (req: Request, res: Response): Promise<void> => {
  const ownerId = req.body.user.id;
  const { name, location, start_date, end_date } = req.body;

  const dbClient = await pool.connect();

  try {
    const { rows: result } = await dbClient.query(
      `INSERT INTO events VALUES (DEFAULT,$1,$2,$3,$4,$5) RETURNING *`,
      [ownerId, name, location, start_date, end_date]
    );
    res.status(200).json(result[0]);
  } finally {
    dbClient.release();
  }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const ownerId = req.body.user.id;

  const dbClient = await pool.connect();

  try {
    const { rows: result } = await dbClient.query(
      "SELECT * FROM events WHERE owner_id=$1",
      [ownerId]
    );
    res.status(200).json(result);
  } finally {
    dbClient.release();
  }
};

export const find = async (req: Request, res: Response): Promise<void> => {
  const ownerId = req.body.user.id;
  const id = req.params.id;

  const dbClient = await pool.connect();

  try {
    const { rows: result } = await dbClient.query(
      "SELECT * FROM events WHERE owner_id=$1 AND id=$2",
      [ownerId, id]
    );
    res.status(200).json(result[0]);
  } finally {
    dbClient.release();
  }
};
