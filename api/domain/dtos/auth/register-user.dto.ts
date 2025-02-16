import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public email    : string,
    public name     : string,
    public password : string,
  ){}

  static create(props: { [key: string]: any }): [ string?, RegisterUserDto? ] {
    const { name, email, password } = props;

    if(!name) return ['Missing name'];
    if(!email) return ['Missing email'];
    if(!regularExps.email.test(email)) return ['Email it is not valid'];
    if(!password) return ['Missing password'];
    if(password.length < 6) return ['Password it is to short'];

    return [undefined, new RegisterUserDto(email, name, password)];
  }
}