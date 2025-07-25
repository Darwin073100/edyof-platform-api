import { Name } from "src/contexts/establishment-management/establishment/domain/values-objects/name.vo";
import { BranchOfficeRepository } from "../../domain/repositories/branch-office.repository";
import { RegisterBranchOfficeDto } from "../dtos/register-branch-office.dto";
import { AddressEntity } from "../../../../../shared/domain/value-objects/address.vo";
import { BranchOfficeResponseDto } from "../dtos/branch-office-response.dto";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
import { EstablishmentCheckerPort } from "src/contexts/establishment-management/establishment/application/ports/out/establishment-checker.port";
import { EstablishmentNotFoundException } from "src/contexts/establishment-management/establishment/domain/exceptions/establishment-not-found.exception";

/**
 * RegisterBranchOfficeUseCase es un Caso de Uso (Servicio de Aplicación)
 * que orquesta el proceso de registro de una nueva sucursal.
 *
 * Actúa como un Puerto de Entrada para la lógica de negocio.
 * Depende de la interfaz del repositorio de dominio (Puerto de Salida).
 */
export class RegisterBranchOfficeUseCase {
  constructor(
    private readonly branchOfficeRepository: BranchOfficeRepository,
    private readonly establishmentCheckerPort: EstablishmentCheckerPort
  ) {}

  async execute(request: RegisterBranchOfficeDto): Promise<BranchOfficeEntity> {
    // 1. Verificar la existencia del Establishment
    const establishmentExists = await this.establishmentCheckerPort.exists(request.establishmentId);
    if (!establishmentExists) {
      throw new EstablishmentNotFoundException('Ingresa un id de algun establecimiento existente.');
    }

    const name = Name.create(request.name);
    const address = AddressEntity.create({
      street: request.address.street,
      externalNumber: request.address.externalNumber,
      internalNumber: request.address.internalNumber,
      municipality: request.address.municipality,
      neighborhood: request.address.neighborhood,
      city: request.address.city,
      state: request.address.state,
      postalCode: request.address.postalCode,
      country: request.address.country,
      reference: request.address.reference
    });

    // Generar un nuevo ID para la sucursal.
    const newBranchOfficeId = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

    const branchOffice = BranchOfficeEntity.create(
      newBranchOfficeId,
      name,
      address,
      request.establishmentId,
    );

    const resp = await this.branchOfficeRepository.save(branchOffice);

    const domainEvents = branchOffice.getAndClearEvents();

    return resp;
  }
}