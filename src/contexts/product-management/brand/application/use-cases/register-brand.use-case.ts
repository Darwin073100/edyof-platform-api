// src/contexts/educational-center-management/educational-center/application/use-cases/register-educational-center.use-case.ts

import { RegisterBrandDto } from '../dtos/register-brand.dto';
import { BrandRepository } from '../../domain/repositories/brand.repository';
import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandNameVO } from '../../domain/values-objects/brand-name.vo';


/**
 * RegisterEstablishmentUseCase es un Caso de Uso (o Servicio de Aplicación).
 * Contiene la lógica de orquestación para el proceso de registro de un establesimiento.
 * No contiene lógica de negocio pura, sino que coordina a las entidades de dominio y repositorios.
 */
export class RegisterBrandUseCase {
  constructor(
    // Inyectamos la interfaz del repositorio, no una implementación concreta.
    // Esto es Inversión de Dependencias.
    private readonly brandRepository: BrandRepository,
  ) {}

  /**
   * Ejecuta el caso de uso para registrar un nuevo establesimiento.
   *
   * @param command El DTO que contiene los datos para el registro.
   * @returns Una Promesa que se resuelve con la entidad Establishment creada.
   * @throws Error si el nombre no es válido (validación del Value Object Name).
   */
  public async execute(command: RegisterBrandDto): Promise<BrandEntity> {
    // 1. Validar la entrada a nivel de la aplicación (si hubiera reglas que no sean de dominio puro).
    // En este caso, la validación del nombre se delega al Value Object Name.

    // 2. Crear objetos de dominio (utilizando Value Objects y entidades).
    // Delegamos la validación del formato/contenido del nombre al Value Object Name.
    const name = BrandNameVO.create(command.name);

    // Generamos un nuevo ID para el establesimiento.
    // En un escenario real, esto podría ser un UUID, un ID de secuencia de base de datos
    // o un ID generado por un servicio de infraestructura.
    // Por simplicidad y para mantener la independencia, lo simulamos aquí.
    const newBrandId = BigInt(Date.now()); // Simulación de ID

    // La entidad de dominio se crea con sus invariantes protegidas.
    const newBrand = BrandEntity.create(newBrandId, name);

    // 3. Persistir el agregado de dominio a través del repositorio (Puerto de Salida).
    const savedEntity = await this.brandRepository.save(newBrand);

    // 4. Despachar eventos de dominio (si hay alguno registrado por el agregado).
    // Esta es la parte donde los eventos registrados por la entidad en su método `recordEvent`
    // son ahora recuperados y "publicados" al sistema.
    const domainEvents = newBrand.getAndClearEvents();
    // const domainEvents = savedEntity.getAndClearEvents();
    // En un sistema real con NestJS CQRS, usaríamos un EventBus aquí.
    // Por ejemplo:
    // for (const event of domainEvents) {
    //   this.eventBus.publish(event); // Se inyectaría EventBus en el constructor
    // }
    // Por ahora, solo lo imprimimos para demostrar que los eventos se registran.
    console.log(`[${this.constructor.name}] Domain Events Recorded:`, domainEvents);


    // 5. Retornar el resultado.
    return savedEntity;
  }
}