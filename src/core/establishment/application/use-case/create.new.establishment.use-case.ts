import { Inject, Injectable } from "@nestjs/common";
import { EstablishmentEntity } from "../../domain/entities/establishment.entity";
import { EstablishmentService } from "../services/establishment.service";
import { CreateEstablishmentAppDTO } from "../dtos/create.establishment.app.dto";

@Injectable()
export class CreateNewEstablishmentUseCase {
    constructor(
        @Inject()
        private readonly service: EstablishmentService,
    ) {}

    async execute(dto:CreateEstablishmentAppDTO){
        const entity:EstablishmentEntity = {
            name: dto.name,
        }
        return await this.service.save(entity);
    }
} 