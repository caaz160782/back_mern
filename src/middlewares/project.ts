import { Request, Response, NextFunction } from 'express';
import { IProject, Project } from '../models/Project'; 

declare global{
    namespace Express {
        interface Request {
            project : IProject
        }
    }
}

export  const validarProjectExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_project} = req.params           
        const project = await Project.findById(id_project)    
        if (!project) {
          return res.status(404).json({
            message: "project not found",
          });
        }
        req.project = project
        next()        
    } catch (error) {
        res.status(500).json({error:"Huno un error"})    
    }   
  };