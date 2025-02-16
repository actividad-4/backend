import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";

export class AuthController {
  constructor(public readonly authService: AuthService){}

  private _handleError = (error: unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }

  public registerUser = (req: Request, res: Response) => {
    // Se valida el request contra nuestro Dto para asegurarnos de que la integridad del body sea el correcto
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if(error) return res.status(400).json({error});

    this.authService.registerUser(registerUserDto!)
      .then(user => res.json(user))
      .catch(error => this._handleError(error, res));
  }

  public loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if(error) return res.status(400).json({error});

    this.authService.loginUser(loginUserDto!)
      .then(login => res.json(login))
      .catch(error => this._handleError(error, res));
  }
}