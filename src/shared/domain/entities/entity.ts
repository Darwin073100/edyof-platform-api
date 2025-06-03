// src/shared/domain/entities/entity.ts

/**
 * Entity es una clase base abstracta para todas las entidades de dominio.
 * Define la identidad de una entidad. Dos entidades son consideradas iguales
 * si tienen el mismo ID, independientemente de sus otros atributos.
 *
 * @template T Los tipos de las propiedades de la entidad.
 */
export abstract class Entity<T extends { id: bigint }> {
    protected readonly props: T; // Las propiedades de la entidad
  
    protected constructor(props: T) {
      this.props = props;
    }
  
    // Getter para el ID, que es la identidad de la entidad.
    get id(): bigint {
      return this.props.id;
    }
  
    /**
     * Compara si dos entidades son iguales basándose en su ID.
     * @param object La entidad a comparar.
     * @returns true si las entidades tienen el mismo ID, false en caso contrario.
     */
    public equals(object?: Entity<T>): boolean {
      if (object === null || object === undefined) {
        return false;
      }
      if (this === object) {
        return true;
      }
      if (! (object instanceof Entity)) {
          return false;
      }
      return this.id === object.id;
    }
  }