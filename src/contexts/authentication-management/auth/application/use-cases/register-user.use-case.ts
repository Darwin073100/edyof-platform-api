import { EncryptionRepository } from "src/contexts/authentication-management/auth/domain/repositories/encryption.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserEmailVO } from "../../domain/value-objects/user.email.vo";
import { UserPasswordHashVO } from "../../domain/value-objects/user.password-hash.vo";
import { UserUsernameVO } from "../../domain/value-objects/user.username.vo";
import { RegisterUserDTO } from "../dtos/register-user.dto";

export class RegisterUserUseCase{
    constructor(
        private userRepository: UserRepository,
        private encryptionRepository: EncryptionRepository,
    ){}

    async excecute(dto: RegisterUserDTO):Promise<UserEntity>{
        const hashedPassword = await this.encryptionRepository.encrypt(dto.passwordPlain);
        const usernameVO = UserUsernameVO.create(dto.username);
        const email = UserEmailVO.create(dto.email);
        const passwordHash = UserPasswordHashVO.create(hashedPassword);
        const employeeId = dto.employeeId;

        const user = UserEntity.create(BigInt(new Date().getTime()),employeeId, usernameVO,email,passwordHash)
        
        const resp = await  this.userRepository.save(user);

        return resp;
    }
}