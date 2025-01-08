require("dotenv").config();  

const config = {
  db: {
    nameDB: process.env.DB_NAME ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    host: process.env.DB_HOST ,
  },
  jwt: { secret: process.env.SECRET },
  app: { port: process.env.PORT },
  email :{
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,    
    pass: process.env.SMTP_PASS
  }

};

export default config;  
