import { transporter } from "../config/nodemailer"
import config from "../config/config"

interface IEmail {
    email: string
    name: string
    token: string 
}

export class AuthEmail {
    static sendConfirmationEmail = async (user:IEmail)=>{
       const info= await transporter.sendMail({
            from : 'uptask <admin@upstask.com>',
            to: user.email,
            subject: 'uptask -confirma tu cuenta',
            html:`<p> Hola ${user.name}, has creado tu cuenta  
                   solo debes de confirmar tu cuenta  </p>
                   <p>Visita el sig link</p>
                   <a href="${config.urlFront}/auth/confirm-account">Confirmar cuenta</a>
                   <p> Ingresa el siguiente codigo ${user.token}</p>
                   <p>Expira en 10 minutos</p>
                   `
        })
        console.log('Email enviado', info.messageId)
    }
}
