import { Validators } from "../../../config";

export class GetProductsDto {
  private constructor(public readonly user: string ){}

  static create(props: { [key: string]: any }): [ string?, GetProductsDto? ] {
    const { user } = props;

    if(!user) return ['Missing user'];
    if(!Validators.isValidID(user)) return ['Invalid User ID'];

    return [undefined, new GetProductsDto(user)];
  }
}