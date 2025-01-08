// Looking to send emails in production? Check out our Email API/SMTP product!
import nodemailer from 'nodemailer'
import smtp from "./config";

const config=()=>{
    return{
        host: smtp.email.host,
        port: +smtp.email.port,
        auth: {
          user: smtp.email.user,
          pass: smtp.email.pass
        }
    }
}

export const transporter = nodemailer.createTransport(config());