import { Request,Response } from "express";
import { Task } from "../../models/Task";

export const createTask = async (req:Request, res:Response) => {
  try {    
   const task= new Task(req.body);
    task.id_project= req.project.id
    req.project.tasks.push(task.id)
    await Promise.allSettled([task.save(),req.project.save()])
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
};
export const getAllTasks = async (req: Request, res: Response) => {
  try {
     const allTasks = await Task.find({id_project:req.project.id}).populate('id_project')
     return res.status(200).json({
      message: "tasks retrieved successfully",
      payload: allTasks
    });
  } catch (error) {
       console.error('Error al obtener proyectos:', error);
     return res.status(500).json({
       message: "Error en el servidor al obtener los proyectos",
       error: error.message,
     });
  }
};  

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const {id_task} = req.params 
    const task = await Task.findById(id_task)//.populate('id_project')

    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }
    if (task.id_project.toString() !== req.project.id) {
      return res.status(404).json({
        message: "task not in project",
      });
    }

    return res.status(200).json({
      message: "task retrieved successfully",
      payload: task
    });
  } catch (error) {
    console.error('Error al obtener task:', error);
    return res.status(500).json({
      message: "Error en el servidor al obtener  task",
      error: error.message,
    });
  }
};


