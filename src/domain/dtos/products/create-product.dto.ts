import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name       : string,
    public readonly price      : number,
    public readonly description: string,
    public readonly user       : string, 
  ){}

  static create(props: { [key: string]: any }): [ string?, CreateProductDto? ] {
    const { name,price,description,user } = props;

    if(!name) return ['Missing name'];
    if(!price) return ['Missing price'];
    if(typeof price !== 'number') return ['Price must be a number'];
    if(!description) return ['Missing description'];
    if(!user) return ['Missing user'];
    if(!Validators.isValidID(user)) return ['Invalid User ID'];

    return [undefined, new CreateProductDto(name, price, description, user)];
  }
}