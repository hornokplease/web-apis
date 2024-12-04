import { Request, Response } from "express";
import pool from "src/config/db.config";

export const create = async (req: Request, res: Response): Promise<void>  => {
    const dbClient = await pool.connect();

    try {
        
    } catch (error) {
        
    } finally {
        dbClient.release()
    }
}
export const find = async (req: Request, res: Response): Promise<void>  => {
    const dbClient = await pool.connect();

    try {
        
    } catch (error) {
        
    } finally {
        dbClient.release()
    }
}
