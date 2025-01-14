import { Router } from "express";
import { body, check, param } from 'express-validator';
import { AuthController } from "../controllers/auth";
import { validarErrores } from "../middlewares/generalErros";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post('/create-account',
    body('name').notEmpty().withMessage('el nombre no puede ser vacio'),   
    body('email').isEmail().withMessage('email no valido')  ,
    body('password').isLength({min:8}).withMessage('el psw es muy corto'),
    body('password_confirmation').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('los PAssword no son iguales')
        }
        return true
    }),
    validarErrores,
    AuthController.createAccount);

router.post('/confirm-account',
        body('token').notEmpty().withMessage('el token no puede ser vacio'),   
        validarErrores,
        AuthController.confirmAccount);    

router.post('/login',
    body('email').isEmail().withMessage('email no valido')  ,
    body('password').notEmpty().withMessage('el psw no puede ser vacio'),   
            validarErrores,
            AuthController.login);      
            
router.post('/request-code',
            body('email').isEmail().withMessage('email no valido')  ,              
            validarErrores,
            AuthController.requestConfirmationCode);

router.post('/forgot-password',
             body('email').isEmail().withMessage('email no valido')  ,              
             validarErrores,
             AuthController.forgotPassword);

router.post('/validate-token',
                body('token').notEmpty().withMessage('el token no puede ser vacio'),   
                validarErrores,
                AuthController.validateToken);  

router.post('/update-password/:token',
           param('token').isNumeric().withMessage('token no valido'),
           body('password').isLength({min:8}).withMessage('el psw es muy corto'),
           body('password_confirmation').custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error('los PAssword no son iguales')
            }
            return true
            }),
            validarErrores,
            AuthController.updatePasswordWithToken);  

router.get('/user',authenticate,
    AuthController.user
)            



export default router;