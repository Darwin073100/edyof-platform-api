import { Injectable, Inject } from "@nestjs/common";
import { EmployeeRepository, EMPLOYEE_REPOSITORY } from "src/contexts/employee-management/employee/domain/repositories/employee.repository"; 
import { BranchOfficeRepository, BRANCH_OFFICE_REPOSITORY } from "src/contexts/establishment-management/branch-office/domain/repositories/branch-office.repository";
import { EstablishmentRepository, ESTABLISHMENT } from "src/contexts/establishment-management/establishment/domain/repositories/establishment.repository";

export interface EmployeeWorkplaceResponse {
  employee: {
    employeeId: bigint;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  branchOffice: {
    branchOfficeId: bigint;
    name: string;
    address: {
      street: string;
      externalNumber: string;
      internalNumber?: string;
      city: string;
      state: string;
      country: string;
      municipality: string;
      neighborhood: string;
      postalCode: string;
    };
  };
  establishment: {
    establishmentId: bigint;
    name: string;
  };
}

@Injectable()
export class GetEmployeeWorkplaceUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepository,
    @Inject(BRANCH_OFFICE_REPOSITORY)
    private readonly branchOfficeRepository: BranchOfficeRepository,
    @Inject(ESTABLISHMENT)
    private readonly establishmentRepository: EstablishmentRepository,
  ) {}

  async execute(employeeId: bigint): Promise<EmployeeWorkplaceResponse> {
    // 1. Obtener el empleado
    const employee = await this.employeeRepository.findById(employeeId);
    if (!employee) {
      throw new Error('Empleado no encontrado');
    }

    // 2. Obtener la sucursal
    const branchOffice = await this.branchOfficeRepository.findById(employee.branchOfficeId);
    if (!branchOffice) {
      throw new Error('Sucursal no encontrada');
    }

    // 3. Obtener el establecimiento
    const establishment = await this.establishmentRepository.findById(branchOffice.establishmentId);
    if (!establishment) {
      throw new Error('Establecimiento no encontrado');
    }

    return {
      employee: {
        employeeId: employee.employeeId,
        firstName: employee.firstName?.value || '',
        lastName: employee.lastName?.value || '',
        email: employee.email?.value || '',
        phoneNumber: employee.phoneNumber?.value || '',
      },
      branchOffice: {
        branchOfficeId: branchOffice.branchOfficeId,
        name: (branchOffice.name as any)?.name || branchOffice.name?.toString() || '',
        address: {
          street: branchOffice.address?.street || '',
          externalNumber: branchOffice.address?.externalNumber || '',
          internalNumber: branchOffice.address?.internalNumber || undefined,
          city: branchOffice.address?.city || '',
          state: branchOffice.address?.state || '',
          country: branchOffice.address?.country || '',
          municipality: branchOffice.address?.municipality || '',
          neighborhood: branchOffice.address?.neighborhood || '',
          postalCode: branchOffice.address?.postalCode || '',
        }
      },
      establishment: {
        establishmentId: establishment.establishmentId,
        name: (establishment.name as any)?.name || establishment.name?.toString() || '',
      }
    };
  }
}
