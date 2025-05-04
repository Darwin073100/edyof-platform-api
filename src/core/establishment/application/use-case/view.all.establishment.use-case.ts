import { Inject, Injectable } from "@nestjs/common";
import { EstablishmentEntity } from "../../domain/entities/establishment.entity";
import { EstablishmentService } from "../services/establishment.service";

@Injectable()
export class ViewAllEstablishmentUseCase{
    constructor(
        @Inject()
        private readonly establishmentService: EstablishmentService,
    ){}

    async execute(): Promise<EstablishmentEntity[]> {
        return await this.establishmentService.findAll();
    }
}