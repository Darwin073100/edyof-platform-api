import { EstablishmentEntity } from "../entities/establishment.entity";

export const ESTABLISHMENT = Symbol('ESTABLISHMENT');
/**
 * EducationalCenterRepository es una interfaz (Puerto de Salida) que define
 * el contrato para la persistencia de los objetos EducationalCenter.
 *
 * Esta interfaz es parte de la capa de Dominio, lo que significa que el Dominio
 * define lo que necesita para interactuar con la persistencia, no cómo se implementa.
 * Esto asegura la Inversión de Dependencias y la Independencia del Framework.
 */
export interface EstablishmentRepository {
  /**
   * Guarda o actualiza un centro educativo en la persistencia.
   *
   * @param center La instancia de EducationalCenter a guardar.
   * @returns Una Promesa que se resuelve cuando la operación ha terminado.
   */
  save(center: EstablishmentEntity): Promise<EstablishmentEntity>;

  /**
   * Busca un centro educativo por su ID.
   *
   * @param id El ID del centro educativo.
   * @returns Una Promesa que se resuelve con la instancia de EducationalCenter
   * si se encuentra, o `null` si no existe.
   */
  findById(id: bigint): Promise<EstablishmentEntity | null>;

  // Otros métodos de persistencia relevantes para el agregado EducationalCenter
  // Por ejemplo:
  // findByName(name: Name): Promise<EducationalCenter | null>;
//   findAll(): Promise<EducationalCenterEntity[]>;
  // delete(id: bigint): Promise<void>;
}