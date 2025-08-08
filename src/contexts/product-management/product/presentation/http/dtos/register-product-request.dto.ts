import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, IsUrl, IsInt, IsPositive, IsNumberString } from 'class-validator';
import { ForSaleEnum } from '../../../../../../shared/domain/enums/for-sale.enum';

export class RegisterProductRequestDto {
  @IsNotEmpty({message: 'El ID del establecimiento es obligatorio.'})
  @IsNumberString({}, { message: 'El ID del establecimiento debe ser una cadena numerica.' })
  establishmentId: bigint;

  @IsNotEmpty({message: 'El ID de la categoría es obligatorio.'})
  @IsNumberString({}, { message: 'El ID de la categoría debe ser una cadena numerica.' })
  categoryId: bigint;

  @IsOptional()
  @IsNumberString({}, { message: 'El ID de la marca debe ser una cadena numerica.' })
  brandId?: bigint;

  @IsOptional()
  @IsNumberString({}, { message: 'El ID de la temporada debe ser una cadena numerica.' })
  seasonId?: bigint;

  @IsNotEmpty({message: 'El nombre del producto es obligatorio.'})
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

  @IsNotEmpty({message: 'La unidad de medida es obligatoria.'})
  @IsEnum(ForSaleEnum)
  unitOfMeasure: ForSaleEnum;

  @IsNotEmpty({message: 'El stock mínimo global es obligatorio.'})
  @IsNumber({ maxDecimalPlaces: 3 })
  minStockGlobal: number;

  @IsOptional()
  @IsUrl({},{ message: 'La URL de la imagen debe ser una URL válida.' })
  imageUrl?: string;
}
