import { IsNotEmpty } from "class-validator";

export class UpdateProductDto{
    @IsNotEmpty()
    name?: string;
  
    price?: number;
  
    description?: string;
  
    category?: string

}
