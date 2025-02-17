import { MongoDatabase } from '../../data';
import { envs } from '../../config';
import { AuthService } from '../../presentation/services/auth.service';

describe('Auth Controller', () => {

  let authService: AuthService;

  beforeAll(async() => {
    await MongoDatabase.connect({
      dbName  : envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL, 
    })
    authService = new AuthService();
  });
  
  it('debería registrar un usuario', async () => {
    const user = { name: 'Test User', email: `test_${Date.now()}@test.com`, password:'123456' };
    const response = await authService.registerUser(user);

    expect(response).toHaveProperty('token');
  })

  it('debería hacer el login de un usuario', async () => {
    const user = { email: `test@test.com`, password:'123456' };
    const response = await authService.loginUser(user);

    expect(response).toHaveProperty('token');
  })
});