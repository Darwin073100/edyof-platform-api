import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandOrmEntity } from './infraestruture/persistence/typeorm/entities/brand-orm-entity';
import {
  BRAND_REPOSITORY,
  BrandRepository,
} from './domain/repositories/brand.repository';
import { TypeOrmBrandRepository } from './infraestruture/persistence/typeorm/repositories/typeorm-brand.repository';
import { RegisterBrandUseCase } from './application/use-cases/register-brand.use-case';
import { FindBrandByIdUseCase } from './application/use-cases/find-brand-by-id.use-case';
import { BrandController } from './presentation/http/controllers/brand.controller';

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
    TypeOrmModule.forFeature([BrandOrmEntity]),
  ],
  controllers: [
    // Los controladores que manejan las solicitudes HTTP para este módulo.
    BrandController,
  ],
  providers: [
    // Define los proveedores de servicios y cómo se inyectan las dependencias.

    // --- Implementación del Repositorio de Infraestructura ---
    // Proporciona la implementación concreta de EstablishmentRepository.
    // Aquí es donde enlazamos la interfaz de dominio (EstablishmentRepository)
    // con su implementación de infraestructura (TypeOrmEstablishmentRepository).
    {
      provide: BRAND_REPOSITORY, // El "token" o la "interfaz" que se pide
      useClass: TypeOrmBrandRepository, // La clase concreta que se provee
    },
    {
      provide: RegisterBrandUseCase, // Provee el caso de uso
      useFactory: (repo: BrandRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new RegisterBrandUseCase(repo);
      },
      inject: [BRAND_REPOSITORY], // Declara la dependencia para el factory
    },
    {
      provide: FindBrandByIdUseCase, // Provee el caso de uso
      useFactory: (repo: BrandRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new FindBrandByIdUseCase(repo);
      },
      inject: [BRAND_REPOSITORY], // Declara la dependencia para el factory
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
    RegisterBrandUseCase,
    FindBrandByIdUseCase,
  ],
})
export class BrandModule {}
