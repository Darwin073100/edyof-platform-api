import { UserRoleEntity } from "../../domain/entities/user-role.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserResponseDTO } from "../dtos/user-response.dto";

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
                roleId: entity.roleId,
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
}