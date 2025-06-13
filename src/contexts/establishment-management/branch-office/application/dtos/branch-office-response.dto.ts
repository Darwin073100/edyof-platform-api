/**
 * RegisterBranchOfficeResponse define la estructura de los datos de salida
 * que retorna el caso de uso de registro de una sucursal.
 *
 * Es un DTO (Data Transfer Object) para la capa de Aplicación.
 */
export class BranchOfficeResponseDto {
  readonly branchOfficeId: bigint;
  readonly establishmentId: bigint;
  readonly name: string;
  readonly address: {
    street: string;
    externalNumber: string;
    internalNumber?: string | null;
    municipality: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    reference?: string | null;
  };
  readonly createdAt: Date;
  readonly updatedAt?: Date | null;
  readonly deletedAt?: Date | null;
  constructor(
    branchOfficeId: bigint,
    establishmentId: bigint,
    name: string,
    address: {
      street: string;
      externalNumber: string;
      internalNumber?: string | null;
      municipality: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      reference?: string | null;
    },
    createdAt: Date,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
  ) {
    this.branchOfficeId = branchOfficeId;
    this.establishmentId = establishmentId;
    this.name = name;
    this.address = address;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
