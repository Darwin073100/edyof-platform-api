import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, IsUrl, IsInt, IsPositive, IsNumberString, IsDateString, IsBoolean, MaxLength, ValidateNested, IsArray } from 'class-validator';
import { ForSaleEnum } from '../../../../../../shared/domain/enums/for-sale.enum';
import { Type } from 'class-transformer';
import { RegisterLotUnitPurchaseRequestDTO } from 'src/contexts/purchase-management/lot/presentation/dtos/register-lot-unit-purchase-request.dto';
import { InventoryItemWithoutInventoryRequestDTO } from 'src/contexts/inventory-management/inventory-item/presentation/dtos/inventory-item-without-inventory-request.dto';

export class RegisterProductWithLotAndInventoryItemRequestDto {
  @IsNotEmpty({ message: 'El ID del establecimiento es obligatorio.' })
  @IsNumberString({}, { message: 'El ID del establecimiento debe ser una cadena numerica.' })
  establishmentId: bigint;

  @IsNotEmpty({ message: 'El ID de la categoría es obligatorio.' })
  @IsNumberString({}, { message: 'El ID de la categoría debe ser una cadena numerica.' })
  categoryId: bigint;

  @IsOptional()
  @IsNumberString({}, { message: 'El ID de la marca debe ser una cadena numerica.' })
  brandId?: bigint;

  @IsOptional()
  @IsNumberString({}, { message: 'El ID de la temporada debe ser una cadena numerica.' })
  seasonId?: bigint;

  @IsNotEmpty({ message: 'El nombre del producto es obligatorio.' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto.' })
  name: string;

  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto.' })
  sku?: string;

  @IsOptional()
  @IsString({ message: 'El código de barras universal debe ser una cadena de texto.' })
  universalBarCode?: string;

  @IsOptional()
  @IsString({ message: 'La descripción del producto debe ser una cadena de texto.' })
  description?: string;

  @IsNotEmpty({ message: 'La unidad de medida es obligatoria.' })
  @IsEnum(ForSaleEnum)
  unitOfMeasure: ForSaleEnum;

  @IsNotEmpty({ message: 'El stock mínimo global es obligatorio.' })
  @IsNumber({ maxDecimalPlaces: 3 })
  minStockGlobal: number;

  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen debe ser una URL válida.' })
  imageUrl?: string;

  //  inventory
  @IsNumberString()
  @IsNotEmpty({ message: 'El id de la sucursal no puede estar vacío.' })
  branchOfficeId: bigint;
  @IsOptional()
  @IsPositive({ message: 'El precio de venta por menudeo debe ser positivo.' })
  @IsNumber({}, { message: 'El precio de venta unitario debe ser un número.' })
  salePriceOne?: number;
  @IsOptional()
  @IsPositive({ message: 'El precio de venta por mayoreo debe ser positivo.' })
  @IsNumber({}, { message: 'El precio de venta por mayoreo debe ser un número.' })
  salePriceMany?: number;
  @IsOptional()
  @IsPositive({ message: 'La cantidad de producto de venta por mayoreo debe ser positivo.' })
  @IsNumber({}, { message: 'La cantidad de producto de venta por mayoreo debe ser un número.' })
  saleQuantityMany?: number | null;
  @IsOptional()
  @IsPositive({ message: 'El precio especial de venta debe ser positivo.' })
  @IsNumber({}, { message: 'El precio de venta especial debe ser un número.' })
  salePriceSpecial?: number | null;
  @IsOptional()
  @IsNumber({}, { message: 'El stock mínimo debe ser un número.' })
  minStockBranch?: number;
  @IsOptional()
  @IsNumber({}, { message: 'El stock máximo debe ser un número.' })
  maxStockBranch?: number;
  @IsNotEmpty({ message: 'Debe indicar si es vendible.' })
  @IsBoolean({ message: 'El campo "es vendible" debe ser booleano.' })
  isSellable: boolean;
  @IsOptional()
  @IsArray({message: 'Los items de inventario deben ser un arreglo.'})
  @ValidateNested({each: true})
  @Type(() => InventoryItemWithoutInventoryRequestDTO)
  inventoryItems: InventoryItemWithoutInventoryRequestDTO[] | null;

  // Lot
  @IsNotEmpty({ message: 'El número de lote es obligatorio.' })
  @IsString({ message: 'El número de lote debe ser una cadena de texto.' })
  lotNumber: string;

  @IsNotEmpty({ message: 'El precio de compra es obligatorio.' })
  @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El precio de compra debe ser un número con hasta 4 decimales.' })
  purchasePrice: number;

  @IsNotEmpty({ message: 'La cantidad inicial es obligatoria.' })
  @IsNumber({ maxDecimalPlaces: 3 }, { message: 'La cantidad inicial debe ser un número con hasta 3 decimales.' })
  initialQuantity: number;

  @IsNotEmpty({ message: 'La unidad de medida es obligatoria.' })
  @IsEnum(ForSaleEnum, { message: 'La unidad de medida debe ser un valor válido.' })
  purchaseUnit: ForSaleEnum;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de caducidad debe ser una fecha válida (YYYY-MM-DD).' })
  expirationDate?: Date | null;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fabricación debe ser una fecha válida (YYYY-MM-DD).' })
  manufacturingDate?: Date | null;

  @IsDateString({}, { message: 'La fecha de recepción debe ser una fecha válida (YYYY-MM-DD).' })
  receivedDate: Date;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RegisterLotUnitPurchaseRequestDTO)
  lotUnitPurchases?: RegisterLotUnitPurchaseRequestDTO[] | null;
}
