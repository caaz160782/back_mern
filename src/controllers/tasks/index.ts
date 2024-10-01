import { Request,Response } from "express";
import { Task } from "../../models/Task";

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        console.log('all task')
    //    const allProjects = await Project.find({})
    //    return res.status(200).json({
    //     message: "projects retrieved successfully",
    //     payload: allProjects
    //   });
    } catch (error) {
         console.error('Error al obtener proyectos:', error);
       return res.status(500).json({
         message: "Error en el servidor al obtener los proyectos",
         error: error.message,
       });
    }
  };   
