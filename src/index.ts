
import config from './config/config'; 
import cors from 'cors' 
import { corsConfig } from './config/cors';
import { db } from "./config/db";
import express, { Request, Response } from 'express';
import colors from 'colors';
import apiRouter from './routes';
import swaggerUi  from 'swagger-ui-express';
import swaggerDocs from './config/swagger';
import morgan from 'morgan';

const server = express();
server.use(cors(corsConfig))

const PORT = config.app.port

server.use(morgan('dev'))

server.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, TypeScript con Express!');
});

server.use(express.json());
apiRouter(server);

// Ruta para la documentación Swagger
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Conectar a la base de datos al iniciar el servidor
db.connect()
  .then(() => {
    console.log(colors.green("DB conectada"));
    server.listen(PORT, () => {
      console.log(colors.green(`Server is running on http://localhost:${PORT}`));
    });
  })
  .catch((err) => {
    console.error(colors.red(`Conexión rechazada, ${err}`));
  });