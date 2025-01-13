import jwt from 'jsonwebtoken';
import config  from '../config/config'
const secret = config.jwt.secret

type payloadUser={
  id: string
  name:string
}

//expiresIn:"60s" "1h" // expires in 24 hours
const token =  (payload:payloadUser) => {
    const token =   jwt.sign(payload,secret, {expiresIn: "48h" } 
    );
    return token
  };

const verify = (token:string) => {
    const payload = jwt.verify(token, secret);
    return payload
 };

module.exports = {token,verify}