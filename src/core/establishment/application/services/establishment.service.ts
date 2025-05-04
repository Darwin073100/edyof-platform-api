import { Inject, Injectable } from "@nestjs/common";
import { EstablishmentEntity } from "../../domain/entities/establishment.entity";
import { ESTABLISHMENT_REPOSITORY, EstablishmentRepository } from "../../domain/repositories/establishment.repository";

@Injectable()
export class EstablishmentService{
    constructor(
        @Inject(ESTABLISHMENT_REPOSITORY)
        private readonly establishmentRepository: EstablishmentRepository,
    ){}
    async save(entity: EstablishmentEntity) {
        return await this.establishmentRepository.save(entity);
    }

    async findAll() {
        return await this.establishmentRepository.findAll();
    }
    
}