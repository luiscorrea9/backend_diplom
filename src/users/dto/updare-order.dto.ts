import { IsNotEmpty } from "class-validator";

export class UpdateOrderDto{
    @IsNotEmpty()
    orderNumber: string
    
    @IsNotEmpty()
    price: number;


}
