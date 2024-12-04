import { create, find, findAll } from "@controllers/events";
import { Router } from "express";

const eventRouter = Router();

eventRouter.get("/", findAll);

eventRouter.get("/:id", find);

eventRouter.post("/", create);

eventRouter.get("/:id/form");

eventRouter.post("/:id/form");

export default eventRouter;
