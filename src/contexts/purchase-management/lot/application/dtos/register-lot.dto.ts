export class RegisterLotDto {
  productId: bigint;
  lotNumber: string;
  purchasePrice: number;
  initialQuantity: number;
  expirationDate?: Date | null;
  manufacturingDate?: Date | null;
  receivedDate: Date;
}
