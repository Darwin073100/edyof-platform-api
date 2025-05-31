import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentOrmEntity } from './infraestruture/persistence/typeorm/entities/establishment-orm-entity';
import { EstablishmentController } from './presentation/http/controllers/educational-center.controller';
import {
  ESTABLISHMENT,
  EstablishmentRepository,
} from './domain/repositories/establishment.repository';
import { TypeOrmEstablishmentRepository } from './infraestruture/persistence/typeorm/repositories/typeorm-educational-center.repository';
import { RegisterEstablishmentUseCase } from './application/use-cases/register-establishment.use-case';
import { FindEstablishmentByIdUseCase } from './application/use-cases/find-establishment-by-id.use-case';

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
    TypeOrmModule.forFeature([EstablishmentOrmEntity]),
  ],
  controllers: [
    // Los controladores que manejan las solicitudes HTTP para este módulo.
    EstablishmentController,
  ],
  providers: [
    // Define los proveedores de servicios y cómo se inyectan las dependencias.

    // --- Implementación del Repositorio de Infraestructura ---
    // Proporciona la implementación concreta de EstablishmentRepository.
    // Aquí es donde enlazamos la interfaz de dominio (EstablishmentRepository)
    // con su implementación de infraestructura (TypeOrmEstablishmentRepository).
    {
      provide: ESTABLISHMENT, // El "token" o la "interfaz" que se pide
      useClass: TypeOrmEstablishmentRepository, // La clase concreta que se provee
    },
    {
      provide: RegisterEstablishmentUseCase, // Provee el caso de uso
      useFactory: (repo: EstablishmentRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new RegisterEstablishmentUseCase(repo);
      },
      inject: [ESTABLISHMENT], // Declara la dependencia para el factory
    },
    {
      provide: FindEstablishmentByIdUseCase, // Provee el caso de uso
      useFactory: (repo: EstablishmentRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new FindEstablishmentByIdUseCase(repo);
      },
      inject: [ESTABLISHMENT], // Declara la dependencia para el factory
    },

    // --- Casos de Uso (Servicios de Aplicación) ---
    // NestJS es lo suficientemente inteligente para inyectar automáticamente
    // la implementación correcta del repositorio (TypeOrmEstablishmentRepository)
    // en los constructores de estos casos de uso, porque ya la hemos provisto arriba.
    // RegisterEstablishmentUseCase,
    // FindEstablishmentByIdUseCase,

    // Mappers y DTOs no necesitan ser proveedores si son clases estáticas o DTOs puros.
    // EstablishmentMapper // Si tuviera métodos no estáticos o dependencias inyectables.
  ],
  exports: [
    // Exporta los proveedores y módulos que otras partes de la aplicación (otros módulos)
    // podrían necesitar. Por ejemplo, si otro módulo necesita usar RegisterEstablishmentUseCase.
    RegisterEstablishmentUseCase,
    FindEstablishmentByIdUseCase,
  ],
})
export class EstablishmentModule {}
