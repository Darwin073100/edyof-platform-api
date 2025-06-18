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

@Module({
    imports: [
        TypeOrmModule.forFeature([UserOrmEntity]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SuperSecretKey', // Usar variable de entorno
            signOptions: {expiresIn: '60m'} // Token valido por 60 minutos
        }),
    ],
    providers:[
        {
            provide: USER_REPOSITORY,
            useClass: TyperomUserRepository
        },
        {
            provide: ENCRYPTION_REPOSITORY,
            useClass: BcryptEncryptionRepository
        },
        {
            provide: RegisterUserUseCase,
            useFactory: (repo: UserRepository, encrypt: EncryptionRepository)=>{
                return new RegisterUserUseCase(repo, encrypt)
            },
            inject: [USER_REPOSITORY, ENCRYPTION_REPOSITORY]
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