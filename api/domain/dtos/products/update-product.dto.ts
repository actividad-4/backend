import { Validators } from "../../../config";

export class UpdateProductDto {
  private constructor(
    public readonly id          : string,
    public readonly name        : string,
    public readonly price       : number,
    public readonly description : string,
    public readonly user        : string,
  ){}

  static create(props: { [key: string]: any }): [ string?, UpdateProductDto? ] {
    const { id, name,price,description,user } = props;

    if(!id) return ['Missing Product ID'];
    if(!Validators.isValidID(id)) return ['Invalid Product ID'];
    if(!name) return ['Missing name'];
    if(!price) return ['Missing price'];
    if(typeof price !== 'number') return ['Price must be a number'];
    if(!description) return ['Missing description'];
    if(!user) return ['Missing user'];
    if(!Validators.isValidID(user)) return ['Invalid User ID'];

    return [undefined, new UpdateProductDto(id, name, price, description, user)];
  }
}