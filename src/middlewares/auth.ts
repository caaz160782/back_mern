import { Request, Response, NextFunction } from 'express';
import { IUser, User } from "../models/user";
const jwt = require("../helpers/jwt");

declare global {
    namespace Express {
        interface Request {
            user ?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

const bearer=req.headers.authorization
    if(!bearer){
        const error = new Error('no autorizado')
        return res.status(401).json({error:error.message})
    }  
   const [,token]= bearer.split(' ')
   try {
        const verify = jwt.verify(token);
        const user = await User.findById(verify.id).select('_id name email')
        if(user){
           req.user=user 
           // Si no hay errores, continuar al siguiente middleware o controlador
           next();
        }else{
            return  res.status(500).json({error:'Token no valido'}) 
        }    
   } catch (error) {
    return  res.status(500).json({error:'Token no valido'}) 
   }   
 
};