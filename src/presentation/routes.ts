import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { ProductRoutes } from './products/routes';
import { AuthMiddleware } from './middlewares/auth.middleware';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    // Agregamos el middleware AuthMiddleware para proteger nuesras rutas privadas
    router.use('/api/products', [AuthMiddleware.validateJWT], ProductRoutes.routes );

    return router;
  }
}