import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleOrmEntity } from './infraestructure/persistence/typeorm/entities/role.orm-entity';
import { RoleController } from './presentation/controllers/role.controller';
import { RegisterRoleUseCase } from './application/use-cases/register-role.use-case';
import { ROLE_REPOSITORY, RoleRepository } from './domain/repositories/role.repository';
import { TypeormRoleRepository } from './infraestructure/persistence/typeorm/repositories/typeorm-role.repository';
import { ROLE_CHECKER_PORT } from './domain/ports/out/role-checker.port';
import { TypeormRoleCheckerAdapter } from './infraestructure/persistence/typeorm/external-services/typeorm-role-checker.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([RoleOrmEntity])],
  controllers: [RoleController],
  providers: [
    {
        provide: ROLE_REPOSITORY,
        useClass: TypeormRoleRepository
    },
    {
      provide: ROLE_CHECKER_PORT,
      useClass: TypeormRoleCheckerAdapter
    },
    {
      provide: RegisterRoleUseCase, // Provee el caso de uso
      useFactory: (repo: RoleRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new RegisterRoleUseCase(repo);
      },
      inject: [ROLE_REPOSITORY], // Declara la dependencia para el factory
    },
  ],
  exports:[
    ROLE_CHECKER_PORT
  ]
})
export class RoleModule {}
