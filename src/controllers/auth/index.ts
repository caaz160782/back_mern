import { Request,Response } from "express";
import { User } from "../../models/user";
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

        const pswHash = await hash.hashPassword(password)
        const user= new User({
            name,
            password:pswHash,
            email
        });
        const savedUser = await user.save();
    //      res.status(201).json({
    //        message: "Created user successfully",
    //        payload:  savedUser
    //    })
        res.send('Cuenta creada, revisa tu email  para confirmar')

              
        } catch (error) {
            console.error('Error al crear usuario:', error);
            return res.status(500).json({
              message: "Error al crear usuario",
              error: error.message,
            });
        }
        
    }
}