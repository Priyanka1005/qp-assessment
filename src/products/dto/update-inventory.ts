import { IsEnum, IsInt } from 'class-validator';

export enum INVENTORY_ACTION {
    INCREASE = 'increase',
    DECREASE = 'decrease'
}

export class UpdateInventoryDto {
    @IsInt()
    readonly quantity: number;

    @IsEnum(INVENTORY_ACTION)
    readonly action: INVENTORY_ACTION;
}

