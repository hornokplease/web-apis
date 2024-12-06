import express, { Express, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/allRoutes";
import errorHandler from "./middleware/error";
import { checkDbConnection } from "./services/services";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/", router);

app.use(errorHandler);

async function startServer() {
  const dbConnected = await checkDbConnection();

  if (dbConnected) {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } else {
    console.error("Failed to start server due to database connection error.");
    process.exit(1); // Exit the process with failure code
  }
}


startServer();
