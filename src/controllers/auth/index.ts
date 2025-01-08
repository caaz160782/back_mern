import { Request,Response } from "express";
import { User } from "../../models/user";
import { Token } from "../../models/Token";
import { generateToken } from "../../helpers/token";
import { transporter } from "../../config/nodemailer";
import { AuthEmail } from "../../emails/AuthEmails";
const hash = require("../../helpers//bcrypt")

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


}