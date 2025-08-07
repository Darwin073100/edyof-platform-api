import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRoleOrmEntity } from './infraestruture/persistence/typeorm/entities/employee-role-orm-entity';
import {
  EMPLOYEE_ROLE_REPOSITORY,
  EmployeeRoleRepository,
} from './domain/repositories/employee-role.repository';
import { TypeOrmEmployeeRoleRepository } from './infraestruture/persistence/typeorm/repositories/typeorm-employee-role.repository';
import { RegisterEmployeeRoleUseCase } from './application/use-cases/register-employee-role.use-case';
import { FindEmployeeRoleByIdUseCase } from './application/use-cases/find-employee-role-by-id.use-case';
import { EmployeeRoleController } from './presentation/http/controllers/employee-role.controller';
import { EMPLOYEE_ROLE_CHECKER_PORT } from './domain/ports/out/employee-role-checker.port';
import { TypeormEmployeeRoleCheckerAdapter } from './infraestruture/persistence/typeorm/external-services/typeorm-brand-checker.adapter';

/**
 * EstablishmentModule es el módulo de NestJS que agrupa todos los componentes
 * relacionados con la gestión de centros educativos.
 *
 * Se encarga de la configuración de la inyección de dependencias para este contexto,
 * enlazando las interfaces de dominio con sus implementaciones de infraestructura.
 */
@Module({
  imports: [
    // Importa las entidades de TypeORM que este módulo utilizará.
    // Esto es crucial para que TypeORM sepa qué tablas debe gestionar.
    TypeOrmModule.forFeature([EmployeeRoleOrmEntity]),
  ],
  controllers: [
    // Los controladores que manejan las solicitudes HTTP para este módulo.
    EmployeeRoleController,
  ],
  providers: [
    // Define los proveedores de servicios y cómo se inyectan las dependencias.

    // --- Implementación del Repositorio de Infraestructura ---
    // Proporciona la implementación concreta de EstablishmentRepository.
    // Aquí es donde enlazamos la interfaz de dominio (EstablishmentRepository)
    // con su implementación de infraestructura (TypeOrmEstablishmentRepository).
    {
      provide: EMPLOYEE_ROLE_REPOSITORY, // El "token" o la "interfaz" que se pide
      useClass: TypeOrmEmployeeRoleRepository, // La clase concreta que se provee
    },
    {
      provide: EMPLOYEE_ROLE_CHECKER_PORT, // Provee el puerto de verificación de marcas
      useClass: TypeormEmployeeRoleCheckerAdapter
    },
    {
      provide: RegisterEmployeeRoleUseCase, // Provee el caso de uso
      useFactory: (repo: EmployeeRoleRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new RegisterEmployeeRoleUseCase(repo);
      },
      inject: [EMPLOYEE_ROLE_REPOSITORY], // Declara la dependencia para el factory
    },
    {
      provide: FindEmployeeRoleByIdUseCase, // Provee el caso de uso
      useFactory: (repo: EmployeeRoleRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new FindEmployeeRoleByIdUseCase(repo);
      },
      inject: [EMPLOYEE_ROLE_REPOSITORY], // Declara la dependencia para el factory
    },
  ],
  exports: [
    // Exporta los proveedores y módulos que otras partes de la aplicación (otros módulos)
    // podrían necesitar. Por ejemplo, si otro módulo necesita usar RegisterEstablishmentUseCase.
    RegisterEmployeeRoleUseCase,
    FindEmployeeRoleByIdUseCase,
    EMPLOYEE_ROLE_REPOSITORY, // Exporta el repositorio para que otros módulos puedan usarlo
    EMPLOYEE_ROLE_CHECKER_PORT,
  ],
})
export class EmployeeRoleModule {}