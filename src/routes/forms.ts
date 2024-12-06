import { Router } from "express";
import { create, find } from "../controllers/forms";

const eventRouter = Router();

eventRouter.get("/:id/form", create);

eventRouter.post("/:id/form", find);

export default eventRouter;
