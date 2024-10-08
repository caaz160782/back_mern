import  { Router} from "express";
import { createTask, getAllTasks, getTaskById } from "../controllers/tasks";
import { check, param } from 'express-validator';
import { validarErrores } from "../middlewares/generalErros";
import { validarProjectExist } from "../middlewares/project";



const router =Router();

router.param('id_project',validarProjectExist)

router.post('/:id_project/tasks',[ 
    check('name')
     .isLength({ min: 5 })
     .withMessage('El nombre de la tarea debe tener al menos 5 caracteres'),
    check('description')
     .isLength({ min: 5 })
     .withMessage('La descripción debe tener al menos 5 caracteres'),
   validarErrores      
 ],createTask)
 
 router.get("/:id_project/tasks",[    
     validarErrores],   
     getAllTasks
 );

 router.get("/:id_project/tasks/:id_task",[
    param('id_task').isMongoId().withMessage('id no valido'),
    validarErrores],    
    getTaskById
);

 


export default router;