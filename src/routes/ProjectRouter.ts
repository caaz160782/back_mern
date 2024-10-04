import  { Router} from "express";
import { getAllProjects,
         createProject,
         getProjectById,
         updateProject,
         deleteProject,
         createTask
         } from "../controllers/projects";
import { check,param } from 'express-validator';
import { validarErrores } from "../middlewares/generalErros";
import { validarProjectExist } from "../middlewares/project";

const router =Router();

router.get("/",getAllProjects);
router.get("/:idProject",
    param('idProject').isMongoId().withMessage('id no valido'),
    validarErrores,
    getProjectById)
router.post(
    "/",
    [
      check('projectName')
        .isLength({ min: 5 })
        .withMessage('El nombre del proyecto debe tener al menos 5 caracteres'),
      check('clientName')
        .isLength({ min: 5 })
        .withMessage('El nombre del cliente debe tener al menos 5 caracteres'),
      check('description')
        .isLength({ min: 5 })
        .withMessage('La descripción debe tener al menos 5 caracteres'),
      validarErrores
    ],
    createProject
  );
router.patch('/:idProject',// Validaciones
       [
        param('idProject').isMongoId().withMessage('id no valido'),
        check('projectName')
          .isLength({ min: 5 })
          .withMessage('El nombre del proyecto debe tener al menos 5 caracteres'),
        check('clientName')
          .isLength({ min: 5 })
          .withMessage('El nombre del cliente debe tener al menos 5 caracteres'),
        check('description')
          .isLength({ min: 5 })
          .withMessage('La descripción debe tener al menos 5 caracteres'),
        validarErrores
      ]    
     ,updateProject );    
router.delete('/:idProject',
              param('idProject').isMongoId().withMessage('id no valido'),
              validarErrores,
              deleteProject );   
router.post('/:id_project/tasks',[ 
   check('name')
    .isLength({ min: 5 })
    .withMessage('El nombre de la tarea debe tener al menos 5 caracteres'),
   check('description')
    .isLength({ min: 5 })
    .withMessage('La descripción debe tener al menos 5 caracteres'),
  validarErrores      
],validarProjectExist,createTask)

  
export default router;