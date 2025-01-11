import { Request,Response } from "express";
import { User } from "../../models/user";
import { Token } from "../../models/Token";
import { generateToken } from "../../helpers/token";
import { AuthEmail } from "../../emails/AuthEmails";
const hash = require("../../helpers//bcrypt")
const jwt = require("../../helpers/jwt");

export class AuthController {

    static createAccount = async (req: Request,res:Response)=>{
        try {
        const { name, password, email } = req.body;
        const userExists = await User.findOne({email})
        if(userExists){
            const error = new Error('el Usuario ya esta Registrado');
            return res.status(409).json({error: error.message})
        }
        const user = new User(req.body)
        user.password=  await hash.hashPassword(password)
        //generar token
        const token = new Token()
        token.token= generateToken()
        token.user = user.id
       
        AuthEmail.sendConfirmationEmail({
            email:user.email,
            name:user.name,
            token:token.token 
        })

        await Promise.allSettled([user.save(), token.save()]);           
        res.send('Cuenta creada, revisa tu email  para confirmar')              
        } catch (error) {
            console.error('Error al crear usuario:', error);
            return res.status(500).json({
              message: "Error al crear usuario",
              error: error.message,
            });
        }        
    }

    static confirmAccount = async (req: Request,res:Response)=>{
        try {
           const {token} = req.body           
           const tokenExist= await Token.findOne({token})
           if(!tokenExist){
            const error = new Error('el token ya no esta disponible o no existe');
            return res.status(401).json({error: error.message})
            }
            const user = await User.findById(tokenExist.user)
            user.confirmed= true
            await Promise.allSettled([user.save(), tokenExist.deleteOne()]);  
            res.send('Cuenta confirmada')   
        } catch (error) {
            console.error('Error token:', error);
            return res.status(500).json({
              message: "Error token",
              error: error.message,
            });
        }        
    }

    static login = async (req: Request,res:Response)=>{
        try {
          const {email,password} = req.body           
          const userExists = await User.findOne({email})
          if(!userExists){
            const error = new Error('el Usuario no esta Registrado');
            return res.status(404).json({error: error.message})
             }
          if(!userExists.confirmed){
            const token = new Token()
            token.token= generateToken()
            token.user = userExists.id
           
            AuthEmail.sendConfirmationEmail({
                email:userExists.email,
                name:userExists.name,
                token:token.token 
            })
            token.save()
            const error = new Error('se ha enviado un nuevo token');
            return res.status(401).json({error: error.message})
          }
          const match = await hash.verifyPassword(password, userExists.password);
          if (!match) {
              const error = new Error('error psw');
             return res.status(409).json({error: error.message})
           }        
          const payload = {
            id:  userExists._id.toString(),
            name: userExists.name,           
          };
          const jwtRes = jwt.token(payload);
          res.status(202).json({jwtRes });

        } catch (error) {
            console.error('Error login:', error);
            return res.status(500).json({
              message: "Error login",
              error: error.message,
            });
        }        
    }

    static requestConfirmationCode = async (req: Request,res:Response)=>{
      try {
      const { email } = req.body;
      const user = await User.findOne({email})
      if(!user){
          const error = new Error('el Usuario na esta Registrado');
          return res.status(409).json({error: error.message})
      }

      if(user.confirmed){
        const error = new Error('el Usuario ya fue confirmado');
        return res.status(409).json({error: error.message})
    }
      //generar token
      const token = new Token()
      token.token= generateToken()
      token.user = user.id
     
      AuthEmail.sendConfirmationEmail({
          email:user.email,
          name:user.name,
          token:token.token 
      })

      await Promise.allSettled([user.save(), token.save()]);           
      res.send('se envio un token a tu email')              
      } catch (error) {
          console.error('Error al crear usuario:', error);
          return res.status(500).json({
            message: "Error al crear usuario",
            error: error.message,
          });
      }        
    }
    
    static forgotPassword = async (req: Request,res:Response)=>{
      try {
      const { email } = req.body;
      const user = await User.findOne({email})
      if(!user){
          const error = new Error('el Usuario na esta Registrado');
          return res.status(409).json({error: error.message})
      }    
      //generar token
      const token = new Token()
      token.token= generateToken()
      token.user = user.id
      await token.save()
      AuthEmail.sendPasswordResetToken({
          email:user.email,
          name:user.name,
          token:token.token 
      })      
      res.send('Revisar tu email para instrucciones')              
      } catch (error) {
          console.error('Error al crear usuario:', error);
          return res.status(500).json({
            message: "Error al crear usuario",
            error: error.message,
          });
      }        
    }

    static validateToken = async (req: Request,res:Response)=>{
      try {
         const {token} = req.body           
         const tokenExist= await Token.findOne({token})
         if(!tokenExist){
          const error = new Error('el token ya no esta disponible o no existe');
          return res.status(401).json({error: error.message})
          }
        

          res.send('Token válido, define tu nuevo password')   
      } catch (error) {
          console.error('Error token:', error);
          return res.status(500).json({
            message: "Error token",
            error: error.message,
          });
      }        
  }

  static updatePasswordWithToken = async (req: Request,res:Response)=>{
    try {
       const {token} = req.params     
       const { password } = req.body;      
       const tokenExist= await Token.findOne({token})
       if(!tokenExist){
        const error = new Error('el token ya no esta disponible o no existe');
        return res.status(401).json({error: error.message})
        }
        const user = await User.findById(tokenExist.user)
        user.password=  await hash.hashPassword(password)
        await Promise.allSettled([user.save(), tokenExist.deleteOne()]);  
        res.send('Password modificado')   
    } catch (error) {
        console.error('Error token:', error);
        return res.status(500).json({
          message: "Error token",
          error: error.message,
        });
    }        
}

}