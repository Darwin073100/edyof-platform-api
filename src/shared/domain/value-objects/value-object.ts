/**
 * Clase abstracta base para todos los Value Objects.
 * Los Value Objects son objetos que se definen por sus atributos y no tienen una identidad conceptual.
 * Son inmutables y la igualdad se basa en la comparación de sus propiedades.
 */
export abstract class ValueObject<T extends object> {
    // Las propiedades del Value Object. Protegidas para que las clases hijas accedan.
    protected readonly props: T;
  
    constructor(props: T) {
      this.props = Object.freeze(props); // Hacemos las propiedades inmutables
    }
  
    /**
     * Compara si dos Value Objects son iguales basándose en la igualdad de sus propiedades.
     * La comparación es profunda para Value Objects simples y superficial para objetos anidados.
     *
     * @param vo El Value Object a comparar.
     * @returns `true` si los Value Objects son iguales, `false` en caso contrario.
     */
    public equals(vo?: ValueObject<T>): boolean {
      if (vo === null || vo === undefined) {
        return false;
      }
      if (vo.props === undefined) {
        return false;
      }
      if (vo.constructor !== this.constructor) {
        return false; // Deben ser del mismo tipo de Value Object
      }
  
      // Implementación de comparación profunda básica para las propiedades.
      // Esta lógica es nativa de JavaScript y no requiere librerías externas.
      const keysA = Object.keys(this.props);
      const keysB = Object.keys(vo.props);
  
      if (keysA.length !== keysB.length) {
        return false;
      }
  
      for (const key of keysA) {
        const valueA = (this.props as any)[key];
        const valueB = (vo.props as any)[key];
  
        if (
          typeof valueA === 'object' &&
          valueA !== null &&
          typeof valueB === 'object' &&
          valueB !== null
        ) {
          // Si las propiedades son objetos, se espera que también sean Value Objects
          // y que implementen su propio método 'equals'.
          // Si no son Value Objects o no tienen 'equals', esto fallará.
          // Por eso, la implementación específica de 'equals' en los VOs concretos
          // es crucial si anidan otros VOs.
          if (valueA instanceof ValueObject && valueB instanceof ValueObject) {
            if (!valueA.equals(valueB)) {
              return false;
            }
          } else {
            // Para objetos que no son Value Objects, hacemos una comparación estricta.
            // Si necesitas una comparación profunda de objetos planos aquí,
            // sería más complejo y podría requerir JSON.stringify o una utilidad.
            // Para mantener la pureza, se recomienda que los VOs solo aniden otros VOs o primitivos.
            if (valueA !== valueB) {
              return false;
            }
          }
        } else {
          // Para propiedades primitivas, comparación estricta.
          if (valueA !== valueB) {
            return false;
          }
        }
      }
  
      return true;
    }
  }
  