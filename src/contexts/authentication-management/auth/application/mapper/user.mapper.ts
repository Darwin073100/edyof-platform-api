import { PermissionEntity } from "src/contexts/authentication-management/permission/domain/entities/permission-entity";
import { UserRoleEntity } from "../../domain/entities/user-role.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserProfileResponse } from "../dtos/user-profile-response";
import { UserResponseDTO } from "../dtos/user-response.dto";
import { UserWorkspaceResponseDTO } from "../dtos/user-workspace-response.dto";

export class UserMapper{
    /**
     * Este metodo se usa para convertir una entidad de dominio a una respuesta HTTP para los endpoinds.
     * @param entity UserEntity
     * @returns UserResponseDTO
     */
    static toResponseDTO(entity: UserRoleEntity):UserResponseDTO{
        const responseDTO = new UserResponseDTO(
            entity.userId,
            entity.user?.employeeId,
            entity.user?.username.value,
            entity.user?.email.value,
            {
                roleId: entity.role?.roleId,
                name: entity.role?.name.name,
                description: entity.role?.description?.description,
                createdAt: entity.role?.createdAt,
                updatedAt: entity.role?.updatedAt,
                deletedAt: entity.role?.deletedAt
            },
            entity.user?.isActive,
            entity.user?.createdAt,
            entity.user?.lastLogin,
            entity.user?.updatedAt,
            entity.user?.deletedAt
        );
        return responseDTO;
    }

    static toProfileResponse(entity: UserEntity): UserProfileResponse{
        const profile: UserProfileResponse = {
            user:{
                email: entity.email?.value || '',
                employeeId: entity.employeeId,
                // permissions: entity.userRoles?.flatMap((ur:UserRoleEntity) => ur.role?.rolePermissions?.map(rp => rp.permission.name)) || [],
                permissions: entity.userRoles?.flatMap((ur:UserRoleEntity) => ur.role?.permissions) || [],
                roles: entity.userRoles?.map(ur => ur.role?.name.name) || [],
                userId: entity.userId,
                username: entity.username?.value || ''
            },
            employee: entity.employee ? {
                employeeId: entity.employee.employeeId,
                firstName: entity.employee.firstName?.value || '',
                lastName: entity.employee.lastName?.value || '',
                email: entity.employee.email?.value || '',
                phoneNumber: entity.employee.phoneNumber?.value || '',
                branchOfficeId: entity.employee.branchOfficeId,
                employeeRoleId: entity.employee.employeeRoleId
            } : undefined,
        }

        return profile;
    }
    static toUserWorkspaceResponse(entity: UserEntity): UserWorkspaceResponseDTO{
        const profile: UserWorkspaceResponseDTO = {
            user:{
                email: entity.email?.value || '',
                employeeId: entity.employeeId?.toString() || '0',
                // permissions: entity.userRoles?.flatMap((ur:UserRoleEntity) => ur.role?.rolePermissions?.map(rp => rp.permission.name)) || [],
                permissions: entity.userRoles?.flatMap((ur:UserRoleEntity) => ur.role?.permissions) || [],
                roles: entity.userRoles?.map(ur => ur.role?.name.name) || [],
                userId: entity.userId?.toString() || '0',
                username: entity.username?.value || ''
            },
            employee: entity.employee ? {
                employeeId: entity.employee.employeeId?.toString() || '0',
                firstName: entity.employee.firstName?.value || '',
                lastName: entity.employee.lastName?.value || '',
                email: entity.employee.email?.value || '',
                phoneNumber: entity.employee.phoneNumber?.value || '',
                branchOfficeId: entity.employee.branchOfficeId?.toString() || '0',
                employeeRoleId: entity.employee.employeeRoleId?.toString() || '0'
            } : undefined,
            branchOffice: {
                branchOfficeId: (entity.employee?.branchOffice?.branchOfficeId || 0n).toString(),
                name: entity.employee?.branchOffice?.name.value || '',
                address:{
                    street: entity.employee?.branchOffice?.address?.street || '',
                    externalNumber: entity.employee?.branchOffice?.address?.externalNumber || '',
                    internalNumber: entity.employee?.branchOffice?.address?.internalNumber || '',
                    city: entity.employee?.branchOffice?.address?.city || '',
                    state: entity.employee?.branchOffice?.address?.state || '',
                    country: entity.employee?.branchOffice?.address?.country || '',
                    municipality: entity.employee?.branchOffice?.address?.municipality || '',
                    neighborhood: entity.employee?.branchOffice?.address?.neighborhood || '',
                    postalCode: entity.employee?.branchOffice?.address?.postalCode || ''
                }
            },
            establishment: {
                establishmentId: (entity.employee?.branchOffice?.establishment?.establishmentId || 0n).toString(),
                name: entity.employee?.branchOffice?.establishment?.name.value || ''
            }

        }

        return profile;
    }
}