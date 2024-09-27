import { Request,Response } from "express";
import { Project } from '../../models/Project'; // Import the type for Rol if available

export const getAllProjects = async (req: Request, res: Response) => {
    try {
       const allProjects = await Project.find({})
       return res.status(200).json({
        message: "projects retrieved successfully",
        payload: allProjects
      });
    } catch (error) {
         console.error('Error al obtener proyectos:', error);
       return res.status(500).json({
         message: "Error en el servidor al obtener los proyectos",
         error: error.message,
       });
    }
  };   
export const createProject = async (req:Request, res:Response) => {
    try {
        console.log(req.body)
        const project= new Project(req.body);
        const savedProject = await project.save();
         res.status(201).json({
           message: "Created successfully",
           payload:  savedProject
       })
         
       } catch (error) {
        // Mostrar error en consola para depuración
        console.error('Error al crear el proyecto:', error);
       // Devolver una respuesta de error 500 si algo falla
       return res.status(500).json({
         message: "Error en el servidor al crear el proyecto",
         error: error.message, 
         });
     }
  };
export const getProjectById = async (req: Request, res: Response) => {
    try {
      const {idProject} = req.params 
      const project = await Project.findById(idProject)
  
      if (!project) {
        return res.status(404).json({
          message: "project not found",
        });
      }
  
      return res.status(200).json({
        message: "project retrieved successfully",
        payload: project
      });
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      return res.status(500).json({
        message: "Error en el servidor al obtener los proyectos",
        error: error.message,
      });
    }
  };  
export const updateProject = async (req: Request, res: Response) => {
    try {
      const { idProject } = req.params;
      const updatedProject = await Project.findByIdAndUpdate(
        idProject,
        req.body,
        { new: true, runValidators: true } // `new` returns the updated document, `runValidators` checks for validation
      );
  
      if (!updatedProject) {
        return res.status(404).json({
          message: "Project not found"
        });
      }
  
      return res.status(200).json({
        message: "Project updated successfully",
        payload: updatedProject
      });
  
    } catch (error) {
      console.error('Error al actualizar el Project:', error);
      return res.status(500).json({
        message: "Error en el servidor al actualizar el Project",
        error: error.message,
      });
    }
  }; 
export const deleteProject = async (req: Request, res: Response) => {  
    try {
      const { idProject } = req.params;
      const deletedProject = await Project.findByIdAndDelete(idProject);
   
      if (!deletedProject) {
        return res.status(404).json({
          message: "Project not found"
        });
      }
  
      return res.status(200).json({
        message: "Project deleted successfully"
      });
  
    } catch (error) {
      console.error('Error deleting Project:', error);
      return res.status(500).json({
        message: "Server error while deleting the Project",
        error: error.message,
      });
    }
  };
  
       
  


