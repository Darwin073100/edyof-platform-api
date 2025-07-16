import { IsNotEmpty, IsNumberString, IsOptional, IsString, IsNumber, IsBoolean, IsDateString, MaxLength } from "class-validator";
import { LocationEnum } from "../../domain/enums/location.enum";

export class InventoryItemDTO{
    //  propiedades con class validators
    @IsNumberString()
    @IsNotEmpty({message: 'El id del producto no puede estar vacío.'})
    productId: bigint;
    @IsNumberString()
    @IsNotEmpty({message: 'El id de la sucursal no puede estar vacío.'})
    branchOfficeId: bigint;
    @IsNumberString()
    @IsNotEmpty({message: 'El id del lote no puede estar vacío.'})
    lotId: bigint;  
    @IsNotEmpty({message: 'La ubicación no puede estar vacía.'})
    location: LocationEnum; // Ubicación del inventario
    @IsOptional()
    @IsString({message: 'El código de barras interno debe ser una cadena de texto.'})
    @MaxLength(100, {message: 'El código de barras interno no puede tener más de 100 caracteres.'})
    internalBarCode?: string;
    @IsNotEmpty({message: 'La cantidad no puede estar vacía.'})
    @IsNumber({}, {message: 'La cantidad debe ser un número.'})
    quantityOnHand: number;
    @IsNotEmpty({message: 'El precio de compra no puede estar vacío.'})
    @IsNumber({}, {message: 'El precio de compra debe ser un número.'})
    purchasePriceAtStock: number;
    @IsOptional()
    @IsNumber({}, {message: 'El precio de venta unitario debe ser un número.'})
    salePriceOne?: number;
    @IsOptional()
    @IsNumber({}, {message: 'El precio de venta por mayoreo debe ser un número.'})
    salePriceMany?: number;
    @IsOptional()
    @IsNumber({}, {message: 'El stock mínimo debe ser un número.'})
    minStockBranch?: number;
    @IsOptional()
    @IsNumber({}, {message: 'El stock máximo debe ser un número.'})
    maxStockBranch?: number;
    @IsOptional()
    @IsDateString(undefined, {message: 'La fecha de último abastecimiento debe ser una fecha válida.'})
    lastStockedAt?: string;
    @IsNotEmpty({message: 'Debe indicar si es vendible.'})
    @IsBoolean({message: 'El campo "es vendible" debe ser booleano.'})
    isSellable: boolean;
}