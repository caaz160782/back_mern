import { Request,Response } from "express";
import { Project } from '../../models/Project';
import { Task } from "../../models/Task";

export const createProduct = async (req:Request, res:Response) => {
  try {    
    const {id_project}= req.body;
    const project = await Project.findById(id_project)  
    if (!project) {
        return res.status(404).json({
          message: "project not found",
        });
      }
    const task= new Task(req.body);
    project.tasks.push(task.id)
    await task.save();
    await project.save();
    res.status(201).json({
         message: "Created successfully",
         //payload:  savedTask
     })  
   
  }
  catch (error) {
    console.error('Error al crear tarea:', error);
    // Devolver una respuesta de error 500 si algo falla
    return res.status(500).json({
      message: "Error en el servidor al crear tarea",
      error: error.message, 
      });
  }
}

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
