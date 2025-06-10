import { Module } from "@nestjs/common";
import { BranchOfficeController } from "./presentation/controllers/branch-office.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchOfficeOrmEntity } from "./infraestructure/persistence/typeorm/entities/branch-office.orm-entity";
import { BranchOffice } from "./domain/entities/branch-office.entity";
import { TypeOrmBranchOfficeRepository } from "./infraestructure/persistence/typeorm/repositories/typeorm-branch-office.repository";
import { RegisterBranchOfficeUseCase } from "./application/use-cases/register-branch-office.use-case";
import { BRANCH_OFFICE_REPOSITORY, BranchOfficeRepository } from "./domain/repositories/branch-office.repository";
import { EstablishmentModule } from "../establishment/establishment.module";
import { ESTABLISHMENT_CHECKER_PORT, EstablishmentCheckerPort } from "../establishment/application/ports/out/establishment-checker.port";

/**
 * BranchOfficeModule es el módulo de NestJS que agrupa todos los componentes
 * relacionados con la gestión de centros educativos.
 *
 * Se encarga de la configuración de la inyección de dependencias para este contexto,
 * enlazando las interfaces de dominio con sus implementaciones de infraestructura.
 */
@Module({
    imports: [
      // Importa las entidades de TypeORM que este módulo utilizará.
      // Esto es crucial para que TypeORM sepa qué tablas debe gestionar.
      TypeOrmModule.forFeature([BranchOfficeOrmEntity]),
      EstablishmentModule,
    ],
    controllers: [
      // Los controladores que manejan las solicitudes HTTP para este módulo.
      BranchOfficeController,
    ],
    providers: [
      // Define los proveedores de servicios y cómo se inyectan las dependencias.
  
      // --- Implementación del Repositorio de Infraestructura ---
      // Proporciona la implementación concreta de BranchOfficeRepository.
      // Aquí es donde enlazamos la interfaz de dominio (BranchOfficeRepository)
      // con su implementación de infraestructura (TypeOrmBranchOfficeRepository).
      {
        provide: BRANCH_OFFICE_REPOSITORY, // El "token" o la "interfaz" que se pide
        useClass: TypeOrmBranchOfficeRepository, // La clase concreta que se provee
      },
      {
        provide: RegisterBranchOfficeUseCase, // Provee el caso de uso
        useFactory: (repo1: BranchOfficeRepository,repo2: EstablishmentCheckerPort) => {
          // NestJS inyecta el repo aquí basado en el token
          return new RegisterBranchOfficeUseCase(repo1, repo2);
        },
        inject: [BRANCH_OFFICE_REPOSITORY, ESTABLISHMENT_CHECKER_PORT], // Declara la dependencia para el factory
      }
      // --- Casos de Uso (Servicios de Aplicación) ---
      // NestJS es lo suficientemente inteligente para inyectar automáticamente
      // la implementación correcta del repositorio (TypeOrmBranchOfficeRepository)
      // en los constructores de estos casos de uso, porque ya la hemos provisto arriba.
      // RegisterBranchOfficeUseCase,
      // FindBranchOfficeByIdUseCase,
  
      // Mappers y DTOs no necesitan ser proveedores si son clases estáticas o DTOs puros.
      // BranchOfficeMapper // Si tuviera métodos no estáticos o dependencias inyectables.
    ],
    exports: [
      // Exporta los proveedores y módulos que otras partes de la aplicación (otros módulos)
      // podrían necesitar. Por ejemplo, si otro módulo necesita usar RegisterBranchOfficeUseCase.
      RegisterBranchOfficeUseCase,
    ],
  })
  export class BranchOfficeModule {}
  