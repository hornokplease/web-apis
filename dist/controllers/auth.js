"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const db_config_1 = __importDefault(require("src/config/db.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AUTH_KEY = process.env.AUTH_KEY;
const getToken = async (user) => {
    const dbClient = await db_config_1.default.connect();
    try {
        if (!user)
            throw new Error("user object required for token generation");
        if (!AUTH_KEY)
            throw new Error("AUTH_KEY is not defined");
        const { rows } = await dbClient.query("SELECT * FROM session where id=$1", [
            user.id,
        ]);
        const session = rows[0];
        if (session) {
            jsonwebtoken_1.default.verify(session.session_token, AUTH_KEY, async (err) => {
                if (err) {
                    session.session_token = jsonwebtoken_1.default.sign({
                        id: user.id,
                        email: user.email,
                    }, AUTH_KEY, { expiresIn: "1h" });
                    const result = await dbClient.query("UPDATE session SET session_token=$1 WHERE id=$2", [session.session_token, user.id]);
                }
            });
        }
        return session.session_token;
    }
    catch (error) {
        throw new Error("Auth:" + error);
    }
};
exports.getToken = getToken;
