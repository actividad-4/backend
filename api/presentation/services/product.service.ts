import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, DeleteProductDto, GetProductsDto, UpdateProductDto } from "../../domain";

export class ProductService {
  constructor(){}

  public async getProducts(getProductsDto: GetProductsDto) {
    const products = await ProductModel.find({ user: getProductsDto.user })
    return { products }
  }

  public async createProduct(createProductDto: CreateProductDto) {
    try {
      const product = new ProductModel({ ...createProductDto });
      await product.save()

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${ error }`)
    }
  }

  public async updateProduct(updateProductDto: UpdateProductDto) {
    const {id, name, price, description, user } = updateProductDto

    const productExists = await ProductModel.findById(id)
    if(!productExists) throw CustomError.notFound('Product does not exist')
      
    const isMatching = await ProductModel.exists({ _id: id, user });
    if(!isMatching) throw CustomError.badRequest('Invalid user to update');

    try {
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: id },
        { $set: { name, price, description } },
        { new: true }
      );

      return updatedProduct;
    } catch (error) {
      throw CustomError.internalServer(`${ error }`)
    }
  }

  public async deleteProduct(deleteProductDto: DeleteProductDto) {
    const {id, user } = deleteProductDto

    const productExists = await ProductModel.findById(id)
    if(!productExists) throw CustomError.notFound('Product does not exist')

    const isMatching = await ProductModel.exists({ _id: id, user });
    if(!isMatching) throw CustomError.badRequest('Invalid user to delete');

    try {
      await ProductModel.deleteOne({ _id: id });
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw CustomError.internalServer(`${ error }`)
    }
  }
}