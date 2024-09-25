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
};

export default config;  
