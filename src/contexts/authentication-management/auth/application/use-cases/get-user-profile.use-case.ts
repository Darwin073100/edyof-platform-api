import { Injectable, Inject } from "@nestjs/common";
import { UserRepository, USER_REPOSITORY } from "../../domain/repositories/user.repository";
import { EmployeeRepository, EMPLOYEE_REPOSITORY } from "src/contexts/employee-management/employee/domain/repositories/employee.repository";

export interface UserProfileResponse {
  user: {
    userId: bigint;
    employeeId: bigint;
    username: string;
    email: string;
    roles: string[];
    permissions: string[];
  };
  employee?: {
    employeeId: bigint;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    branchOfficeId: bigint;
    employeeRoleId: bigint;
  };
}

@Injectable()
export class GetUserProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(EMPLOYEE_REPOSITORY) 
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async execute(userId: bigint): Promise<UserProfileResponse> {
    // 1. Obtener el usuario con todas sus relaciones cargadas
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const response: UserProfileResponse = {
      user: {
        userId: user.userId,
        employeeId: user.employeeId,
        username: user.username?.value || '',
        email: user.email?.value || '',
        roles: user.userRoles?.map(ur => ur.roleName) || [],
        permissions: user.userRoles?.flatMap(ur => ur.permissions) || [],
      }
    };

    // 2. Obtener información del empleado
    try {
      const employee = await this.employeeRepository.findById(user.employeeId);
      if (employee) {
        response.employee = {
          employeeId: employee.employeeId,
          firstName: employee.firstName?.value || '',
          lastName: employee.lastName?.value || '',
          email: employee.email?.value || '',
          phoneNumber: employee.phoneNumber?.value || '',
          branchOfficeId: employee.branchOfficeId,
          employeeRoleId: employee.employeeRoleId,
        };
      }
    } catch (error) {
      // Si no se encuentra el empleado, continuamos sin esa información
      console.warn(`No se encontró empleado para userId: ${userId}`, error);
    }

    return response;
  }
}
