import { CategoryEntity } from "../../domain/entities/category-entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { CategoryDescriptionVO } from "../../domain/value-objects/category-description.vo";
import { CategoryNameVO } from "../../domain/value-objects/category-name.vo";
import { RegisterCategoryDto } from "../dtos/register-category.dto";

/**
 * RegisterCategoryUseCase es un Caso de Uso (o Servicio de Aplicación).
 * Contiene la lógica de orquestación para el proceso de registro de un centro educativo.
 * No contiene lógica de negocio pura, sino que coordina a las entidades de dominio y repositorios.
 */
export class RegisterCategoryUseCase {
  constructor(
    // Inyectamos la interfaz del repositorio, no una implementación concreta.
    // Esto es Inversión de Dependencias.
    private readonly categoryRepository: CategoryRepository,
  ) {}

  /**
   * Ejecuta el caso de uso para registrar un nuevo centro educativo.
   *
   * @param command El DTO que contiene los datos para el registro.
   * @returns Una Promesa que se resuelve con la entidad Category creada.
   * @throws Error si el nombre no es válido (validación del Value Object Name).
   */
  public async execute(command: RegisterCategoryDto): Promise<CategoryEntity> {
    // 1. Validar la entrada a nivel de la aplicación (si hubiera reglas que no sean de dominio puro).
    // En este caso, la validación del nombre se delega al Value Object Name.

    // 2. Crear objetos de dominio (utilizando Value Objects y entidades).
    // Delegamos la validación del formato/contenido del nombre al Value Object Name.
    const name = CategoryNameVO.create(command.name);
    const description = CategoryDescriptionVO.create(command.description);

    // Generamos un nuevo ID para el centro educativo.
    // En un escenario real, esto podría ser un UUID, un ID de secuencia de base de datos
    // o un ID generado por un servicio de infraestructura.
    // Por simplicidad y para mantener la independencia, lo simulamos aquí.
    const newCenterId = BigInt(Date.now()); // Simulación de ID

    // La entidad de dominio se crea con sus invariantes protegidas.
    const newCategory = CategoryEntity.create(newCenterId, name,description);

    // 3. Persistir el agregado de dominio a través del repositorio (Puerto de Salida).
    const savedEntity = await this.categoryRepository.save(newCategory);

    // 4. Despachar eventos de dominio (si hay alguno registrado por el agregado).
    // Esta es la parte donde los eventos registrados por la entidad en su método `recordEvent`
    // son ahora recuperados y "publicados" al sistema.
    const domainEvents = newCategory.getAndClearEvents();
    // const domainEvents = savedEntity.getAndClearEvents();
    // En un sistema real con NestJS CQRS, usaríamos un EventBus aquí.
    // Por ejemplo:
    // for (const event of domainEvents) {
    //   this.eventBus.publish(event); // Se inyectaría EventBus en el constructor
    // }
    // Por ahora, solo lo imprimimos para demostrar que los eventos se registran.
    // ...removed console.log...


    // 5. Retornar el resultado.
    return savedEntity;
  }
}