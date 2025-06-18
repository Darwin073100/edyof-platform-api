import { UserEntity } from "../../domain/entities/user.entity";
import { UserResponseDTO } from "../dtos/user-response.dto";

export class UserMapper{
    /**
     * Este metodo se usa para convertir una entidad de dominio a una respuesta HTTP para los endpoinds.
     * @param entity UserEntity
     * @returns UserResponseDTO
     */
    static toResponseDTO(entity: UserEntity):UserResponseDTO{
        const responseDTO = new UserResponseDTO(
            entity.userId,
            entity.employeeId,
            entity.username.value,
            entity.email.value,
            entity.isActive,
            entity.createdAt,
            entity.lastLogin,
            entity.updatedAt,
            entity.deletedAt
        );
        return responseDTO;
    }
}