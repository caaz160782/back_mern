import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validarErrores = (req: Request, res: Response, next: NextFunction) => {
  // Verificar si hay errores de validación
  const errores = validationResult(req);
  
  if (!errores.isEmpty()) {
    // Si hay errores, devolver un código 400 con los errores
    return res.status(400).json({
      message: "Errores de validación",
      errors: errores.array()
    });
  }
  
  // Si no hay errores, continuar al siguiente middleware o controlador
  next();
};