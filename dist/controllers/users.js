"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.create = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const auth_1 = require("./auth");
const create = async (req, res) => {
    const { name, email, password, } = req.body;
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
    const dbClient = await db_config_1.default.connect();
    try {
        let result = await dbClient.query("INSERT INTO users VALUES (DEFAULT,$1,$2,$3) RETURNING *", [name, email, password]);
        if (!result)
            throw new Error("db error while inserting");
        res.status(200).json();
        dbClient.release();
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
exports.create = create;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.status(400).json({ error: "Missing email field" });
        return;
    }
    if (!password) {
        res.status(400).json({ error: "Missing password field" });
        return;
    }
    const dbClient = await db_config_1.default.connect();
    try {
        const { rows } = await dbClient.query("SELECT * FROM users WHERE email=$1", [email]);
        let existingUser = rows[0];
        if (!existingUser || existingUser.password !== password) {
            res.status(404).json({
                error: "Incorrect credentials",
                message: "Incorrect email or password",
            });
            return;
        }
        const sessionToken = await (0, auth_1.getToken)(existingUser);
        res.status(200).json({ existingUser, sessionToken });
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
exports.login = login;
