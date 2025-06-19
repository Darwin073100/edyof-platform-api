import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleOrmEntity } from './infraestructure/persistence/typeorm/entities/role.orm-entity';
import { RoleController } from './presentation/controllers/role.controller';
import { RegisterRoleUseCase } from './application/use-cases/register-role.use-case';
import { ROLE_REPOSITORY, RoleRepository } from './domain/repositories/role.repository';
import { TypeormRoleRepository } from './infraestructure/persistence/typeorm/repositories/typeorm-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleOrmEntity])],
  controllers: [RoleController],
  providers: [
    {
        provide: ROLE_REPOSITORY,
        useClass: TypeormRoleRepository
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
})
export class RoleModule {}
