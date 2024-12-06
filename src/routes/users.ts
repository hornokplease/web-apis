import { Router } from "express";
import { create, login } from "../controllers/users";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", create);

export default userRouter;
