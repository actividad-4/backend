import { Request, Response } from "express";

export class AuthController {
  constructor(){}

  public regiserUser(req: Request, res: Response) {
    return res.json('registerUser');
  }

  public loginUser(req: Request, res: Response) {
    return res.json('loginUser');
  }
}