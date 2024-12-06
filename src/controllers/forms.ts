import { Request, Response } from "express";
import pool from "../config/db.config";

export const create = async (req: Request, res: Response): Promise<void>  => {
    const dbClient = await pool.connect();

    try {
        
    } finally {
        dbClient.release()
    }
}
export const find = async (req: Request, res: Response): Promise<void>  => {
    const dbClient = await pool.connect();

    try {
        
    } finally {
        dbClient.release()
    }
}
