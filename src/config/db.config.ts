import { Pool } from "pg";
import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();

const pool = new Pool({
  max: 20,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  database: process.env.DB_DATABASE,
  ssl: { 
    rejectUnauthorized: true,
    ca: readFileSync('/etc/ssl/certs/ap-south-1-bundle.pem').toString(), 
  },
  idleTimeoutMillis: 30000,
});

export default pool;
