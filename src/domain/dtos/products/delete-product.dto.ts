import { Validators } from "../../../config";

export class DeleteProductDto {
  private constructor(
    public readonly id  : string,
    public readonly user: string,
  ){}

  static create(props: { [key: string]: any }): [ string?, DeleteProductDto? ] {
    const { id,user } = props;

    if(!id) return ['Missing Product ID'];
    if(!Validators.isValidID(id)) return ['Invalid Product ID'];
    if(!user) return ['Missing user'];
    if(!Validators.isValidID(user)) return ['Invalid User ID'];

    return [undefined, new DeleteProductDto(id, user)];
  }
}