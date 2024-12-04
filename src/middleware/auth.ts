import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const AUTH_KEY = process.env.AUTH_KEY;
export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("x-auth-header");
    if (!token) {
      res.status(403).json({ error: "access denied" });
      return;
    }
    if (!AUTH_KEY) throw new Error("AUTH_KEY missing");
    const decoded = jwt.verify(token, AUTH_KEY);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token Relogin" });
  }
};
