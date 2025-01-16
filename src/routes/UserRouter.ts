import  { Router} from "express";
import { body, check, param } from 'express-validator';
import { validarErrores } from "../middlewares/generalErros";
import { validarProjectExist } from "../middlewares/project";
import { addMemberById, deleteMemberById, findMemberByEmail, getProjectTeam } from "../controllers/team";

const router =Router();

router.param('id_project',validarProjectExist)

/**Routes for teams */
router.get('/:id_project/team',[ 
   validarErrores   
 ],getProjectTeam)

router.post('/:id_project/team/find',[ 
    body('email').toLowerCase().isEmail().withMessage('email no valido')  ,              
    validarErrores   
 ],findMemberByEmail)

 router.post('/:id_project/team',[ 
    body('id').isMongoId().withMessage('id no valido'),
    validarErrores   
 ],addMemberById)

 router.delete('/:id_project/team/:idUser',[ 
    param('idUser').isMongoId().withMessage('id no valido'),
    validarErrores   
 ],deleteMemberById)


 export default router;

