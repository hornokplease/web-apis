"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    max: 20,
    connectionString: "postgres://root:admin@localhost:5432/userdata",
    idleTimeoutMillis: 30000,
});
exports.default = pool;
