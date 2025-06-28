import { EncryptionRepository } from "src/contexts/authentication-management/auth/domain/repositories/encryption.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserEmailVO } from "../../domain/value-objects/user.email.vo";
import { UserPasswordHashVO } from "../../domain/value-objects/user.password-hash.vo";
import { UserUsernameVO } from "../../domain/value-objects/user.username.vo";
import { RegisterUserDTO } from "../dtos/register-user.dto";
import { UserRoleRepository } from "../../domain/repositories/user-role.repository";
import { UserRoleEntity } from "../../domain/entities/user-role.entity";
import { RoleCheckerPort } from "src/contexts/authentication-management/role/domain/ports/out/role-checker.port";
import { NotFoundRoleException } from "src/contexts/authentication-management/role/domain/exceptions/not-found-role.exception";

export class RegisterUserUseCase{
    constructor(
        private readonly roleCheckerPort: RoleCheckerPort,
        private readonly userRoleRepository: UserRoleRepository,
        private readonly encryptionRepository: EncryptionRepository,
    ){}

    async excecute(dto: RegisterUserDTO):Promise<UserRoleEntity>{
        const roleIsValid = await this.roleCheckerPort.check(dto.roleId);

        // Verificamos que el id del rol asignado al usuario exista.
        if(!roleIsValid){
            throw new NotFoundRoleException('El rol asignado a este usuario no existe.');
        }

        // Realizamos el hash de la contraseña en texto plano
        const hashedPassword = await this.encryptionRepository.encrypt(dto.passwordPlain);
        const usernameVO = UserUsernameVO.create(dto.username);
        const email = UserEmailVO.create(dto.email);
        const passwordHash = UserPasswordHashVO.create(hashedPassword);
        const employeeId = dto.employeeId;
        
        const user = UserEntity.create(BigInt(new Date().getTime()),employeeId, usernameVO,email,passwordHash)
        const userRole = UserRoleEntity.create(BigInt(new Date().getTime()), dto.roleId, user);

        const resp = await  this.userRoleRepository.save(userRole);

        return resp;
    }
}