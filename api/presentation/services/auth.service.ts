import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor(){}

  public async registerUser( registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if(existUser) throw CustomError.badRequest('Email it is already taken');

    try {
     const user = new UserModel(registerUserDto);
     //Encriptamos la contraseña
     user.password = BcryptAdapter.hash(registerUserDto.password)
     await user.save();

     const { password, ...restUserEntity } = UserEntity.fromObject(user)

     // Generamos el JWT para regresarlo al momento de que el login fue exitoso
     const token = await JwtAdapter.generateToken({ id: user.id });
     if(!token) throw CustomError.internalServer('Error while creating JWT');
     
      return {
        user: restUserEntity,
        token: token
      }
    } catch (error) {
      throw CustomError.internalServer(`${ error }`)
    }
  }

  public async loginUser( loginUserDto: LoginUserDto ) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if(!user) throw CustomError.badRequest('Email does not exist');

    const isMatching: boolean = BcryptAdapter.compare({
      password: loginUserDto.password,
      hashed: user.password
    })

    if(!isMatching) throw CustomError.badRequest('Email or password are not correct');

    // Generamos el JWT para regresarlo al momento de que el login fue exitoso
    const token = await JwtAdapter.generateToken({ id: user.id });
    if(!token) throw CustomError.internalServer('Error while creating JWT');

    return { token }
  }
}