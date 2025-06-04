
// Eventos de Dominio que podríamos definir más adelante (ej. BranchOfficeCreatedEvent)
// import { BranchOfficeCreatedEvent } from '../events/branch-office-created.event';

import { Name } from "src/contexts/establishment-management/establishment/domain/values-objects/name.vo";
import { Address } from "../../../../../shared/domain/value-objects/address.vo";
import { AggregateRoot } from "src/shared/domain/entities/aggregate-root";

interface BranchOfficeProps {
    id: bigint;
    name: Name;
    address: Address; // La dirección es parte de la sucursal
    establishmentId: bigint; // ID del Establishment al que pertenece
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }
  
  /**
   * BranchOffice es una Entidad Raíz de Agregado.
   * Es el punto de consistencia transaccional para la sucursal y su dirección.
   * Contiene la identidad de la sucursal y encapsula la lógica de negocio.
   */
  export class BranchOffice extends AggregateRoot<BranchOfficeProps> {
    // El constructor es privado para forzar el uso de métodos de fábrica para la creación.
    // Esto asegura que la entidad solo se cree en un estado válido.
    private constructor(props: BranchOfficeProps) {
      super(props);
    }
  
    get branchOfficeId(): bigint {
      return this.props.id;
    }
  
    get name(): Name {
      return this.props.name;
    }
  
    get address(): Address {
      return this.props.address;
    }
  
    get establishmentId(): bigint {
      return this.props.establishmentId;
    }
  
    get createdAt(): Date {
      return this.props.createdAt;
    }
  
    get updatedAt(): Date | null | undefined {
      return this.props.updatedAt;
    }
  
    get deletedAt(): Date | null | undefined {
      return this.props.deletedAt;
    }
  
    /**
     * Método de fábrica para crear una nueva instancia de BranchOffice.
     * Aplica las reglas de negocio para la creación de una sucursal.
     * @param branchOfficeId El ID provisional de la sucursal (o generado por el dominio si es un UUID).
     * @param name El Value Object Name de la sucursal.
     * @param address El Value Object Address de la sucursal.
     * @param establishmentId El ID del establecimeinto al que pertenece la sucursal.
     * @returns Una nueva instancia de BranchOffice.
     */
    public static create(
      branchOfficeId: bigint,
      name: Name,
      address: Address,
      establishmentId: bigint,
    ): BranchOffice {
      const now = new Date();
      const branchOffice = new BranchOffice({
        id: branchOfficeId,
        name,
        address,
        establishmentId: establishmentId,
        createdAt: now,
        updatedAt: null,
        deletedAt: null,
      });
  
      // Opcional: Registrar un evento de dominio BranchOfficeCreatedEvent
      // branchOffice.addEvent(new BranchOfficeCreatedEvent(branchOffice.id, branchOffice.educationalCenterId));
  
      return branchOffice;
    }
  
    /**
     * Método de fábrica para reconstituir una instancia de BranchOffice desde datos persistidos.
     * NO aplica las reglas de negocio de creación, asumiendo que los datos ya son válidos.
     * @param id El ID de la sucursal.
     * @param name El Value Object Name de la sucursal.
     * @param address El Value Object Address de la sucursal.
     * @param establishmentId El ID del establecimeinto al que pertenece.
     * @param createdAt La fecha de creación.
     * @param updatedAt La fecha de la última actualización.
     * @param deletedAt La fecha de borrado lógico.
     * @returns Una instancia de BranchOffice.
     */
    public static reconstitute(
      id: bigint,
      name: Name,
      address: Address,
      establishmentId: bigint,
      createdAt: Date,
      updatedAt: Date | null = null,
      deletedAt: Date | null = null,
    ): BranchOffice {
      return new BranchOffice({
        id,
        name,
        address,
        establishmentId: establishmentId,
        createdAt,
        updatedAt,
        deletedAt,
      });
    }
  
    /**
     * Actualiza el nombre de la sucursal.
     * @param newName El nuevo Value Object Name.
     */
    public updateName(newName: Name): void {
      this.props.name = newName;
      this.props.updatedAt = new Date();
      // Opcional: Registrar un evento de dominio BranchOfficeNameUpdatedEvent
    }
  
    /**
     * Actualiza la dirección de la sucursal.
     * @param newAddress El nuevo Value Object Address.
     */
    public updateAddress(newAddress: Address): void {
      this.props.address = newAddress;
      this.props.updatedAt = new Date();
      // Opcional: Registrar un evento de dominio BranchOfficeAddressUpdatedEvent
    }
  
    /**
     * Marca la sucursal como eliminada lógicamente.
     */
    public softDelete(): void {
      this.props.deletedAt = new Date();
      // Opcional: Registrar un evento de dominio BranchOfficeDeletedEvent
    }
  }