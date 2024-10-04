import swaggerJSDoc from "swagger-jsdoc";

// Basic Swagger definition
const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {  // Changed from swaggerDefinition to definition
    openapi: '3.0.2',
    tags: [
      {
        name: 'Projects',
        description: 'API operations related to Projects',
      }
    ],
    info: {
      title: 'PERN',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
  },
  // APIs where the endpoints are documented
  apis: ['./src/routes/*.ts'],
}; 

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;