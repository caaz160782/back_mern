import { Request,Response } from "express";
import { Project } from '../../models/Project'; // Import the type for Rol if available

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        console.log('desde controller router')
    //   const products = await Product.findAll();
    //   return res.status(200).json({
    //     message: "Products retrieved successfully",
    //     payload: products
    //   });
    } catch (error) {
        console.log(error)
    //   console.error('Error al obtener productos:', error);
    //   return res.status(500).json({
    //     message: "Error en el servidor al obtener los productos",
    //     error: error.message,
    //   });
    }
  };   




