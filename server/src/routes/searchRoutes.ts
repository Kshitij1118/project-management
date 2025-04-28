import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";
import { search } from "../controllers/searchController";

const router = Router();

router.get("/", search);

export default router;
