import { envs } from "../../config";
import { MongoDatabase } from "../../data";
import { ProductService } from "../../presentation/services/product.service";

describe('Product Service', () => {
  let productService: ProductService;

  const testUserId = '67b2c32096d3ef763d1f96e2'

  beforeAll(async() => {
    await MongoDatabase.connect({
      dbName  : envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL, 
    })
    productService = new ProductService();
  });

  it('debería crear un producto', async () => {
    const newProduct = { name: `Test ${Date.now()}`, price: 9999, description:`Test ${Date.now()} description`, user:testUserId };
    const product = await productService.createProduct(newProduct);

    expect(product).toHaveProperty('_id');
    expect(product.name).toContain('Test');
  });

  it('debería obtener una lista de productos', async () => {
    const { products } = await productService.getProducts({user: testUserId});
    expect(products).toBeInstanceOf(Array);
  });
});