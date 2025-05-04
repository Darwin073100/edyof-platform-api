import { Inject, Injectable } from "@nestjs/common";
// import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
// import { BranchOfficeService } from "../services/branch-office.service";
import { CreateBranchOfficeAppDto } from "../dtos/create.branch-office.app.dto";
import { BranchOfficeRequestedEvent } from "../../domain/events/branch-office.requested.event";
import { DOMAIN_EVENT_PUBLISHER, DomainEventPublisher } from "src/core/shared/domain/ports/domain-event.publisher";

@Injectable()
export class CreateNewBranchOfficeUseCase{
    constructor(
        // @Inject()
        // private readonly branchOfficeService: BranchOfficeService,
         @Inject(DOMAIN_EVENT_PUBLISHER)
        private readonly publisher: DomainEventPublisher,
    ){
        this.subscribeToAddressCreated();
    }

    async execute(dto: CreateBranchOfficeAppDto){
        console.log('📬 [BranchOfficeUseCase] Creando nueva sucursal...');
        console.log(`📬 [BranchOfficeUseCase] Sucursal: ${dto.name.get()}`);

        const event: BranchOfficeRequestedEvent = {
            branchOfficeName: dto.name.get(),
            addressData: {
                street: dto.street.get(),
                interiorNumber: dto.interiorNumber.get(),
                exteriorNumber: dto.exteriorNumber.get(),
                postalCode: dto.postalCode.get(),
                district: dto.district.get(),
                city: dto.city.get(),
                state: dto.state.get(),
            }
        }

        this.publisher.emit('branchOffice.requested', event);

        // const entity: BranchOfficeEntity = {
        //     name: dto.name,
        //     addressId: dto.addressId.get(),
        //     educationalCenterId: dto.educationalCenterId.get(),
        // }

        // return this.branchOfficeService.saveNewBranchOffice(entity);
    }

    private subscribeToAddressCreated(){
        console.log('📬 [BranchOfficeUseCase] Suscribiendo a eventos de dirección...');
        this.publisher.on('address.created', (event:any)=>{
            console.log(`📬 [BranchOfficeUseCase] Dirección recibida: ${event.addressId}`);
        });
    }
}