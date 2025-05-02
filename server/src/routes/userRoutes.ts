import { Router } from "express";
import { getUsers, postUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.get("/", postUser);

export default router;
