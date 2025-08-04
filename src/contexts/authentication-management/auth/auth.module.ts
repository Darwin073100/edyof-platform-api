import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { ENCRYPTION_REPOSITORY, EncryptionRepository } from "./domain/repositories/encryption.repository";
import { BcryptEncryptionRepository } from "./infraestructure/encryption/bcrypt.encryption.repository";
import { JwtStrategy } from "./infraestructure/strategy/jwt.strategy";
import { LocalStrategy } from "./infraestructure/strategy/local.strategy";
import { ValidateAuthUseCase } from "./application/use-cases/validate-auth.use-case";
import { loginAuthUseCase } from "./application/use-cases/login-auth.use-case";
import { AuthController } from "./presentation/http/controllers/auth.controller";
import { USER_REPOSITORY, UserRepository } from "./domain/repositories/user.repository";
import { UserOrmEntity } from "./infraestructure/entities/user.orm-entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TyperomUserRepository } from "./infraestructure/repositories/typeorm-user.repository";
import { RegisterUserUseCase } from "./application/use-cases/register-user.use-case";
import { UserController } from "./presentation/http/controllers/user.controller";
import { USER_ROLE_REPOSITORY, UserRoleRepository } from "./domain/repositories/user-role.repository";
import { TypeormUserRoleRepository } from "./infraestructure/repositories/typeorm-user-role.repository";
import { RoleModule } from "../role/role.module";
import { ROLE_CHECKER_PORT, RoleCheckerPort } from "../role/domain/ports/out/role-checker.port";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GetUserProfileUseCase } from "./application/use-cases/get-user-profile.use-case";
import { EmployeeModule } from "src/contexts/employee-management/employee/employee.module";
import { EMPLOYEE_REPOSITORY, EmployeeRepository } from "src/contexts/employee-management/employee/domain/repositories/employee.repository";
import { EMPLOYEE_CHECKER_PORT, EmployeeChekerPort } from "src/contexts/employee-management/employee/domain/ports/out/employee-checker.port";

@Module({
    imports: [
        RoleModule,
        EmployeeModule,
        TypeOrmModule.forFeature([UserOrmEntity]),
        PassportModule,
        JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    ],
    providers:[
        {
            provide: USER_REPOSITORY,
            useClass: TyperomUserRepository
        },
        {
            provide: USER_ROLE_REPOSITORY,
            useClass: TypeormUserRoleRepository
        },
        {
            provide: ENCRYPTION_REPOSITORY,
            useClass: BcryptEncryptionRepository
        },
        {
            provide: RegisterUserUseCase,
            useFactory: (roleCheckerPort: RoleCheckerPort,employeeCheckerPort: EmployeeChekerPort, userRoleRepo: UserRoleRepository, encrypt: EncryptionRepository)=>{
                return new RegisterUserUseCase(roleCheckerPort, employeeCheckerPort, userRoleRepo, encrypt)
            },
            inject: [ROLE_CHECKER_PORT, EMPLOYEE_CHECKER_PORT, USER_ROLE_REPOSITORY, ENCRYPTION_REPOSITORY]
        },
        {
            provide: ValidateAuthUseCase,
            useFactory: (repo: UserRepository, encrypt: EncryptionRepository)=>{
                return new ValidateAuthUseCase(repo, encrypt)
            },
            inject: [USER_REPOSITORY, ENCRYPTION_REPOSITORY]
        },
        {
            provide: JwtStrategy,
            useFactory: (repo: UserRepository)=>{
                return new JwtStrategy(repo);
            },
            inject: [USER_REPOSITORY]
        },
        {
            provide: loginAuthUseCase,
            useFactory: (jwtService: JwtService) => {
                return new loginAuthUseCase(jwtService);
            },
            inject: [JwtService]
        },
        {
            provide: GetUserProfileUseCase,
            useFactory: (userRepo: UserRepository, employeeRepo: EmployeeRepository) => {
                return new GetUserProfileUseCase(userRepo, employeeRepo);
            },
            inject: [USER_REPOSITORY, EMPLOYEE_REPOSITORY]
        },
        JwtStrategy,
        LocalStrategy,

    ],
    controllers: [
        AuthController,
        UserController
    ],
    exports: [
        JwtModule, 
        PassportModule, 
        ENCRYPTION_REPOSITORY,
        USER_REPOSITORY,
    ] // Exportamos para que otros modulos lo puedan usar
})
export class AuthModule{}