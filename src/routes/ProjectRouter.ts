import { Router } from "express";
import {
    getAllProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
  
} from "../controllers/projects";
import { check, param } from 'express-validator';
import { validarErrores } from "../middlewares/generalErros";
import { validarProjectExist } from "../middlewares/project";
import { authenticate } from "../middlewares/auth";


const router = Router();
router.use( authenticate )
/**
 * @swagger
 * components: 
 *  schemas:
 *    Project:
 *      type: object
 *      properties:
 *        id:
 *          type: mongoid
 *          description: The product ID
 *          example: 66f639cf8eded2c85604d281
 *        projectName:
 *          type: string
 *          description: The product name
 *          example: Xbox
 *        clientName:
 *          type: string
 *          description: The product name
 *          example: Xbox
 *        description:
 *          type: string
 *          description: The product name
 *          example: Xbox
 */

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: API operations related to Projects
 */


/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Obtiene la lista de todos los proyectos
 *     responses:
 *       200:
 *         description: Una lista de proyectos
 */
router.get("/",/* authenticate,*/ getAllProjects);

/**
 * @swagger
 * /api/projects/{idProject}:
 *   get:
 *     tags: [Projects]
 *     summary: Obtiene un proyecto por su ID
 *     parameters:
 *       - name: idProject
 *         in: path
 *         description: ID del proyecto
 *         required: true
 *         schema:
 *           type: string
 *           format: mongoId
 *     responses:
 *       200:
 *         description: Detalles del proyecto
 *       404:
 *         description: Proyecto no encontrado
 */
router.get("/:idProject", 
    param('idProject').isMongoId().withMessage('id no valido'),
    validarErrores,
    getProjectById
);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags: [Projects]
 *     summary: Crea un nuevo proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 minLength: 5
 *               clientName:
 *                 type: string
 *                 minLength: 5
 *               description:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       201:
 *         description: Proyecto creado
 *       400:
 *         description: Error de validación
 */
router.post(
    "/",  
    [
        check('projectName')
            .isLength({ min: 3 })
            .withMessage('El nombre del proyecto debe tener al menos 5 caracteres'),
        check('clientName')
            .isLength({ min: 5 })
            .withMessage('El nombre del cliente debe tener al menos 5 caracteres'),
        check('description')
            .isLength({ min: 5 })
            .withMessage('La descripción debe tener al menos 5 caracteres'),
        validarErrores
    ],
    createProject
);

/**
 * @swagger
 * /api/projects/{idProject}:
 *   patch:
 *     tags: [Projects]
 *     summary: Actualiza un proyecto existente
 *     parameters:
 *       - name: idProject
 *         in: path
 *         description: ID del proyecto
 *         required: true
 *         schema:
 *           type: string
 *           format: mongoId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 minLength: 5
 *               clientName:
 *                 type: string
 *                 minLength: 5
 *               description:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 *       404:
 *         description: Proyecto no encontrado
 */
router.patch('/:idProject', // Validaciones
    [
        param('idProject').isMongoId().withMessage('id no valido'),
        check('projectName')
            .isLength({ min: 3 })
            .withMessage('El nombre del proyecto debe tener al menos 5 caracteres'),
        check('clientName')
            .isLength({ min: 5 })
            .withMessage('El nombre del cliente debe tener al menos 5 caracteres'),
        check('description')
            .isLength({ min: 5 })
            .withMessage('La descripción debe tener al menos 5 caracteres'),
        validarErrores
    ],
    updateProject
);

/**
 * @swagger
 * /api/projects/{idProject}:
 *   delete:
 *     tags: [Projects] 
 *     summary: Elimina un proyecto
 *     parameters:
 *       - name: idProject
 *         in: path
 *         description: ID del proyecto
 *         required: true
 *         schema:
 *           type: string
 *           format: mongoId
 *     responses:
 *       204:
 *         description: Proyecto eliminado
 *       404:
 *         description: Proyecto no encontrado
 */
router.delete('/:idProject',
              param('idProject').isMongoId().withMessage('id no valido'),
              validarErrores,
              deleteProject );   




              



export default router;
