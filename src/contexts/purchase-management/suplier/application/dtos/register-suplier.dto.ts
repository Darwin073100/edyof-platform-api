/**
 * RegisterBranchOfficeRequest define la estructura de los datos de entrada
 * necesarios para el caso de uso de registro de una sucursal.
 *
 * Es un DTO (Data Transfer Object) para la capa de Aplicación.
 */
export class RegisterSuplierDto {
    readonly name: string;
    readonly phoneNumber: string;
    readonly rfc?: string | null;
    readonly contactPerson?: string | null;
    readonly email?: string | null;
    readonly notes?: string | null;
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
      reference?: string|null;
    };
    readonly establishmentId: bigint;
    constructor(
        name: string,
        phoneNumber: string,
        address: {
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
        },
        rfc?: string | null,
        contactPerson?: string | null,
        email?: string | null,
        notes?: string | null,
    ){
            this.address = address;
            this.name = name;
            this.phoneNumber = phoneNumber;
            this.rfc = rfc;
            this.contactPerson = contactPerson;
            this.email = email;
            this.notes = notes;
    }
  }