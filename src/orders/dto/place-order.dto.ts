import { IsInt } from 'class-validator';

export class PlaceOrderDto {
    @IsInt()
    readonly product_id: number;

    @IsInt()
    readonly quantity: number;
}