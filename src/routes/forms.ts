import { create, find } from "@controllers/forms";
import { Router } from "express";

const eventRouter = Router();

eventRouter.get("/:id/form", create);

eventRouter.post("/:id/form", find);

export default eventRouter;
