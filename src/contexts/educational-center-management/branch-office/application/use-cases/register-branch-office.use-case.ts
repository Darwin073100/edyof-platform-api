import { Name } from "src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo";
import { BranchOfficeRepository } from "../../domain/repositories/branch-office.repository";
import { RegisterBranchOfficeDto } from "../dtos/register-branch-office.dto";
import { Address } from "../../domain/value-objects/address.vo";
import { BranchOfficeResponseDto } from "../dtos/branch-office-response.dto";
import { BranchOffice } from "../../domain/entities/branch-office.entity";

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
  ) {}

  async execute(request: RegisterBranchOfficeDto): Promise<BranchOffice> {
    const name = Name.create(request.name);
    const address = Address.create({
      street: request.address.street,
      externalNumber: request.address.externalNumber,
      internalNumber: request.address.internalNumber,
      district: request.address.district,
      city: request.address.city,
      state: request.address.state,
      postalCode: request.address.postalCode,
      country: request.address.country,
      reference: request.address.reference
    });

    // Generar un nuevo ID para la sucursal.
    const newBranchOfficeId = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

    const branchOffice = BranchOffice.create(
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