/**
 * RegisterBranchOfficeResponse define la estructura de los datos de salida
 * que retorna el caso de uso de registro de una sucursal.
 *
 * Es un DTO (Data Transfer Object) para la capa de Aplicación.
 */
export class CustomerResponseDto {
  readonly customerId    : bigint;
  readonly addressId?    : bigint|null;
  readonly firstName     : string;
  readonly lastName?     : string|null;
  readonly companyName?  : string|null;
  readonly phoneNumber?  : string|null;
  readonly rfc?          : string | null;
  readonly email?        : string | null;
  readonly customerType? : string | null;
  readonly address?: {
    street          : string;
    externalNumber  : string;
    internalNumber? : string | null;
    municipality    : string;
    neighborhood    : string;
    city            : string;
    state           : string;
    postalCode      : string;
    country         : string;
    reference?      : string | null;
  }|null;
  readonly createdAt  : Date;
  readonly updatedAt? : Date | null;
  readonly deletedAt? : Date | null;
  constructor(
    customerId   : bigint,
    createdAt    : Date,
    firstName    : string,
    lastName?    : string|null,
    companyName? : string|null,
    addressId?   : bigint|null,
    phoneNumber? : string|null,
    address?: {
      street          : string;
      externalNumber  : string;
      internalNumber? : string | null;
      municipality    : string;
      neighborhood    : string;
      city            : string;
      state           : string;
      postalCode      : string;
      country         : string;
      reference?      : string | null;
    }|null,
    rfc?          : string | null,
    email?        : string | null,
    customerType? : string | null,
    updatedAt?    : Date | null,
    deletedAt?    : Date | null,
  ) {
    this.addressId    = addressId;
    this.firstName    = firstName;
    this.lastName     = lastName;
    this.companyName  = companyName;
    this.customerId   = customerId;
    this.phoneNumber  = phoneNumber;
    this.rfc          = rfc;
    this.email        = email;
    this.customerType = customerType;
    this.address      = address;
    this.createdAt    = createdAt;
    this.updatedAt    = updatedAt;
    this.deletedAt    = deletedAt;
  }
}
