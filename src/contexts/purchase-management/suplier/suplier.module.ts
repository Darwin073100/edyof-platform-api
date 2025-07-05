import { Module } from "@nestjs/common";
import { SuplierController } from "./presentation/controllers/suplier.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuplierOrmEntity } from "./infraestructure/persistence/typeorm/entities/suplier.orm-entity";
import { TypeOrmSuplierRepository } from "./infraestructure/persistence/typeorm/repositories/typeorm-suplier.repository";
import { RegisterSuplierUseCase } from "./application/use-cases/register-suplier.use-case";
import { SUPLIER_REPOSITORY, SuplierRepository } from "./domain/repositories/suplier.repository";
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
      TypeOrmModule.forFeature([SuplierOrmEntity]),
    ],
    controllers: [
      // Los controladores que manejan las solicitudes HTTP para este módulo.
      SuplierController,
    ],
    providers: [
      // Define los proveedores de servicios y cómo se inyectan las dependencias.
  
      // --- Implementación del Repositorio de Infraestructura ---
      // Proporciona la implementación concreta de BranchOfficeRepository.
      // Aquí es donde enlazamos la interfaz de dominio (BranchOfficeRepository)
      // con su implementación de infraestructura (TypeOrmBranchOfficeRepository).
      {
        provide: SUPLIER_REPOSITORY, // El "token" o la "interfaz" que se pide
        useClass: TypeOrmSuplierRepository, // La clase concreta que se provee
      },
      {
        provide: RegisterSuplierUseCase, // Provee el caso de uso
        useFactory: (repo1: SuplierRepository) => {
          // NestJS inyecta el repo aquí basado en el token
          return new RegisterSuplierUseCase(repo1);
        },
        inject: [SUPLIER_REPOSITORY], // Declara la dependencia para el factory
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
      RegisterSuplierUseCase,
    ],
  })
  export class SuplierModule {}
  