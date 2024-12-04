import { Router } from "express";
import userRouter from "./users";
import eventRouter from "./events";
import { auth } from "src/middleware/auth";

const router = Router();

router.use("/auth", userRouter);
router.use("/events", auth, eventRouter);

export default router;
