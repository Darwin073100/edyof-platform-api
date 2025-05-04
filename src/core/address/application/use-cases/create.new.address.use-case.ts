// import { Inject } from "@nestjs/common";
// import { AddressService } from "../services/address.service";
import { CreateAddressAppDto } from "../dtos/create.address.app.dto";
import { AddressEntity } from "../../domain/entities/address.entity";
import { AddressCreatedEvent } from "../../domain/events/address.created.event";
import { DOMAIN_EVENT_PUBLISHER, DomainEventPublisher } from "src/core/shared/domain/ports/domain-event.publisher";
import { Inject } from "@nestjs/common";

export class CreateNewAddressUseCase{
    constructor(
        // @Inject()
        // private readonly addressService: AddressService,
        @Inject(DOMAIN_EVENT_PUBLISHER)
        private readonly publisher: DomainEventPublisher
    ){
        this.subscribeToBranchRequest();
    }

    private subscribeToBranchRequest() {
        console.log('🏠 [AddressUseCase] Suscribiendo a eventos de sucursal...');
        this.publisher.on('branchOffice.requested', (event:any) => {
          const newAddressId = 7687n; // Aquí iría la lógica real para crear la address
    
          console.log(`🏠 [AddressUseCase] Dirección: ${JSON.stringify(event.addressData)}`);
    
          const addressCreated: AddressCreatedEvent = {
            addressId: newAddressId,
            branchOfficeName: event.branchOfficeName,
          };
    
          this.publisher.emit('address.created', addressCreated);
        });
      }

    async execute(dto: CreateAddressAppDto){
        const addressEntity: AddressEntity = {
            street: dto.street,
            postalCode: dto.postalCode,
            interiorNumber: dto.interiorNumber,
            exteriorNumber: dto.exteriorNumber,
            city: dto.city,
            district: dto.district,
            state: dto.state,
        }

        // const result = await this.addressService.saveNewAddress(addressEntity);
        // return result;
    }
}