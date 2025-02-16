import { Request, Response } from "express";
import { CreateProductDto, CustomError, DeleteProductDto, GetProductsDto, UpdateProductDto } from "../../domain";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(public readonly productService: ProductService){}

  private _handleError = (error: unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }

  public getProducts = (req: Request, res: Response) => {
    const [error, getProductsDto] = GetProductsDto.create({
      ...req.body,
      user: req.body.user.id
    });

    if(error) return res.status(400).json({ error });
    
    this.productService.getProducts(getProductsDto!)
      .then((result) => res.json(result))
      .catch((error) => this._handleError(error, res));
  }

  public createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id
    });

    if(error) return res.status(400).json({ error });

    this.productService.createProduct(createProductDto!)
      .then((result) => res.json(result))
      .catch((error) => this._handleError(error, res));
  }

  public updateProduct = (req: Request, res: Response) => {
    const [error, updateProductDto] = UpdateProductDto.create({
      ...req.body,
      id: req.params.productId,
      user: req.body.user.id
    });

    if(error) return res.status(400).json({ error });

    this.productService.updateProduct(updateProductDto!)
      .then((updatedProduct) => res.json(updatedProduct))
      .catch((error) => this._handleError(error, res));
  }
  
  public deleteProduct = (req: Request, res: Response) => {
    const [error, deleteProductDto] = DeleteProductDto.create({
      id: req.params.productId,
      user: req.body.user.id
    });

    if(error) return res.status(400).json({ error });

    this.productService.deleteProduct(deleteProductDto!)
      .then((productDeleted) => res.json(productDeleted))
      .catch((error) => this._handleError(error, res));
  }
}