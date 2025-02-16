import { CustomError } from "../errors/custom.error"

export class UserEntity {

  constructor(
    public id       : string,
    public email    : string,
    public name     : string,
    public password : string,
  ){}

  static fromObject( object: { [key: string]: any }) {
    const { id, _id, email, name, password} = object

    if(!id || !_id) throw CustomError.badRequest('Missing id');
    if(!email) throw CustomError.badRequest('Missing email');
    if(!name) throw CustomError.badRequest('Missing id');
    if(!password) throw CustomError.badRequest('Missing password');

    return {
      id: id || _id,
      email, 
      name, 
      password
    }
  }
}