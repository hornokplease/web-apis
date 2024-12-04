import express, { Express, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/allRoutes";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is backend for hopin dashboard");
});

app.use("/api/", router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
