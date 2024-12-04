import { Pool } from "pg";

const pool = new Pool({
  max: 20,
  connectionString: "postgres://root:admin@localhost:5432/userdata",
  idleTimeoutMillis: 30000,
});

export default pool;
