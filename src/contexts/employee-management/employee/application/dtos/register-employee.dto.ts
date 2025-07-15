/**
 * RegisterEducationalCenterDto es un Data Transfer Object (DTO)
 * que define la estructura de los datos de entrada para el caso de uso
 * de registro de un establesimiento.
 *
 * Contiene solo los datos necesarios para la operación, sin lógica de negocio.
 */
export class RegisterEmployeeDto {
  readonly branchOfficeId: bigint;
  readonly employeeRoleId: bigint;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly birthDate: string | null;
  readonly gender: string | null;
  readonly hireDate: string;
  readonly terminationDate: string | null;
  readonly entryTime: string | null;
  readonly exitTime: string | null;
  readonly currentSalary: string;
  readonly isActive: boolean;
  readonly photoUrl: string | null;
  readonly address: {
    street: string;
    externalNumber: string;
    internalNumber?: string | null;
    neighborhood: string;
    municipality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    reference?: string | null;
  };

  constructor(
    branchOfficeId: bigint,
    employeeRoleId: bigint,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    birthDate: string | null,
    gender: string | null,
    hireDate: string,
    terminationDate: string | null,
    entryTime: string | null,
    exitTime: string | null,
    currentSalary: string,
    isActive: boolean,
    photoUrl: string | null,
    address: {
      street: string;
      externalNumber: string;
      internalNumber?: string | null;
      neighborhood: string;
      municipality: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      reference?: string | null;
    }
  ) {
    this.branchOfficeId = branchOfficeId;
    this.employeeRoleId = employeeRoleId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.gender = gender;
    this.hireDate = hireDate;
    this.terminationDate = terminationDate;
    this.entryTime = entryTime;
    this.exitTime = exitTime;
    this.currentSalary = currentSalary;
    this.isActive = isActive;
    this.photoUrl = photoUrl;
    this.address = address;
    Object.freeze(this); // Congela el objeto para hacerlo inmutable
  }
}