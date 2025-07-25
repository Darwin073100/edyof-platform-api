import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, IsUrl, IsInt, IsPositive, IsNumberString, IsDateString, IsBoolean, MaxLength } from 'class-validator';
import { ForSaleEnum } from '../../../domain/enums/for-sale.enum';
import { LocationEnum } from 'src/contexts/inventory-management/inventory-item/domain/enums/location.enum';

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
  @IsNotEmpty({ message: 'La ubicación no puede estar vacía.' })
  location: LocationEnum; // Ubicación del inventario
  @IsOptional()
  @IsString({ message: 'El código de barras interno debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El código de barras interno no puede tener más de 100 caracteres.' })
  internalBarCode?: string;
  @IsNotEmpty({ message: 'La cantidad no puede estar vacía.' })
  @IsNumber({}, { message: 'La cantidad debe ser un número.' })
  quantityOnHand: number;
  @IsNotEmpty({ message: 'El precio de compra no puede estar vacío.' })
  @IsNumber({}, { message: 'El precio de compra debe ser un número.' })
  purchasePriceAtStock: number;
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
  @IsOptional()
  @IsDateString(undefined, { message: 'La fecha de último abastecimiento debe ser una fecha válida.' })
  lastStockedAt?: string;
  @IsNotEmpty({ message: 'Debe indicar si es vendible.' })
  @IsBoolean({ message: 'El campo "es vendible" debe ser booleano.' })
  isSellable: boolean;

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

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de caducidad debe ser una fecha válida (YYYY-MM-DD).' })
  expirationDate?: Date | null;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fabricación debe ser una fecha válida (YYYY-MM-DD).' })
  manufacturingDate?: Date | null;

  @IsDateString({}, { message: 'La fecha de recepción debe ser una fecha válida (YYYY-MM-DD).' })
  receivedDate: Date;
}
