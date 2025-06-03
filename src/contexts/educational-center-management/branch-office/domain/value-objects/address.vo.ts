import { ValueObject } from "src/shared/domain/value-objects/value-object";
import { InvalidAddressException } from "../exceptions/invalid-address.exception";

interface AddressProps {
    street: string; // Calle
    externalNumber: string; // Número exterior
    internalNumber?: string | null; // Número Interior Opcional
    district: string; // Barrio
    city: string; // Ciudad
    state: string; // Estado
    postalCode: string; // Código Postal
    country: string; // País
    reference?: string|null; // Referencia
  }
  
  /**
   * Address es un Value Object que representa una dirección física.
   * Se define por sus atributos y es inmutable.
   * Contiene reglas de negocio para la validación de sus componentes.
   */
  export class Address extends ValueObject<AddressProps> {
    private constructor(props: AddressProps) {
      super(props);
    }
  
    get street(): string {
      return this.props.street;
    }
  
    get externalNumber(): string {
      return this.props.externalNumber;
    }
  
    get internalNumber(): string | null | undefined {
      return this.props.internalNumber;
    }

    get district(): string {
      return this.props.district;
    }
  
    get city(): string {
      return this.props.city;
    }
  
    get state(): string {
      return this.props.state;
    }
  
    get postalCode(): string {
      return this.props.postalCode;
    }
  
    get country(): string {
      return this.props.country;
    }

    get reference(): string|null|undefined {
      return this.props.reference;
    }
  
    /**
     * Método de fábrica para crear una instancia de Address.
     * Contiene la lógica de validación para los componentes de la dirección.
     * @param props Los datos de la dirección.
     * @returns Una instancia de Address.
     * @throws InvalidAddressException si algún componente de la dirección no es válido.
     */
    public static create(props: AddressProps): Address {
      if (!props.street || props.street.trim() === '') {
        throw new InvalidAddressException('La calle no puede ir vacia.');
      }
      if (props.street.length > 255) {
        throw new InvalidAddressException('La calle no puede tener mas de 255 caracteres.');
      }
  
      if (!props.externalNumber || props.externalNumber.trim() === '') {
        throw new InvalidAddressException('El número exterior no puede ir vacio.');
      }
      if (props.externalNumber.length > 20) {
        throw new InvalidAddressException('El número exterior no puede tener mas de 20 caracteres.');
      }
      if (props.internalNumber && props.internalNumber.length > 20) {
        throw new InvalidAddressException('El número interior no puede tener mas de 20 caracteres.');
      }
  
      if (!props.district || props.district.trim() === '') {
        throw new InvalidAddressException('El barrio/colonia no puede ir vacio.');
      }
      if (props.district.length > 100) {
        throw new InvalidAddressException('El barrio/colonia no puede tener mas de 100 caracteres.');
      }
  
      if (!props.city || props.city.trim() === '') {
        throw new InvalidAddressException('La ciudad no puede ir vacia.');
      }
      if (props.city.length > 100) {
        throw new InvalidAddressException('La ciudad no puede tener mas de 100 caracteres.');
      }
  
      if (!props.state || props.state.trim() === '') {
        throw new InvalidAddressException('El estado no puede ir vacio.');
      }
      if (props.state.length > 100) {
        throw new InvalidAddressException('El estado no puede tener mas de 100 caracteres.');
      }
  
      if (!props.postalCode || props.postalCode.trim() === '') {
        throw new InvalidAddressException('El código postal no puede ir vacio.');
      }
      if (props.postalCode.length > 10) { // Ejemplo de longitud para código postal
        throw new InvalidAddressException('El código postal no puede tener mas de 10 caracteres.');
      }
  
      if (!props.country || props.country.trim() === '') {
        throw new InvalidAddressException('El país no puede ir vacio.');
      }
      if (props.country.length > 100) {
        throw new InvalidAddressException('El país no puede tener mas de 100 caracteres.');
      }
  
      // Aquí pueden ir más reglas de validación específicas para la dirección
  
      return new Address(props);
    }
  
    /**
     * Reconstituye una instancia de Address a partir de datos persistidos.
     * No aplica las reglas de validación completa de 'create' si asumimos que
     * los datos de la base de datos ya son válidos.
     * @param props Los datos de la dirección.
     * @returns Una instancia de Address.
     */
    public static reconstitute(props: AddressProps): Address {
      // Aquí podrías poner validaciones básicas si es necesario,
      // pero idealmente los datos persistidos ya son válidos.
      return new Address(props);
    }
  }