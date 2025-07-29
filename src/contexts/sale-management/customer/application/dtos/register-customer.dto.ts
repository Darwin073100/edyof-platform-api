/**
 * RegisterBranchOfficeRequest define la estructura de los datos de entrada
 * necesarios para el caso de uso de registro de una sucursal.
 *
 * Es un DTO (Data Transfer Object) para la capa de Aplicación.
 */
export class RegisterCustomerDto {
    readonly firstName: string;
    readonly lastName?: string|null;
    readonly companyName?: string|null;
    readonly phoneNumber?: string|null;
    readonly rfc?: string | null;
    readonly email?: string | null;
    readonly customerType?: string | null;
    readonly address?: {
      street: string;
      externalNumber: string;
      internalNumber?: string | null;
      municipality: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      reference?: string|null;
    }|null;
    readonly establishmentId: bigint;
    constructor(
        firstName: string,
        lastName?: string|null,
        companyName?: string|null,
        phoneNumber?: string|null,
        address?: {
            street: string,
            externalNumber: string,
            internalNumber?: string | null,
            municipality: string;
            neighborhood: string;
            city: string,
            state: string,
            postalCode: string,
            country: string,
            reference?: string|null,
        }|null,
        rfc?: string | null,
        email?: string | null,
        customerType?: string | null,
    ){
            this.address = address;
            this.firstName = firstName;
            this.lastName = lastName;
            this.companyName = companyName;
            this.phoneNumber = phoneNumber;
            this.rfc = rfc;
            this.email = email;
            this.customerType = customerType;
    }
  }