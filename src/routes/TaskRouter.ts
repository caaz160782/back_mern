import  { Router} from "express";
import { getAllTasks } from "../controllers/tasks";

const router =Router();

router.get("/",getAllTasks);

export default router;