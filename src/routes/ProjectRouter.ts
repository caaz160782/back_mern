import  { Router,Request, Response, NextFunction } from "express";
import { getAllProjects } from "../controllers/projects";



const router =Router();

router.get("/",getAllProjects);
  
export default router;