import { Router } from "express";
import { create, find, findAll } from "../controllers/events";

const eventRouter = Router();

eventRouter.get("/", findAll);

eventRouter.get("/:id", find);

eventRouter.post("/", create);

export default eventRouter;
