import  { Router} from "express";
import { getAllTasks,createProduct } from "../controllers/tasks";

const router =Router();

router.get("/",getAllTasks);
router.post('/',createProduct)
export default router;