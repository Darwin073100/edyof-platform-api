import { SuplierRepository } from "../../domain/repositories/suplier.repository";
import { RegisterSuplierDto } from "../dtos/register-suplier.dto";
import { AddressEntity } from "../../../../../shared/domain/value-objects/address.vo";
import { SuplierResponseDto } from "../dtos/suplier-response.dto";
import { SuplierEntity } from "../../domain/entities/suplier.entity";
import { SuplierNameVO } from "../../domain/value-objects/suplier-name.vo";
import { SuplierPhoneNumberVO } from "../../domain/value-objects/suplier-phone-number.vo";
import { SuplierContactPersonVO } from "../../domain/value-objects/suplier-contact-person.vo";
import { SuplierRFCVO } from "../../domain/value-objects/suplier-rfc.vo";
import { SuplierEmailVO } from "../../domain/value-objects/suplier-email.vo";
import { SuplierNotesVO } from "../../domain/value-objects/suplier-notes.vo";
import { SuplierAlreadyExistsException } from "../../domain/exceptions/suplier-already-exists.exception";
/**
 * RegisterSuplierUseCase es un Caso de Uso (Servicio de Aplicación)
 * que orquesta el proceso de registro de una nueva sucursal.
 *
 * Actúa como un Puerto de Entrada para la lógica de negocio.
 * Depende de la interfaz del repositorio de dominio (Puerto de Salida).
 */
export class RegisterSuplierUseCase {
  constructor(
    private readonly suplierRepository: SuplierRepository,
  ) {}

  async execute(request: RegisterSuplierDto): Promise<SuplierEntity> {
    const name = SuplierNameVO.create(request.name);
    const phoneNumberVo = SuplierPhoneNumberVO.create(request.phoneNumber);
    const contactPersonVo = request?.contactPerson? SuplierContactPersonVO.create(request?.contactPerson): null;
    const rfcVo = request.rfc? SuplierRFCVO.create(request.rfc): null;
    const emailVo = request.email? SuplierEmailVO.create(request.email): null;
    const notesVo = request.notes? SuplierNotesVO.create(request.notes): null;
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
    const newSuplierId = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

    const suplier = SuplierEntity.create(
      newSuplierId,
      name,
      phoneNumberVo,
      address,
      rfcVo,
      contactPersonVo,
      emailVo,
      notesVo
    );

    if(!!suplier.email?.value){
      const emailExist = await this.suplierRepository.findByEmail(suplier.email?.value);
      if(emailExist){
        throw new SuplierAlreadyExistsException('Ya hay un proveedor con el mismo correo electrónico.');
      }
    }

    if(!!suplier.rfc?.value){
      const rfcExist = await this.suplierRepository.findByRfc(suplier.rfc?.value);
      if(rfcExist){
        throw new SuplierAlreadyExistsException('Ya hay un proveedor con el mismo RFC.');
      }
    }

    const resp = await this.suplierRepository.save(suplier);

    const domainEvents = suplier.getAndClearEvents();

    return resp;
  }
}