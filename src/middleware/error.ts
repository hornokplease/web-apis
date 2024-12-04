import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : err.message,
    message: err.message || "An unexpected error occured",
  });
};

export default errorHandler;
