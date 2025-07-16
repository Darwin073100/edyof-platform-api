import { ValueObject } from "src/shared/domain/value-objects/value-object";
import { InvalidInventoryItemException } from "../exceptions/invalid-inventory-item.exception";

interface Prop{
    value?: number|null;
}

export class InventoryItemMaxStockBranchVO extends ValueObject<Prop> {
  // Aseguramos que el constructor sea privado para forzar el uso de métodos de fábrica
  // o para que solo ValueObject pueda crearlo si se gestiona internamente.
  private constructor(props: Prop) {
    super(props);
  }

  public static create(name?: number|null): InventoryItemMaxStockBranchVO {
    if (name && name < 0) { // Un ejemplo de límite, puedes ajustar
      throw new InvalidInventoryItemException('El stock maximo por sucursal no puede ser negativo.');
    }
    // Podrías añadir más validaciones: caracteres especiales, formato, etc.

    return new InventoryItemMaxStockBranchVO({ value:name });
  }

  /**
   * Getter para el valor del nombre.
   */
  get value(): number|null|undefined {
    return this.props.value;
  }
}