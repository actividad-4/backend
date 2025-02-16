import { Router } from 'express';

import { ProductController } from './controller';
import { ProductService } from '../services/product.service';

export class ProductRoutes {

  static get routes(): Router {

    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService)
    
    // Definir las rutas
    router.get('/', controller.getProducts );
    router.post('/', controller.createProduct );
    router.put('/:productId', controller.updateProduct );
    router.delete('/:productId', controller.deleteProduct );

    return router;
  }
}