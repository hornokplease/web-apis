import express, { Express, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/users";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is backend for hopin dashboard");
});

app.use("/api/auth/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
